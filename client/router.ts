import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/login", component: "login-page" },
  { path: "/password", component: "password-page" },
  { path: "/user-comercio", component: "comercio-page" },
  { path: "/edit", component: "edit-page" },
  { path: "/report", component: "report-page" },
  { path: "/", component: "home-page" },
  { path: "/location", component: "location-page" },
  { path: "/user-data", component: "user-page" },
  { path: "/edit-me", component: "edit-me" },
  { path: "/form-comercio", component: "form-page" },
]);
