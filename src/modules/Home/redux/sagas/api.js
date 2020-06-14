import axios from "axios";

export const getFeatureDocsFromApi =async (data) => {
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document/document-share/get-list/${data}`
    })
    return request;
}
export const getDocShareFromApi = async (token) => {
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document-share/get_docs_share`,
        headers: { Authorization: token }
    })
    return request;
}
export const getDocPublicFromApi = async () => {
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document-share/get_docs_public`
    })
    return request;
}