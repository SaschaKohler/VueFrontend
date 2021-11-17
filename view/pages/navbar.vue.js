Vue.component("nav-toolbar", {
    template: `
    <div>
     <v-app-bar dark app clipped-left fixed color="amber" class="mb-3"> 
        <v-layout align-center justify-center>
            <v-app-bar-nav-icon v-on:click="menu=!menu"></v-app-bar-nav-icon>
            <v-toolbar-title class="brown--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <p v-if="username !='??'" class="text-caption brown--text mr-4 mt-4">Welcome, {{ username}}</p>
                <v-btn v-if="username !='??'" 
                    text 
                    elevation="1" 
                    large 
                    class="red lighten-2 mt-2 pa-2 rounded"
                    @click="logout">Logout</v-btn>
                <router-link v-if="username=='??'" to="/login">
                    <v-btn text outlined elevation="0" small class="brown--text">Login</v-btn>
                </router-link>  
                <router-link  class="pl-4 " v-if="username=='??'" to="/register">
                    <v-btn text outlined elevation="0" small class="brown--text">Registration</v-btn>
                </router-link>
            </v-toolbar-items> 
        </v-layout>
    </v-app-bar>
 
    <v-navigation-drawer dark app clipped v-model="menu" class="amber">
        <v-list nav dense>
        <v-list-item-group active-class="amber amber--text  text--darken-4">
            <v-list-item
               v-for="item in items" :key="item.title" @click="$router.push(item.path)">
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
 
</div>`,
    props: ["title","usernameProp"],
    $_veeValidate: {
        validator: "new"
    },
    watch: {
        username(newName){
            localStorage.username = newName;
        }
    },
    mounted() {
        if(localStorage.username) this.username =
            localStorage.username
    },
    data() {
        return {
            menu: false,
            username : this.props,
            items: [
                {title: "Home", icon: "mdi-home", path: "/"},
                {title: "Get Airlines", icon: "mdi-api", path: "/airlines"},
                {title: "Create Airline", icon: "mdi-airplane-plus", path: "/create-airline"}
            ]
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('username');
            this.username='??'
        }
    }
})