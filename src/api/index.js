import axios from "axios";
const instance = axios.create({
  withCredentials: true,
  headers: {
    authentication: `${localStorage.getItem("token")}`
  }
});
class API {
  login = postData => instance.post(`/v1/tokens`, postData);
  register = postData => instance.post(`/v1/user_info`, postData);
  modify = postData =>
    instance.patch(`/v1/user_info`, JSON.stringify(postData), {headers: {'content-type': 'application/json'}});
}

const api = new API();
export default api;
