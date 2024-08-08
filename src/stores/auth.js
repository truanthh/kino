import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({
    token: "",
    email: "",
    userId: "",
    refreshToken: "",
    expiresIn: "",
  });

  const responseData = ref();
  const error = ref("");
  const isAuth = ref();

  const auth = async (payload, type) => {
    try {
      let signString = type === "signIn" ? "signInWithPassword" : "signUp";
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true,
        },
      );
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };
      console.log(response.data);
      responseData.value = response.data;
    } catch (err) {
      switch (err.response.data.error.message) {
        case "EMAIL_EXISTS":
          error.value =
            "The email address is already in use by another account.";
          break;
        case "OPERATION_NOT_ALLOWED":
          error.value = "Password sign-in is disabled for this project";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          error.value =
            "We have blocked all requests from this device due to unusual activity. Try again later";
          break;

        default:
          error.value = "Error!";
          break;
      }
    }
  };
  return {
    auth,
    userInfo,
    error,
    responseData,
    isAuth,
  };
});
