var error404 = Vue.component('error404', {
    template: `
   <div class="error404"> 
   <v-img
                    contain
                    :aspect-ratio="16/9"
                    :src=errorlog
                    alt="No logo"
                    height="600"
            ></v-img>
            
            <p class="text-center">Sorry, but this Page doesn't seem to exist !</p>
    </div>
    `
    ,
    props: [""],
    $_veeValidate: {
    validator: "new"
},
data() {
    return {

        errorlog : "../assets/404.svg"
    }
},
})