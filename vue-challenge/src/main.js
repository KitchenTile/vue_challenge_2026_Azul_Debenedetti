import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faFilter,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faSort,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFilter, faArrowUpWideShort, faArrowDownWideShort, faSort);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
