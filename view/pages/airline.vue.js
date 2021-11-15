var airlines = Vue.component("airlines", {
    template: `
<div class="mt-9 px-5">
<v-row v-if="loading" >
    <v-progress-circular col-3  :width="3" indeterminate color="red"></v-progress-circular>
 </v-row>  
   <div v-else>
       
       <div class="d-flex d-sm-flex justify-sm-center flex-sm-wrap flex-wrap">
       <v-select 
          v-model="pagination.perPage"
          :items="items"
          label="Items Per Site"
          @input="onPageChange"
          class="col-3 flex-shrink-1"     
        /> 
        
        <v-text-field 
        label="Search by Name"
          v-model="searchInput"
          class="col-6 order-3"
          @input="onPageChange"
        />
        </div>
  <div class="text-center">
       <p class="text-caption font-weight-bold">Showing {{ this.pagination.from }} 
       to {{this.pagination.to}} of total {{this.pagination.total}}</p>       
            <v-pagination
              v-model="pagination.current"
              class="my-4"
              :length="pagination.lastPage"
              :total-visible="7"
              @input="onPageChange"
            ></v-pagination>
   </div>
       <v-radio-group row 
        v-model="presentation.style"
        class="mt-9 "
       > Display as 
        <v-radio
        label="Table"
        value="classic"
        class="pl-9"
         />
        <v-radio
        label="Cards"
        value="cards"
         />
        
        </v-radio-group>
    
   <v-simple-table class="pt-9 pb-9" v-if="presentation.style === 'classic'">
        <thead>
        <tr>
            <th class="text-center text-h6">
                Logo
            </th>
            <th class="text-center text-h6">
              Name / Slogan
            </th>
            <th class="text-center text-h6">
               Headquarters / Website
            </th>
           <th class="text-center text-h6">
             Established
           </th>
           <th class="text-center text-h6">
             Action
           </th>
        </tr>
        </thead>
        <tbody class="">
        <tr  v-for="airline in airlines.data" :key="airline.id">
        <td><v-img  height="32" width="32" v-bind:src="airline.logo" ></v-img></td>
        <td class="pa-2">
        <div >{{ airline.name }}</div>
        <div class="grey--text grey lighten-4 pa-2 rounded"> {{airline.slogan}}</div>
         </td>
        <td>
        <div>{{airline.headquarters}}</div> 
         <div>{{airline.website}}</div>
         </td>
        <td>{{airline.established}}</td>
        <td>
        <router-link :to="{path: '/airlines/' + airline.id }">Details</router-link>
        <router-link :airliner="airline" :to="{path: '/passengers/' + airline.id }">Passengers</router-link>
        </td>
        </tr>
    </tbody>
</v-simple-table>
<airline-cards :airlines="airlines" v-if="presentation.style == 'cards'"></airline-cards>

  <div class="text-center">
            <v-pagination
              v-model="pagination.current"
              class="my-4"
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
