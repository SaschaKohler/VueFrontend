var loginUser = Vue.component('login-User', {
    template: `
    <v-card 
      :elevation="2"
      class="mx-auto my-12 pa-3 w-full" 
      max-width="">

    <v-form 
        ref="form"
         v-model="valid">
      <ul v-if="errorMessage" v-for="error in errorMessage" class="red--text text-caption">
        <li>{{error}}</li>
        
</ul>

      <v-text-field
            label="Username"
            color="brown"
            :counter="25"
            v-model="user.username"
            :rules="nameRules">
        </v-text-field>
        <v-text-field
            label="password"
            color="brown"
            :counter="25"
            v-model="user.password"
            :rules="passRules">
        </v-text-field>
       
      <v-btn
      :disabled="!valid"
      color="success"
      outlined
      class="mt-4"
      @click="loginUser"
    >
      login
    </v-btn>
      <v-btn
      :elevation="0"
      absolute
      right
      color=""
      right
      small
      class="mt-5"
      @click="$router.push({path:'/register'})"
    >
      registration
    </v-btn>
    
    
 </div>
</v-form>
<p class="text-center gray--text pt-5 ">
    &copy;2021 sksoft Corp. All rights reserved.
</p>
</v-card>`,

    props: ["id"],
    $_veeValidate: {
        validator: "new"
    },
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'required',
            v => (v && v.length <= 25) || 'Max 25 characters',
            v => (v && v.length >= 3) || 'Min 3 characters',

        ],
        emailRules: [
            v => !!v || 'required',
            v => (v && v.length <= 25) || 'Max 25 characters'
        ],
        passRules: [
            v => !!v || 'required',
            v => (v && v.length <= 25) || 'Max 25 characters'
        ],

        loading: false,
        user: {
            name: '',
            username:'',
            email:'',
            password:'',
        },
        errored: false,
        updated: false,
        isUpdating: false,
        editing: false,
        errorMessage: [],
        response:[]

    }),

    mounted() {

    },
    methods: {
        async loginUser() {
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.post('http://localhost/api/login/' , {
                    username: this.user.username,
                    password: this.user.password,

                });
                this.response = response.data
            } catch (error) {
                console.log(error)
            } finally {
                if(this.response.error ) {
                    console.log('error ' + this.response.error)
                    this.errored=true

                    this.errorMessage = this.response
                }
                else{
                    console.log('successfull '+ this.response.username);
                    this.errored=false
                    this.errorMessage=[];
                    this.reset();
                    localStorage.setItem('username', this.response.username);
                    router.push( {path:'/', params: { username: this.response.username}});
                }
            }
        },
        reset() {
            this.$refs.form.reset()
        }


    },

})

