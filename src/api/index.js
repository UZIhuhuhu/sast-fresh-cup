import axios from "axios";
// axios.defaults.baseURL = `http://47.107.68.125:8088`;
// axios.interceptors.request.use(
//   config => {
//     config.headers.authentication = localStorage.getItem("token");
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
const instance = axios.create({
  withCredentials: true
});
class API {
  login = postData => instance.post(`/v1/tokens`, postData);
  register = postData => instance.post(`/v1/user_info`, postData);
  modifyPersonalInfo = postData =>
    instance.patch(`/v1/user_info`, JSON.stringify(postData), {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  getPersonalInfo = () =>
    instance.get(`/v1/user_info`, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  answerQuestion = postData =>
    instance.post(`/v1/exam/sumbitAnswer`, postData, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  getQuestionSession = () =>
    instance.get(`/v1/exam/`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authentication: `${localStorage.getItem("token")}`
      }
    });
  getQuestionDetail = url =>
    instance.get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authentication: `${localStorage.getItem("token")}`
      }
    });
  getQuestionAnswerDetail = url =>
    instance.get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authentication: `${localStorage.getItem("token")}`
      }
    });
}

const api = new API();
export default api;
