import About from "../components/About.vue"
import NotFound from "../components/NotFound.vue"
import StoryList from '../components/StoryList.vue'
import Item from "../components/Item.vue"

const routes = [
  {
    path: "/",
    component: StoryList,
    name: "Home",
    props: true
  },
  {
      path: "/about",
      component: About,
      name: "about",
      meta: {
          title: "Hello Vue!",
      },
  },
  {
    path: "/item",
    component: Item,
    name: "Item",
    props: true
},

  {
    path: "/404",
    component: NotFound,
  },
  // {
  //   path: "*",
  //   redirect: "/404"
  // },
];



export default routes;