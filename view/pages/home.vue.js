
var airhome = Vue.component("Home",{

template: `<div>
             <v-layout d-flex align-center flex-wrap>
                   <v-layout d-flex flex-column align-center justify-space-between>
                  <v-img
                   :src="me"
                    class="rounded-circle elevation-5" 
                    height="300"
                    width="200"
                    
                   />
                   <h5 class="text-h3">+</h5>
                     <v-img
                   :src="fakeApi"
                   width="100"
                   />
                   <p>Fake API</p>
                   
                </v-layout>
                   <h1 class="text-h1 amber--text px-2 elevation-1 pa-5 rounded-xl">VS.</h1>
                   <v-layout d-flex flex-column align-center justify-space-between>
                    <p class="green--text text center text-h6 pa-5">Vue.js
                    <v-img
                       :src="vue"
                        width="100"
                        />
                    
                    </p>
                    <p class="red--text text center text-h6 pa-5">Laravel
                    <v-img
                   :src="laravel"
                   width="100"
                   />
                    
                    </p>
                    <p class="blue--text text center text-h6 pa-5" >Vuetify 
                    <v-img
                   :src="vuetify"
                   width="100"
                   /></p>
                    <p class="blue--text text--darken-2 text center text-h6 pa-5" >Docker
                    <v-img
                   :src="docker"
                   width="100"
                   /></p>
                    
                  </v-layout>
                </v-layout>
     <p class="mt-2 px-4">
                        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                        for
                        previewing layouts and visual mockups.</p>
               
       

    </div>`,

data() {
    return {
        me : "../assets/me.png",
        vuetify: "https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-atom.svg",
        docker: "https://www.docker.com/sites/default/files/d8/2019-07/horizontal-logo-monochromatic-white.png",
        laravel: "https://laravel.com/img/logotype.min.svg",
        vue: "https://vuejs.org/images/logo.svg",
        fakeApi: "https://www.instantwebtools.net/images/main_icons/api.png"
    }
}

});


