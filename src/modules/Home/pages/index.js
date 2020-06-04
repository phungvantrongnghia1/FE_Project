import React, { useEffect, useMemo } from 'react';
import { Icon, Row, Col, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from 'react-notifications';
import Category from "../components/Category";
import FeatureDocument from "../../Document/components/FeaturedCourses";
import { getDocsShare, paginationAction } from "../redux/actions";
import DocsItem from "../../Document/components/item";
import { reShareDocsAction, getDocsCate,searchDocs } from "../../Document/redux/actions"
const Index = () => {
    const dispatch = useDispatch();
    const { docsShare, pagination, docsSearch } = useSelector(state => state.Home);
    const { docsCate } = useSelector(
        (state) => state.Document
    )
    useEffect(() => {
        dispatch(getDocsShare())
        dispatch(getDocsCate());
    }, [])
    const searchDocsFn = (payload) => {
        dispatch(
            searchDocs({
                payload
            })
        );
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
            <FeatureDocument title="Tài liệu nổi bật" data={docsShare} />
            <h5 className="gx-py-2 gx-m-0 gx-font-weight-bold"><Icon className="gx-mr-2" type="double-right" />Tất cả tài liệu</h5>
            <Category docsCate={docsCate} searchDocsFn={searchDocsFn}/>
            {docsSearch.length !== 0 && docsSearch.status ? (
                <>{renderDocsearch}</>
            ) : (
                    <>{renderDocsShare}</>
                )}
            <div className="gx-text-center"><Pagination pageSize={12}
                current={pagination.currentPage}
                onChange={handlePagination}
                total={pagination.totalPages * 10} /></div>
        </div>
    )
}
export default Index;