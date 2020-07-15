import Vue from 'vue'
import VueRouter from 'vue-router'
import Tickets from "../views/Tickets";
import Home from "../views/Home";
import CreateTicketForm from "../views/CreateTicketForm";
import TicketInfo from "../views/TicketInfo";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
        {
          path: "/tickets",
          name: "tickets",
          component: Tickets
        },
        {
          path: "/create-ticket/",
          name: "create-ticket",
          component: CreateTicketForm
        },
        {
          path: "/TicketInfo/:ticketId",
          name: "ticket-info",
          props: true,
          component: TicketInfo
        }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  duplicateNavigationPolicy: 'ignore',
  routes
})

export default router
