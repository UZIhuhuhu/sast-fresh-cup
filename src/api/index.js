import axios from "axios";
import "../config";
const instance = axios.create({
  withCredentials: true,
  headers: {
    authentication: `${localStorage.getItem("token")}`
  }
});
const Cinstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    authentication: `${localStorage.getItem("token")}`
  }
});
class API {
  constructor() {
    localStorage.removeItem("token");
  }
  login = postData => instance.post(`/v1/tokens`, postData);
  register = postData => instance.post(`/v1/user_info`, postData);
  getInfo = () => Cinstance.get(`/v1/user_info`);
  modifyInfo = postData => instance.patch(`/v1/user_info`, postData);
}

const api = new API();
export default api;
