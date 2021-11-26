var airlines = Vue.component("airlines", {
    template: `
<div class="mt-9 px-5">
<v-row v-if="loading" class="mx-auto">
    <v-progress-circular   :width="3" indeterminate color="red"></v-progress-circular>
 </v-row>  
   <div v-else>
       
       <div class="d-flex d-sm-flex justify-sm-center flex-sm-wrap flex-wrap">
       <v-select 
          v-model="pagination.perPage"
          :items="items"
          color="brown"
          label="Items Per Site"
          class="px-2 select"
          @input="onPageChange"
        /> 
        
        <v-text-field 
            label="Search by Name"
            color="brown"
            v-model="searchInput"
            class="px-2 search"
            @input="onPageChange"
        />
        </div>
    <div class="text-center">
       <p class="text-caption font-weight-bold">Showing {{ this.pagination.from }} 
       to {{this.pagination.to}} of total {{this.pagination.total}}</p>       
            <v-pagination
              v-model="pagination.current"
              class="my-4"
              color="amber lighten-3 amber--text text--darken-4 "
              :length="pagination.lastPage"
              :total-visible="7"
              @input="onPageChange"
            ></v-pagination>
   </div>
    
  <v-simple-table   class="d-none d-md-flex pt-9 pb-9 ">
        <thead>
        <tr>
            <th class="text-center">
                Logo
            </th>
            <th class="text-center">
              Name / Slogan
            </th>
            <th class="text-center">
               Headquarters / Website
            </th>
           <th class="text-center">
             Established
           </th>
        </tr>
        </thead>
        <tbody>
        <v-hover  v-slot="{ hover }" 
        v-for="airline in airlines.data" :key="airline.id">
    
 
        <tr   :class="{'gray lighten-4' : hover }" @click="$router.push('/airlines/' + airline.id)" >
        <td><v-img  contain :aspect-ratio="16/9" width="200" v-bind:src="airline.logo" ></v-img></td>
        <td class="pa-5">
        <p class="text-h6">{{ airline.name }}</p>
        <p class="grey--text lighten-4">{{airline.slogan}}</p>
         </td>
        <td class="pa-5">
        <p>{{airline.headquarters}}</p> 
         <p>{{airline.website}}</p>
         </td>
        <td class="text-h6 amber--text text--darken-4">{{airline.established}}</td>
<!--        <td class="text-center">-->
<!--              <v-btn small outlined :elevation="0" color="amber"  class="amber&#45;&#45;text" @click="$router.push('/airlines/' + airline.id)"><v-icon left>mdi-airplane-search</v-icon>Details</v-btn>-->
<!--                <v-btn small outlined :elevation="0" color="amber"  class="ml-2 amber&#45;&#45;text" @click="$router.push('/passengers/' + airline.id)"><v-icon left>mdi-account-search</v-icon>Passengers</v-btn>-->
<!--          </td>-->
        </tr>
    
     
        </v-hover>
    </tbody>
   </v-simple-table>
   <airline-cards :airlines="airlines" class="d-xs-flex d-sm-flex d-md-none"></airline-cards>

     <div class="text-center">
       <p class="text-caption font-weight-bold">Showing {{ this.pagination.from }} 
       to {{this.pagination.to}} of total {{this.pagination.total}}</p>       
            <v-pagination
              v-model="pagination.current"
              class="my-4"
              color="amber lighten-3 amber--text text--darken-4 "
              :length="pagination.lastPage"
              :total-visible="7"
              @input="onPageChange"
            ></v-pagination>
   </div>
  </div>
  </div>
 

`,
    props: ["title"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {
            airlines: [],
            items: ['5','10', '15', '20', '25', '100'],
            NumberOfPassengers: null,
            loading: true,
            errored: false,
            pagination: {
                current: 1,
                total: 0,
                perPage: 15,
                from:1,
                to:15,
                lastPage:0
            },
            presentation:{
                style: 'classic'

            },
            searchInput: ''
        }
    },
    methods: {
        async getAirlines() {
            try {
                let response = await axios.get('http://localhost/api/airlines?page='
                    + this.pagination.current
                    + '&per_page=' + this.pagination.perPage
                    + '&search=' + this.searchInput);
                this.airlines = response.data
                this.pagination.current = response.data.current_page;
                this.pagination.total = response.data.total;
                this.pagination.lastPage = response.data.last_page;
                this.pagination.perPage = response.data.per_page;
                this.pagination.from = response.data.from;
                this.pagination.to = response.data.to;
            } catch (error) {
                this.errored = true;
            } finally {
                this.loading = false;
            }
        },
        onPageChange() {
            this.getAirlines();
        }
    },
    mounted() {
        this.getAirlines();
    }
})
