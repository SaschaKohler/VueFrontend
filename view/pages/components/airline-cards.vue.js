Vue.component('airline-cards', {
    template: `
<div class="d-flex flex-wrap ml-3 ">
    <v-hover :key="airline.id" v-for="airline in airlines.data" v-slot="{ hover } ">
        <v-card
                :class="{ 'on-hover' : hover }"
                :elevation="hover ? 16 : 2"
                class=" mx-auto my-12 pa-3"
                max-width="370"
        >
            <v-img
                    contain
                    :aspect-ratio="16/9"
                    :src=airline.logo
                    alt="No logo"
                    height="100"
            ></v-img>
            <div class="pa-2">
                <v-card-title class="text-h5" >{{airline.name}}</v-card-title>
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
            <v-card-action class="d-flex flex-column pa-3" >
                <v-btn :elevation="1" color="amber lighten-5" class="amber--text text--darken-4" @click="$router.push('/airlines/' + airline.id)">Details</v-btn>
                <v-btn :elevation="1" color="amber lighten-5" class="mt-4 amber--text text--darken-4" @click="$router.push('/passengers/' + airline.id)">Passengers</v-btn>
                </v-card-action>
        </v-card>
    </v-hover>
</div>`,
    props: ["airlines"],
    $_veeValidate: {
        validator: "new"
    },
    data() {
        return {}
    },
})