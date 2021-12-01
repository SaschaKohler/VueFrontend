Vue.component("nav-toolbar", {
    template: `
    <div>
     <v-app-bar app clipped-left color="amber"> 
        <v-layout align-center justify-center>
            <v-app-bar-nav-icon  @click="menu=!menu"></v-app-bar-nav-icon>
            <v-toolbar-title class="brown--text d-none d-sm-flex">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <router-link  to="/profile" v-if="username !=''" class="text-caption brown--text mr-4 mt-4">Welcome, {{ username}}</router-link>
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="290"
                    v-if="username !=''"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                          text 
                          elevation="1" 
                          large 
                          class="red lighten-2 mt-2 pa-2 rounded"          
                          v-bind="attrs"
                          v-on="on"
                          >
                          Logout
                    </v-btn>
                    </template>
                        <v-card>
                         <v-card-title class="text-h5">Logout</v-card-title>
                         <v-card-text>Are you sure ?</v-card-text>
                         <v-spacer></v-spacer>
                        <v-btn
                        color="red darken-1"
                         text
                        @click="dialog = false"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                         color="green darken-1"
                          text
                      @click="logout"
                     >
                        Log Me out
                    </v-btn>
                    </v-card>
                </v-dialog>
               
                <router-link v-if="username == ''" to="/login">
                    <v-btn text outlined elevation="0" small class="brown--text">Login</v-btn>
                </router-link>  
                <router-link  v-if="username == ''" class="pl-2"  to="/register">
                    <v-btn text outlined elevation="0" small class="brown--text">Registration</v-btn>
                </router-link>
            </v-toolbar-items> 
        </v-layout>
     </v-app-bar>
 
    <v-navigation-drawer app clipped flat v-model="menu">
        <v-list nav>
            <v-list-item-group>
                <v-list-item    
                    v-for="(item,i) in items" :key="i" @click="$router.push(item.path)">
                <v-list-item-action>
                    <v-icon color="black">{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="brown--text">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
 
</div>`,
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    watch: {
        username() {
            if (localStorage.username) this.username =
                localStorage.username
            else {
                this.username = ''
            }
        }
    },
    mounted() {
        if (localStorage.username) this.username =
            localStorage.username
        else {
            this.username = ''
        }

        if (localStorage.getItem("usertoken")) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("usertoken");
        }


    },
    data() {
        return {
            menu: false,
            dialog: false,
            username: '',
            token: '',
            csrfToken: '',
            items: [
                {title: "Home", icon: "mdi-home", path: "/"},
                {title: "Get Airlines", icon: "mdi-api", path: "/airlines"},
                {title: "Register Airline", icon: "mdi-airplane-plus", path: "/create-airline"}
            ]
        }
    },
    methods: {
        logout() {
            this.dialog = false
            axios.post('http://localhost/api/user/logout')
                .then(response => {
                    console.log(response.data.msg)
                    localStorage.removeItem('usertoken')
                    localStorage.removeItem('username')
                    this.$router.go('/')
                  

                }).catch(error => {
                console.log(error.response.status)
            });

        }
        // axios.post('http://localhost/api/user/logout', {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'Bearer ' + localStorage.usertoken
        //     }
        // }).then( (response) => {
        //     console.log(response.data)
        //     localStorage.removeItem('username');
        //     localStorage.removeItem('usertoken')
        //
        // }).catch((error) => {
        //     console.log(error.response)
        // })

        // if(this.$route.path != '/') {
        //     this.$router.push({path: '/'});
        // }

    }

})