import React, { useEffect, useMemo } from 'react';
import { Icon, Row, Col, Pagination, Result, Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';
import Category from "../components/Category";
import FeatureDocument from "../../Document/components/FeaturedCourses";
import { getDocsShare, paginationAction, getDocsPublic } from "../redux/actions";
import { showModalLogin } from 'modules/Account/redux/actions';
import DocsItem from "../../Document/components/item";
import { reShareDocsAction, getDocsCate, searchDocs } from "../../Document/redux/actions"
const Index = () => {
    const dispatch = useDispatch();
    const { docsShare, pagination, docsSearch, publicDocs } = useSelector(state => state.Home),
        { authUser } = useSelector((state) => state.AuthReducer),
        { loadingBTN } = useSelector((state) => state.GeneralReducer);
    console.log('loadingBTN', loadingBTN)
    const { docsCate } = useSelector(
        (state) => state.Document
    )
    useEffect(() => {
        if (authUser) {
            dispatch(getDocsShare())
            dispatch(getDocsCate());
        } else {
            dispatch(getDocsPublic())
        }
    }, [])
    const searchDocsFn = (payload) => {
        dispatch(
            searchDocs({
                payload
            })
        );
    };
    const _onShowLogin = (boolean) => {
        dispatch(showModalLogin(boolean));
    };
    const reShareDocs = (payload) => {
        dispatch(
            reShareDocsAction({
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
    const handlePagination = (current) => {
        dispatch(paginationAction(current));
    };
    const renderDocsearch = useMemo(() => {
        return (
            <Row key="docsSearch" className="gx-m-0 gx-mt-4">
                {docsSearch.data.map((doc, index) => (
                    <Col span={6} key={index}>
                        <DocsItem
                            auth={false}
                            value={doc}
                            reShareDocs={reShareDocs}
                        />
                    </Col>
                ))}
            </Row>
        );
    }, [docsSearch.data]);
    const renderDocsShare = useMemo(() => {
        let start = (pagination.currentPage - 1) * pagination.pageSize;
        let end = start + pagination.pageSize;
        let dataPartent = docsShare.slice(start, end);
        return (
            <Row key="docs-share" className="gx-m-0 gx-mt-4">
                {dataPartent.map((doc, index) => (
                    <Col span={6} key={index}>
                        <DocsItem
                            auth={false}
                            value={doc}
                            reShareDocs={reShareDocs}
                        />
                    </Col>
                ))}
            </Row>
        );
    }, [docsShare, pagination]);
    return (
        <div>
            <Spin spinning={loadingBTN}  delay={500} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                <FeatureDocument title="Tài liệu nổi bật" data={authUser ? docsShare : publicDocs} />
                <h5 className="gx-py-2 gx-m-0 gx-font-weight-bold"><Icon className="gx-mr-2" type="double-right" />Tất cả tài liệu</h5>
                {authUser ? (
                    <Category docsCate={docsCate} searchDocsFn={searchDocsFn} />) : <Result
                        title="Đăng nhập để xem thêm tài liệu"
                        extra={
                            <Button type="primary" onClick={() => _onShowLogin(true)}>
                                Đăng nhập
      </Button>
                        }
                    />}

                {docsSearch.length !== 0 && docsSearch.status && authUser ? (
                    <>{renderDocsearch}</>
                ) : (
                        <>{renderDocsShare}</>
                    )}
                {authUser ? (<div className="gx-text-center"><Pagination pageSize={12}
                    current={pagination.currentPage}
                    onChange={handlePagination}
                    total={pagination.totalPages * 10} /></div>) : <></>}
            </Spin>
        </div>
    )
}
export default Index;