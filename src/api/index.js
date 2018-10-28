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
    instance.patch(`/v1/user_info`, JSON.stringify(postData), {
      headers: {
        'content-type': 'application/json',
        authentication: localStorage.getItem("token")
      }
    });
  downloadRegisterExcel = () => window.open('http://47.107.68.125:8088/registerExcel.xlsx');
  downloadQuestionExcel = () => window.open('http://47.107.68.125:8088/template.xlsx');
  uploadResgisterExcel = postData => instance.post('/v1/user_info/file', postData, {
    headers: {
      'content-type': 'multipart/form-data',
      authentication: localStorage.getItem("token")
    }
  });
  uploadQuestionExcel = postData => instance.post('/v1/question/file', postData, {
    headers: {
      'content-type': 'multipart/form-data',
      authentication: localStorage.getItem("token")
    }
  });
  submitQuestion = postData => instance.post('/v1/question', postData, {
    headers: {
      'content-type': 'application/json',
      authentication: localStorage.getItem("token")
    }
  });
  getQuestionId = () => instance.get('/v1/grade', {
    headers: {
      'content-type': 'application/json',
      authentication: localStorage.getItem("token")
    }
  })
  deleteQuestion = questionId => instance.delete('/v1/question/' + questionId, {
    headers: {
      authentication: localStorage.getItem("token")
    }
  })
  getQuestionInfo = url => instance.get(url, {
    headers: {
      authentication: localStorage.getItem("token")
    }
  })
  submitScore = postData => instance.post('/v1/grade', postData, {
    headers: {
      'content-type': 'application/json',
      authentication: localStorage.getItem("token")
    }
  })
}

const api = new API();
export default api;