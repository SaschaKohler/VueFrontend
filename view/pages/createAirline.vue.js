var createAirline = Vue.component('create-airline', {
    template: `
    <v-card 
      :elevation="2"
      class="mx-auto my-12 pa-3 w-full" 
      max-width="">

    <v-form 
        ref="form"
         v-model="valid">
        <p v-if="updated" class="bg-green-100 text-black border p-2 rounded m-1">Airline
            successfully created</p>
        <p v-if="isUpdating" class="bg-green-50 text-black border p-2 rounded m-1">Updating...</p>
      <ul v-if="errored" v-for="error in errorMessage" class="bg-red-50 text-black border p-2 rounded m-1">
        <li>{{error}}</li>
        
</ul>

      <v-text-field
            label="Airline Name"
            color="brown"
            :counter="25"
            v-model="airline.name"
            :rules="nameRules">
        </v-text-field>
      <v-text-field
            label="Country"
            color="brown"
            :counter="25"
            v-model="airline.country"
            :rules="nameRules">
        </v-text-field>
       <v-text-field
            label="Logo"
            color="brown"
            :counter="65"
            v-model="airline.logo"
            :rules="logoRules">
        </v-text-field>
        <v-text-field
            label="Slogan"
            color="brown"
            :counter="25"
            v-model="airline.slogan"
            :rules="nameRules">
        </v-text-field>
    <v-text-field
            label="Headquarters"
            color="brown"
            :counter="65"
            v-model="airline.headquarters"
            :rules="nameRules">
        </v-text-field>
     <v-text-field
            label="Website"
            color="brown"
            :counter="25"
            v-model="airline.website"
            :rules="nameRules">
        </v-text-field>
      <v-text-field
            label="Established in"
            color="brown"
            :counter="10"
            v-model="airline.established"
            :rules="nameRules">
        </v-text-field>
       
      <v-btn
      :disabled="!valid"
      color="success"
      outlined
      class="mr-4"
      @click="createAirline"
    >
      Create
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
            v => (v && v.length <= 25) || 'Name must be less than 25 characters',
        ],
        logoRules: [
            v => !!v || 'required',
            v => (v && v.length <= 65) || 'Name must be less than 65 characters',
        ],

        loading: false,
        airline: {
            name: '',
            country:'',
            logo:'',
            slogan:'',
            headquarters:'',
            website:'',
            established:''
        },
        errored: false,
        updated: false,
        isUpdating: false,
        editing: false,
        errorMessage: []

    }),

    mounted() {



    },
    methods: {
        async createAirline() {
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.post('http://localhost/api/airlines/' , {
                    name: this.airline.name,
                    country: this.airline.country,
                    logo: this.airline.logo,
                    slogan: this.airline.slogan,
                    headquarters: this.airline.headquarters,
                    website: this.airline.website,
                    established: this.airline.established,

                });
                this.airline = response.data;
            } catch (error) {
                console.log(error)
            } finally {
                if (!this.airline.id) {
                    this.errorMessage = this.airline;
                    this.errored = true
                    this.isUpdating = false
                    this.reset();

                } else {
                    this.updated = true;
                    this.isUpdating = false
                    this.reset();

                }
            }
        },
        reset() {
            this.$refs.form.reset()
        }


    },

})

