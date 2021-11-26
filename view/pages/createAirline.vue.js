var createAirline = Vue.component('create-airline', {
    template: `

    <v-alert v-if="username == ''" type="error" elevation="2">You must be a legit User in order to register a new Airline</v-alert>

    <v-card v-else
      :elevation="2"
      class="mx-auto my-12 pa-3" 
      width="900px">

    <v-form 
        ref="form"
         v-model="valid">
         <p class="text-overline">Register Airline</p>
         <v-alert type="success" dense transition="fade-transition" :value="alertSuccess">Airline successfully registered</v-alert> 
              <ul v-if="errorMessage"  class="red--text text-caption mb-4">
                 <li v-for="error in errorMessage">{{error}}</li>       
            </ul>
      <v-text-field
            label="Airline Name"
            color="brown"
            :counter="255"
            clearable
            hint="Please provide a reasonable name"
            v-model="airline.name"
            :rules="rules">
        </v-text-field>
      <v-text-field
            label="Country"
            color="brown"
            :counter="255"
            clearable
            v-model="airline.country"
            :rules="rules">
        </v-text-field>
       <v-text-field
            label="Logo"
            color="brown"
            :counter="255"
            hint="Please provide a valid Url"
            clearable
            v-model="airline.logo"
            :rules="logoRules">
        </v-text-field>
        <v-text-field
            label="Slogan"
            color="brown"
            :counter="255"
            clearable
            v-model="airline.slogan"
            :rules="rules">
        </v-text-field>
    <v-text-field
            label="Headquarters"
            color="brown"
            :counter="255"
            clearable
            v-model="airline.headquarters"
            :rules="rules">
        </v-text-field>
     <v-text-field
            label="Website"
            color="brown"
            hint="Please provide a valid Url"
            clearable
            :counter="255"
            v-model="airline.website"
            :rules="rules">
        </v-text-field>
      <v-text-field
            label="Established in"
            color="brown"
            :counter="4"
            clearable
            hint="please give a reasonable year like '1984'"
            v-model="airline.established"
            :rules="rules">
        </v-text-field>
       
      <v-btn
      :disabled="!valid"
      color="success"
      outlined
      class="mr-4 mt-5"
      @click="createAirline"
    >
      Create
    </v-btn>

    <v-btn
      color="error"
      outlined
      class="mr-4 mt-5"
      @click="reset"
    >
      Reset Form
    </v-btn>
</div>
</v-form>
<p class="text-center text-caption gray--text pt-5 ">
    &copy;2021 sksoft Corp. All rights reserved.
</p>
</v-card>`,

    props: ["id"],
    $_veeValidate: {
        validator: "new"
    },
    data: () => ({
        username: '',
        valid: true,
        name: '',
        rules: [
            v => !!v || 'required',
            v => (v && v.length <= 255) || 'Name must be less than 25 characters',
        ],

        loading: false,
        airline: {
            name: '',
            country: '',
            logo: '',
            slogan: '',
            headquarters: '',
            website: '',
            established: ''
        },
        errored: false,
        alertSuccess: false,
        errorMessage: [],
        response: []

    }),
    watch: {
        alertSuccess(value) {
            this.hide_alertSuccess()

        }
    },
    mounted() {
        if (localStorage.username) {
            this.username = localStorage.username
        }
    },
    methods: {
        hide_alertSuccess: function (event) {
            window.setInterval(() => {
                this.alertSuccess = false;
            }, 3000);
        },
        async createAirline() {
            this.errored = false
            this.alertSuccess = false
            try {
                let response = await axios.post('http://localhost/api/airlines/', {
                    name: this.airline.name,
                    country: this.airline.country,
                    logo: this.airline.logo,
                    slogan: this.airline.slogan,
                    headquarters: this.airline.headquarters,
                    website: this.airline.website,
                    established: this.airline.established,

                });
                this.response = response;
            } catch (error) {   // 401,406
                console.log(error.response.data)
                this.errored = true
                this.errorMessage = error.response.data
            } finally {
                if (this.response.status === 201) {
                    this.errored = false
                    this.errorMessage = []
                    this.alertSuccess = true;
                    this.reset();

                }
            }
        }
        ,
        reset() {
            this.$refs.form.reset()
        }


    },

})

