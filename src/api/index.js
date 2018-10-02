import axios from "axios";
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

class API {
  login = postData => loginInstance.post(`/v1/tokens`, postData);
  register = postData => instance.post(`/v1/user_info`, postData);
}

const api = new API();
export default api;
