var registerUser = Vue.component('register-User', {
    template: `
    <v-card 
      :elevation="2"
      class="mx-auto my-12 pa-3"
      width="600">

    <v-form 
        ref="form"
         v-model="valid">
         <p class="text-overline">Registration</p>
         <ul v-if="errorMessage"  class="red--text text-caption mb-4">
                 <li v-for="error in errorMessage">{{error}}</li>       
         </ul>

      <v-text-field
            label="name"
            color="brown"
            :counter="25"
            v-model="user.name"
            clearable
            :rules="nameRules">
        </v-text-field>
      <v-text-field
            label="username"
            color="brown"
            :counter="25"
             clearable
            v-model="user.username"
            :rules="nameRules">
        </v-text-field>
       <v-text-field
            label="email"
            color="brown"
            :counter="25"
            v-model="user.email"
             clearable
            hint="Please, provide valid mail address"
            :rules="emailRules">
        </v-text-field>
        <v-text-field
            label="password"
            color="brown"
            :counter="25"
            v-model="user.password"
            type="password"
             clearable
            :rules="passRules">
        </v-text-field>
        <v-text-field
            label="password confirmation"
            color="brown"
            hint="please, repaet your password"
            :counter="25"
            v-model="user.password_confirmation"
            :rules="passRules"
             type="password"
             clearable
            class="mb-6">
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
<p class="text-center taext-caption gray--text pt-5 ">
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
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        errored: false,
        updated: false,
        isUpdating: false,
        editing: false,
        errorMessage: [],
        response: []

    }),

    mounted() {

    },
    methods: {
        async registerUser() {
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.post('http://localhost/api/register/', {
                    name: this.user.name,
                    username: this.user.username,
                    email: this.user.email,
                    password: this.user.password,
                    password_confirmation: this.user.password_confirmation

                });
                this.response = response
                console.log('successfull ' + this.response.data.user);
                this.errored = false
                this.errorMessage = [];
                this.reset();
                localStorage.setItem('username', this.response.data.user.username);
                localStorage.setItem('usertoken', this.response.data.token);
                router.push({path: '/', params: {username: this.response.data.user.username}});
            } catch (error) {
                console.log(error.response.data)
                this.errored = true

                this.errorMessage = error.response.data

            }
        },
        reset() {
            this.$refs.form.reset()
        }


    },

})

