
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: airhome,
    },

    {
        path: "/airlines",
        component: airlines,
        // component: () =>
        //     import("../pages/airlines.vue.js"),
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
    // {
    //     path:"/passengers/:id",
    //     name: "passengerList",
    //     component: () => import('../views/Passengers.vue'),
    // },
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
        msg: 'Crazy Vue without node.js',
        email: ''
    },
    methods: {},
    vuetify: new Vuetify(),
    router
})
