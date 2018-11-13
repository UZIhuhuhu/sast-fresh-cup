import axios from "axios";
// axios.defaults.baseURL = `http://192.168.0.132:8088`;
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
  modify = postData =>
    instance.patch(`/v1/user_info`, JSON.stringify(postData), {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  downloadRegisterExcel = () =>
    window.open("http://47.107.68.125:8088/registerExcel.xlsx");
  downloadQuestionExcel = () =>
    window.open("http://47.107.68.125:8088/template.xlsx");
  uploadResgisterExcel = postData =>
    instance.post("/v1/user_info/file", postData, {
      headers: {
        "content-type": "multipart/form-data",
        authentication: localStorage.getItem("token")
      }
    });
  uploadQuestionExcel = postData =>
    instance.post("/v1/question/file", postData, {
      headers: {
        "content-type": "multipart/form-data",
        authentication: localStorage.getItem("token")
      }
    });
  submitQuestion = postData =>
    instance.post("/v1/question", postData, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  getQuestionId = () =>
    instance.get("/v1/grade", {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  deleteQuestion = questionId =>
    instance.delete("/v1/question/" + questionId, {
      headers: {
        authentication: localStorage.getItem("token")
      }
    });
  getQuestionInfo = url =>
    instance.get(url, {
      headers: {
        authentication: localStorage.getItem("token")
      }
    });
  submitScore = postData =>
    instance.post("/v1/grade", postData, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
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
  getNoticeList = () =>
    instance.get(`v1/faq`, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  postNewNotice = postData =>
    instance.post(`v1/faq`, postData, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
  deleteNewNotice = id =>
    instance.delete(`v1/faq/${id}`, {
      headers: {
        "content-type": "application/json",
        authentication: localStorage.getItem("token")
      }
    });
}

const api = new API();
export default api;
