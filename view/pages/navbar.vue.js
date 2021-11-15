Vue.component("nav-toolbar", {
    template: `
    <div>
     <v-app-bar dark app clipped-left fixed color="primary" class="mb-3"> 
        <v-layout align-center justify-center>
            <v-app-bar-nav-icon v-on:click="menu=!menu"></v-app-bar-nav-icon>
            <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-layout>
    </v-app-bar>
 
    <v-navigation-drawer dark app clipped temporary v-model="menu" class="blue white--text">
        <v-list nav dense>
        <v-list-item-group active-class="blue--text text-darken-4 text--accent-4">
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
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
            menu: false,
            items: [
                {title: "Home", icon: "", path: "/"},
                {title: "Get Airlines", icon: "", path: "/airlines"},
                {title: "Create Airline", icon: "", path: "/create-airline"}
            ]
        }
    },
    mounted() {
    },
    methods: {}
})