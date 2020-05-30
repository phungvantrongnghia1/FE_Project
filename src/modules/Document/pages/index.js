import React, { useEffect, useMemo } from 'react';
import Item from '../components/item';
import { Row, Col, Pagination, Result, Button } from 'antd';
import { showModalLogin } from 'modules/Account/redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import {
  getDocs,
  getDocsCate,
  deleteDoc,
  paginationAction,
  shareDocsAction
} from '../redux/actions';
const Index = () => {
  const dispatch = useDispatch();
  const { docsList, docsCate, docsSearch, pagination } = useSelector(
    (state) => state.Document
  ),
    { authUser } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    dispatch(getDocs());
    dispatch(getDocsCate());
  }, []);
  const shareDocs = (payload) => {
    dispatch(
      shareDocsAction({
        payload,
        callbackSuccess: (message) => {
          NotificationManager.success(message, '', 2000);
        },
        callbackError: (message) => {
          NotificationManager.error(message, '', 2000);
        }
      })
    );
  };

  const deleteDocs = (payload) => {
    dispatch(
      deleteDoc({
        payload,
        callbackSuccess: (message) => {
          NotificationManager.success(message, '', 2000);
        },
        callbackError: (message) => {
          NotificationManager.error(message, '', 2000);
        }
      })
    );
  };
  const _onShowLogin = (boolean) => {
    dispatch(showModalLogin(boolean));
  };
  const handlePagination = (current) => {
    dispatch(paginationAction(current));
  };
  const renderDocsearch = useMemo(() => {
    return (
      <Row key="docsSearch" className="gx-m-0 gx-mt-4">
        {docsSearch.data.map((doc, index) => (
          <Col span={6} key={index}>
            <Item
              auth={true}
              docsCate={docsCate}
              value={doc}
              deleteDocs={deleteDocs}
              shareDocs={shareDocs}
            />
          </Col>
        ))}
      </Row>
    );
  }, [docsSearch.data]);
  const renderDocsShare = useMemo(() => {
    let start = (pagination.currentPage - 1) * pagination.pageSize;
    let end = start + pagination.pageSize;
    let dataPartent = docsList.slice(start, end);
    return (
      <Row key="docs-share" className="gx-m-0 gx-mt-4">
        {dataPartent.map((doc, index) => (
          <Col span={6} key={index}>
            <Item
              auth={true}
              docsCate={docsCate}
              value={doc}
              deleteDocs={deleteDocs}
              shareDocs={shareDocs}
            />
          </Col>
        ))}
      </Row>
    );
  }, [docsList, pagination]);
  return (
    <>
      {authUser ? <>
        {
          docsSearch.length !== 0 && docsSearch.status ? (
            <>{renderDocsearch}</>
          ) : (
              <>{renderDocsShare}</>
            )
        }
        <div className="gx-text-center">
          <Pagination
            pageSize={12}
            current={pagination.currentPage}
            onChange={handlePagination}
            total={pagination.totalPages * 10}
          />
        </div>
      </> : <Result
          status="403"
          title="403"
          subTitle="Bạn cần đăng nhập để có thể truy cập được trang này!"
          extra={<Button type="primary" onClick={() => _onShowLogin(true)}>Đăng nhập</Button>}
        />}

    </>
  );
};
export default Index;
