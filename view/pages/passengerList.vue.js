var passengerList = Vue.component('passenger-list', {
    template: `
<div class="mt-9 px-5">
                   <v-row>      
                   <v-select 
                      v-model="pagination.perPage"
                      :items="items"
                      label="Items Per Site"
                      @input="onPageChange"
                    ></v-select> 
                        <v-text-field 
                    label="Search by Name"
                      v-model="searchInput"
                      @input="onPageChange"
                    />
                    </v-row>
                       <v-pagination
                          v-model="pagination.current"
                            class="my-4"
                             :length="pagination.lastPage"
                             :total-visible="7"
                             @input="onPageChange"
                        ></v-pagination>
                    <p class="text-caption text-center font-weight-bold">Showing {{ this.pagination.from }} 
           
                      to {{this.pagination.to}} of total {{this.pagination.total}} </p>     
           
          
                   <v-simple-table class="pt-9 pb-9">
                     <thead>
                <tr>
                    <th class="text-h6">
                        Name
                    </th>
                    <th class="text-h6">
                     Number of trips
                    </th>
                </tr>
        </thead>
                      <tbody class="">
                          <tr  v-for="passenger in passengers.data" :key="passenger.name">
                           <td class="pa-2">{{ passenger.name }}
                            </td>
                            <td class="pa-2"> {{passenger.trips}}
                            </td>
                            </tr>
                        </tbody>
                   </v-simple-table>
         </div> 
    `,
    props: [],
    $_veeValidate: {
        validator: "new"
    },
    data: () => ({

        loading: false,
        passengers: [],
        items: ['5', '10', '15', '20', '25', '100'],
        errored: false,
        updated: false,
        isUpdating: false,
        airline: {
            id: null
        },
        pagination: {
            current: 1,
            total: 0,
            perPage: 15,
            from: 1,
            to: 15,
            lastPage: 0
        },
        searchInput: ''


    }),

    mounted() {

        this.airline.id = this.$route.params.id;
        this.getPassengersById();


    },
    methods: {
        async getPassengersById() {
            try {
                let response = await axios.get('http://localhost/api/passengers?page='
                    + this.pagination.current
                    + '&airline_id=' + this.airline.id
                    + '&per_page=' + this.pagination.perPage
                    + '&search=' + this.searchInput );
                this.passengers = response.data;
                this.pagination.current = response.data.current_page;
                this.pagination.total = response.data.total;
                this.pagination.lastPage = response.data.last_page;
                this.pagination.perPage = response.data.per_page;
                this.pagination.from = response.data.from;
                this.pagination.to = response.data.to;

            } catch (error) {
                console.log(error)

            } finally {
                this.loading = false
            }
        },
        onPageChange() {
            this.getPassengersById()
        },

    },

})