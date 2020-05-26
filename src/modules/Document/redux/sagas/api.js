import axios from "axios";

export const getDocsFromApi = async (data, token) => {
    const request = await axios({
        method: 'get',
        url: `${process.env.APP_URL}/document/list/4`,
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
        headers: { Authorization: token },
        data:data
    })
    return request;
}
