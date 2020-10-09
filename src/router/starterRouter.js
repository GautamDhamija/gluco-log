import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/starter/SampleLayout.vue';
// import Starter from '../layout/starter/SamplePage.vue';
const Starter = ()=>import ("@/layout/starter/SamplePage.vue")
const addRecord = ()=>import ("@/layout/addRecord.vue")
const viewRecord = ()=>import ("@/layout/viewRecord.vue")
const calculator = ()=>import ("@/layout/calculator.vue")
const graphs = ()=>import ("@/layout/graphs.vue")
import signup from "../layout/authentication/signup.vue"
import login from "../layout/authentication/login.vue"
const editRecord = ()=> import( "@/layout/editRecord.vue")

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: { default: Starter }
        },
        {
          path:'addRecord',
          name:'addRecord',
          component:addRecord
        },
        {
          path:'viewRecord',
          name:'viewRecord',
          component:viewRecord
        },
        {
          path:'calculator',
          name:'calculator',
          component:calculator
        },
        {
          path:'graphs',
          name:'graphs',
          component:graphs
        },{
          path:'/editRecord',
          name:'editRecord',
          component:editRecord
        }
      ]
    },
    {
      path:"/login",
      name:'login',
      component:login
    },
    {
      path:"/signup",
      name:"signup",
      component:signup
    },
    { path: "*", redirect:'/' }
  ]
});
