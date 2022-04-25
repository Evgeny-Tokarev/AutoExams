import { createApp } from "vue";
import App from "./pages/App.vue";
import store from "./state";

import "./main.scss";

const app = createApp(App);
app.use(store);
app.mount("#app");

export default app;
