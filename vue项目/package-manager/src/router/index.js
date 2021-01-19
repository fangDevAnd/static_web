import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import RouteChange from "../components/mainPage/RouteChange";
import ProjectPackage from "../components/mainPage/ProjectPackage";
import PackageList from "../components/mainPage/packageList/PackageList";
import LogcatQuery from "../components/mainPage/LogcatQuery";
import UserBehavior from "../components/mainPage/UserBehavior";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: "/routeChange",
          name: "RouteChange",
          component: RouteChange,
        },
        {
          path: "/pm",
          name: "pm",
          component: ProjectPackage,
        },
        {
          path: "/pkgList",
          name: "pkgList",
          component: PackageList,
        },
        {
          path: "/LogcatQuery",
          name: "LogcatQuery",
          component: LogcatQuery,
        },
        {
          path: "/UserBehavior",
          name: "UserBehavior",
          component: UserBehavior,
        }
      ]
    }
  ]
})
