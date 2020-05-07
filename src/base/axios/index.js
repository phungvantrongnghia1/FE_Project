import axios from "axios";

const instanceAxios = (method, endPoint, data = null, token = null) =>
  axios({
    method,
    headers: { Authorization: token || null },
    url: `${process.env.APP_URL}/${endPoint}`,
    data
  });
export default instanceAxios;
