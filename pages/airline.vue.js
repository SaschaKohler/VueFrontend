var airlines = Vue.component("airlines", {
    template: `

    <v-progress-circular  v-if="loading" :width="3" center indeterminate color="red"></v-progress-circular>
   
   <div v-else>
   <v-simple-table>
        <thead>
        <tr class="grey lighten-2 blue-grey--text text--darken-4">
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
           <th class="text-center">
             Action
           </th>
        </tr>
        </thead>
        <tbody class="">
        <tr  v-for="airline in airlines.data" :key="airline.id">
        <td><v-img  height="32" width="32" v-bind:src="airline.logo" ></v-img></td>
        <td class="pa-2">
        <div class="text-h5">{{ airline.name }}</div>
        <div class="grey--text grey lighten-4 pa-2 rounded elevation-1"> {{airline.slogan}}</div>
         </td>
        <td>
        <div>{{airline.headquarters}}</div> 
         <div>{{airline.website}}</div>
         </td>
        <td>{{airline.established}}</td>
        <td>
        <router-link :to="{path: '/airlines/' + airline.id }">Details</router-link>
        <router-link :to="{path: '/passengers/' + airline.id }">Passengers</router-link>
        </td>
        </tr>
    </tbody>
</v-simple-table>
  <div class="text-center">
            <v-pagination
              v-model="pagination.current"
              class="my-4"
              :length="pagination.total"
              :total-visible="7"
              @input="onPageChange"
            ></v-pagination>
     
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
            NumberOfPassengers: null,
            loading: true,
            errored: false,
            pagination: {
                current:1,
                total:0
            }
        }
    },
    methods: {
        async getAirlines() {
            try {
                let response = await axios.get('http://localhost/api/airlines?page=' + this.pagination.current);
                this.airlines = response.data
                this.pagination.current = response.data.current_page;
                this.pagination.total = response.data.last_page;
            } catch (error) {
                this.errored = true;
            } finally {
                this.loading = false;
            }
        },
        onPageChange(){
            this.getAirlines();
        }
    },
    mounted() {
        this.getAirlines();
    }
})