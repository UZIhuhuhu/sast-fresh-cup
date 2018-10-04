import axios from "axios";
import "../config";
const loginInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
const instance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
const tokenInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cookie": `authorization=${global.constants.token}`
  }
});
const formTokenInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": `authorization=${global.constants.token}`
  }
});
// const requestUrl = `http://47.107.68.125:8088`;
class API {
  login = postData => loginInstance.post(`/v1/tokens`, postData);
  register = postData => instance.post(`/v1/user_info`, postData);
  getInfo = () => formTokenInstance.get(`/v1/user_info`);
  modifyInfo = postData => tokenInstance.patch(`/v1/user_info`, postData);
  
}

const api = new API();
export default api;
