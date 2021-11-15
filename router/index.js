
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name:'home',
        component: airhome,
    },

    {
        path: "/airlines",
        name:"airlines",
        component: airlines,
    },
    //
    // {
    //     path: "/create-airline",
    //     name: "createAirline",
    //     component: () =>
    //         import("../views/createAirline.vue"),
    // },
    {
        path:"/airlines/:id",
        component: editAirline,
    },
    {
        path:"/passengers/:id",
        component: passengerList

    },
    {
        path: "*",
        name: "404error",
        component: () => import('../views/404.vue'),

    },

];

let router = new VueRouter({
    //mode: 'history',
    routes // short for `routes: routes`
})

 router.beforeEach((to, from, next) => {
     next()
 })

var app = new Vue({
    el: '#app',
    watch: {},
    mounted() {

    },
    data: {
        msg: 'Simple Frontend for Airline-API',
        email: ''
    },
    methods: {},
    vuetify: new Vuetify(),
    router
})
