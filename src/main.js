import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";



initializeApp(firebaseConfig);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).mount("#app");
