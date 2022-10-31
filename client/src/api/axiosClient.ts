import axios from "axios";
import firebase from "../services/firebase";
let token = "";

//Get token
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user.getIdToken().then(async (data) => {
      token = data;
    });
  }
});

//Axios
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return console.log(err);
    }
    throw err.response;
  }
);

export default axiosClient;
