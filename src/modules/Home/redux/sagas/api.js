import axios from "axios";

export const getFeatureDocsFromApi =async (data) => {
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document/document-share/get-list/${data}`
    })
    return request;
}
export const getDocShareFromApi = async (data) => {
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document-share/get_docs_share/11`
    })
    return request;
}