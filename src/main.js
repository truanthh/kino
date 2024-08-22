import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import "./api";
import components from "./components/UI";
import { getAuth } from "firebase/auth";



const fb = initializeApp(firebaseConfig);

// console.log(fb);

// const auth = getAuth(fb);

// console.log(auth);

const app = createApp(App);
const pinia = createPinia();

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(pinia).use(router).mount("#app");
