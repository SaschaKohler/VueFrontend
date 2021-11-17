var registerUser = Vue.component('register-User', {
    template: `
    <v-card 
      :elevation="2"
      class="mx-auto my-12 pa-3 w-full" 
      max-width="">

    <v-form 
        ref="form"
         v-model="valid">
      <ul v-if="errorMessage" v-for="error in errorMessage" class="red--text text-caption mb-4">
        <li >{{error}}</li>
        
</ul>

      <v-text-field
            label="Name"
            color="brown"
            :counter="25"
            v-model="user.name"
            :rules="nameRules">
        </v-text-field>
      <v-text-field
            label="Username"
            color="brown"
            :counter="25"
            v-model="user.username"
            :rules="nameRules">
        </v-text-field>
       <v-text-field
            label="email"
            color="brown"
            :counter="25"
            v-model="user.email"
            :rules="emailRules">
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
      class="mr-4"
      @click="registerUser"
    >
      Register
    </v-btn>

    <v-btn
      color="error"
      outlined
      class="mr-4"
      @click="reset"
    >
      Reset Form
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
        async registerUser() {
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.post('http://localhost/api/register/' , {
                    name: this.user.name,
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password,

                });
                this.response = response.data
            } catch (error) {
                console.log(error)
            } finally {
                if(!this.response.username ) {
                    console.log('error ' + this.response)
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

