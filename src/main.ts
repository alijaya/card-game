import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/styles/index.css";

const app = createApp(App);
app.use(store);
app.use(router);

library.add(faTimes, faDotCircle);
app.component("fa", FontAwesomeIcon);

app.mount("#app");
