import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "./router";

const API_KEY = import.meta.env.VITE_API_KEY;
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url;
  if (
    !url.includes("signInWithPassword") &&
    !url.includes("signUp") &&
    !url.includes(":3000") &&
    !url.includes(":lookup")
  ) {
    const authStore = useAuthStore();
    let params = new URLSearchParams();
    params.append("auth", authStore.userInfo.token);
    config.params = params;
    // console.log(`intr ${params}`);
  }
  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const { response } = error;

    const authStore = useAuthStore();
    const originalRequest = error.config;
    if (
      response.status === 401 ||
      (response.status === 400 &&
        response.data?.error?.message.includes("INVALID_ID_TOKEN") &&
        !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      try {
        console.log("user token expired, getting new tokens");
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
          {
            grant_type: "refresh_token",
            refresh_token: JSON.parse(localStorage.getItem("userTokens"))
              .refreshToken,
          },
        );
        console.log("hi from interceptors" + newTokens.data);
        authStore.userInfo.token = newTokens.data.access_token;
        authStore.userInfo.refreshToken = newTokens.data.refresh_token;
        localStorage.setItem(
          "userTokens",
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.access_token,
          }),
        );
      } catch (error) {
        console.log(error);
        localStorage.removeItem("userTokens");
        router.push("/signin");
        authStore.userInfo.token = "";
        authStore.userInfo.refreshToken = "";
      }
    }
    // console.log(error);
  },
);

export default axiosApiInstance;
