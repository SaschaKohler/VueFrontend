var editAirline = Vue.component('edit-airline', {
    template: `
    <div>
    <template>
  <v-card
    :loading="loading"
    class="mx-auto my-12 pa-3"
    max-width="370"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    
      <v-btn
      class="mb-5 elevation-0"
       @click="$router.push('/airlines')"   
       
       >
        <v-icon left>
            mdi-backspace-outline          
      </v-icon>
       Back
      </v-btn>
    <v-divider></v-divider>
    <v-img
       class="mt-5"
      height="100"
      :src=airline.logo
      alt="No logo"
      v-if="airline.logo"
     
    ></v-img>
     <p v-else>No logo</p>

    <div class="pa-2">
    <v-text-field v-if="editing"
      label="Edit the Name"
      :rules="rules"
      hint="Something reasonable!"
      v-model="airline.name"
      clearable
      color="brown"
      
    ></v-text-field>
    
    <v-card-title v-else class="text-h5">{{airline.name}}</v-card-title>
   </div>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
     
        <div class="grey--text ms-4">
         {{airline.headquarters}}
        </div>
      </v-row>

      <v-row
        align="center"
        class="mx-0"
      >
    
      <div class="my-4 text-subtitle-1">
        {{airline.website}}
      </div>

      <div>{{airline.slogan}}</div>
    </v-row>
    </v-card-text>

  
    <v-divider></v-divider>  
    <v-card-actions>
    <v-chip
      class="ma-2"
      color="brown accent-4"
      outlined
      v-if="!editing"
      @click="toggleEdit"
    >
      <v-icon left>
        mdi-wrench
      </v-icon>
      Edit Branding
    </v-chip>
    <v-chip
      class="ma-2"
      color="brown accent-4"
      outlined
      v-if="!editing"
      :airlineID="airline.id"
      @click="$router.push('/passengers/' + airline.id)"
    >
      <v-icon left>
        mdi-airplane-search
      </v-icon>
      List of Passengers
    </v-chip>
        
     <v-chip
      class="ma-2"
      color="red"
      outlined
      v-if="editing"
      @click="toggleEdit"
    >
      <v-icon left>
        mdi-cancel
      </v-icon>
      Dismiss
    </v-chip>
     <v-chip
      class="ma-2"
      color="green"
      outlined
      diasbled="!valid"
      v-if="editing"
      @click="updateAirlineName"
    >
      <v-icon left>
        mdi-checkbox-marked-circle
      </v-icon>
      Confirm
    </v-chip>
     
     
    
    </v-card-actions>
  </v-card>
</template>
    </div> 
    `,
    props: ["id"],
    $_veeValidate: {
        validator: "new"
    },
    data: () => ({

        loading: false,
        airline: [],
        errored: false,
        updated: false,
        isUpdating: false,
        editing: false,
        rules: [
            value => !!value || 'Required.',
            value => (value && value.length >= 3) || 'Min 3 characters',
            value => (value && value.length <= 10) || 'Max 10 characters'
        ],


    }),

    mounted() {

        this.getAirlineById(this.$route.params.id);


    },
    methods: {
        async getAirlineById(id) {
            try {
                let response = await axios.get('http://localhost/api/airlines/' + id)
                this.airline = response.data;
            } catch (error) {
                console.log(error)

            } finally {
                this.loading = false
            }
        },
        toggleEdit() {
            if (!this.editing)
                this.editing = true;
            else
                this.editing = false;
        },

        async updateAirlineName() {
            let id = this.airline.id;
            this.isUpdating = true;
            this.editing = false
            try {
                let response = await axios.put('http://localhost/api/airlines/' + id, {
                    name: this.airline.name
                });
                this.airline = response.data;
            } catch (error) {
                console.log(error)
            } finally {
                this.updated = true;
                this.isUpdating = false
            }

        },


    },

})