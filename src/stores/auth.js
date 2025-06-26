import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axiosApiInstance from "@/api";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({
    token: "",
    userId: "",
    refreshToken: "",
    expiresIn: "",
    // email: "",
    userProfileData: { photoUrl: "" },
  });

  const isAuth = computed(() => {
    return (
      userInfo.value.token !== "" &&
      userInfo.value.token !== undefined &&
      userInfo.value.token !== null
    );
  });

  const responseData = ref();
  const error = ref("");

  const auth = async (payload, type) => {
    try {
      let signString = type === "signIn" ? "signInWithPassword" : "signUp";
      // let signString = "";
      // if (type === "signIn") {
      //   signString = "signInWithPassword";
      // } else if (type === "signUp") {
      //   signString = "signUp";
      // }
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${signString}?key=${API_KEY}`,
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
      };
      localStorage.setItem(
        "userTokens",
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
        }),
      );
      responseData.value = response.data;
      await getUserProfileData();
    } catch (err) {
      if (err) {
        switch (err.response.data.error.message) {
          case "EMAIL_EXISTS":
            error.value =
              "The email address is already in use by another account.";
            break;
          case "OPERATION_NOT_ALLOWED":
            error.value = "Operation not allowed!";
            break;
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            error.value =
              "We have blocked all requests from this device due to unusual activity. Try again later";
            break;
          case "EMAIL_NOT_FOUND":
            error.value = "Email not found";
            break;
          case "INVALID_PASSWORD":
            error.value =
              "The password is invalid or the user has no password.";
            break;
          case "USER_DISABLED":
            error.value = "The user has been disabled by administrator";
            break;

          default:
            error.value = "Error!";
            break;
        }
      }
      throw error.value;
    } finally {
    }
  };

  // need to auth first to get profile data
  const getUserProfileData = async () => {
    try {
      // console.log(userInfo.value.token);
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        { idToken: userInfo.value.token },
      );
      userInfo.value.userProfileData = response.data.users[0];
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (payload) => {
    try {
      // const { idToken, displayName, photoUrl } = payload;
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        { idToken: userInfo.value.token, ...payload },
      );
      console.log(response.data);
      console.log("successfully updated user profile!");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    userInfo.value = {
      token: "",
      email: "",
      userId: "",
      refreshToken: "",
      expiresIn: "",
      userProfileData: {},
    };
  };

  return {
    isAuth,
    auth,
    userInfo,
    error,
    responseData,
    logout,
    getUserProfileData,
    updateUserProfile,
  };
});
