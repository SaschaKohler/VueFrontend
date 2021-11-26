var profileUser = Vue.component('profile-user', {
    template: `
   <v-card 
      :elevation="2"
      class="mx-auto my-12 pa-3" 
      width="600px">

    <v-form 
        ref="form"
         >
         <p class="text-overline">Update Your Profile, {{ user.username }}</p>
            <v-alert type="success" dense transition="fade-transition" :value="alertSuccess">Profile successfully updated</v-alert> 
      
         <ul v-if="errorMessage"  class="red--text text-caption mb-4">
                 <li v-for="error in errorMessage">{{error}}</li>       
         </ul>

      <v-text-field
            label="Name"
            color="brown"
            :counter="25"
            v-model="user.name">
        </v-text-field>
      <v-text-field
            label="Username"
            color="brown"
            :counter="25"
            v-model="user.username">
        </v-text-field>
       <v-text-field
            label="email"
            color="brown"
            :counter="25"
            v-model="user.email"
            class="mb-4">
        </v-text-field>
    
      <v-btn
      color="success"
      outlined
      class="mr-4"
      @click="updateUser"
    >
      Update
    </v-btn>

    <v-btn
      color="error"
      outlined
      class="mr-4"
      @click="getUser"
    >
      Reset Form
    </v-btn>
 </div>
</v-form>
<p class="text-center text-caption gray--text pt-5 ">
    &copy;2021 sksoft Corp. All rights reserved.
</p>
</v-card>`,

    props: [],
    $_veeValidate: {
        validator: "new"
    },
    data: () => ({
        valid: true,
        loading: false,
        user: [],
        errored: false,
        alertSuccess: false,
        errorMessage: [],
        response: [],
        token: '',
        username: ''

    }),
    watch: {
        alertSuccess(value) {
            this.hide_alertSuccess()

        },
        user(value) {
            this.user = value
        }

    },
    mounted() {
        this.username = localStorage.getItem('username');
        this.token = localStorage.getItem('usertoken')
        this.getUser()

    },
    methods: {

        hide_alertSuccess: function (event) {
            window.setInterval(() => {
                this.alertSuccess = false;
                this.$router.go();
            }, 3000);
        },
        async updateUser() {
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.put('http://localhost/api/user/' + this.user.id,

                    {
                        username: this.user.username,
                        name: this.user.name,
                        email: this.user.email,
                    },
                    {
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Authorization': 'Bearer ' + this.token
                        }
                    }
                );
                this.response = response
                    console.log('successfull ' + this.response.data.username);
                    localStorage.setItem('username', this.response.data.username)
                    this.user = this.response.data
                    this.username = this.user.username
                    this.errored = false
                    this.errorMessage = [];
                    this.alertSuccess = true
            } catch (error) {
                console.log(error.response.data)
                this.errored = true
                this.errorMessage = error.response.data
            }


        },
        reset() {
            this.$refs.form.reset()
        },

        async getUser() {
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.get('http://localhost/api/user/' + this.username, {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + this.token
                        }
                    }
                );
                this.response = response
                this.errored = false
                this.errorMessage = []
                this.user = this.response.data
            } catch (error) {
                console.log(error.response)
                this.errored = true
                this.errorMessage = error.response
            }
        }
    }

})

