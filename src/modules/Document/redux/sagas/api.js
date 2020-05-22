import axios from "axios";

export const getDocsFromApi =async (data,token) => {
    console.log(token);
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document/list/4`,
        headers: { Authorization: token }
    })
    return request;
}
