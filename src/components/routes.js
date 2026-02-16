import Home from "@/Home.vue"
import SignUp from "./signUp.vue"
import login from "./login.vue"
import AddRestaurant from "./AddRestaurant.vue"
import UpdateRestaurant from "./UpdateRestaurant.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/addRestaurant",
    name: "AddRestaurant",
    component: AddRestaurant,
  },
 {
  path: "/updateRestaurant/:id",
  name: "UpdateRestaurant",
  component: UpdateRestaurant,
},


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
