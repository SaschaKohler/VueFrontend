
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name:'home',
        component: airhome,
    },
    {
        path: '/register',
        name: 'register',
        component: registerUser,

    },
    {
        path: '/login',
        name: 'login',
        component: loginUser,

    },
    {
        path: '/profile',
        name: 'profile',
        component: profileUser,

    },
    {
        path: "/airlines",
        name:"airlines",
        component: airlines
    },
    {
        path: "/create-airline",
        name: "createAirline",
        component: createAirline
    },
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
        name: "error404",
        component: error404

    },

];

const router = new VueRouter({
     mode: 'history',
    routes // short for `routes: routes`
})

 router.beforeEach((to, from, next) => {
     next()
 })

var app = new Vue({
    el: '#app',
    // watch: {
    //     username(newName){
    //         localStorage.username = newName;
    //     }
    // },
    mounted() {
        if(localStorage.username) this.username =
            localStorage.username
        this.username=""
    },
    data: {
        msg: 'Simple Frontend for Airline-API',
        username: ''
    },
    methods: {},

    vuetify: new Vuetify(),
    router
})
