import axios from "axios";

export const getFeatureDocsFromApi =async (data) => {
    const request = await axios({
        method:'get',
        url:`${process.env.APP_URL}/document/document-share/get-list/${data}`
    })
    return request;
}