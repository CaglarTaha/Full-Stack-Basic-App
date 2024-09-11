import axios from "axios";
import { logoutSuccess } from "./useReducer";
import { store } from "./store";


export const handleLogout = () => {
    store.dispatch(logoutSuccess());
  };



  const token = localStorage.getItem("token")
  // Axios örneği oluştur
  const instance = axios.create({
    baseURL: 'http://localhost:8080', // API'nin temel URL'si
    timeout: 10000, // İstek zaman aşımı süresi (ms)
  });

  // İstek interceptor'ı: istek gönderilmeden önce
  instance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // Hata durumunda burada işlemler yapabilirsiniz
      return Promise.reject(error);
    }
  );

  // Yanıt interceptor'ı: yanıt alındıktan sonra
  instance.interceptors.response.use(
    (response) => {
      // Yanıt alındıktan sonra burada işlemler yapabilirsiniz
      return response;
    },
    (error) => {
      console.log(error.response.status)
      if(error.response.status === 403 || error.response.status === 401){
       localStorage.clear()
       location.reload()
        console.log(error)
      }

      return Promise.reject(error);
    }

  );

  export default instance;