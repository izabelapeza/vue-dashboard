import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";

// import global scss files
import "@/assets/scss/main.scss";

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .use(mdiVue, {
    icons: mdijs,
  })
  .mount("#app");
