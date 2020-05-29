import axios from "axios";

export const getDocsFromApi = async (token) => {
    const request = await axios({
        method: 'get',
        url: `${process.env.APP_URL}/document/list`,
        headers: { Authorization: token }
    })
    return request;
}
export const getDocsDetailFromApi = async (data, token) => {
    const request = await axios({
        method: 'get',
        url: `${process.env.APP_URL}/document/detail/${data}`,
        headers: { Authorization: token }
    })
    return request;
}
export const getDocsCateFromApi = async (token) => {
    const request = await axios({
        method: 'get',
        url: `${process.env.APP_URL}/document/list-cate`,
        headers: { Authorization: token }
    })
    return request;
}
export const createDocFromApi = async (data,token) => {
    const request = await axios({
        method: 'post',
        url: `${process.env.APP_URL}/document/create`,
        headers: { Authorization: token },
        data:data
    })
    return request;
}
export const updateDocFromApi = async (data,token) => {
    const request = await axios({
        method: 'put',
        url: `${process.env.APP_URL}/document/update`,
        headers: { Authorization: token },
        data:data
    })
    return request;
}
export const deleteDocFromApi = async (data,token) => {
    const request = await axios({
        method: 'delete',
        url: `${process.env.APP_URL}/document/delete/${data}`,
        headers: { Authorization: token }
    })
    return request;
}
export const shareDocsFromApi = async (data,token) => {
    const request = await axios({
        method: 'post',
        url: `${process.env.APP_URL}/document-share/share`,
        headers: { Authorization: token },
        data:data
    })
    return request;
}
export const reShareDocsFromApi = async (data,token) => {
    const request = await axios({
        method: 'post',
        url: `${process.env.APP_URL}/document-share/re-share`,
        headers: { Authorization: token },
        data:data
    })
    return request;
}