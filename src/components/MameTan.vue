<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-toolbar
          dark
          color="teal"
        >
          <v-toolbar-title>E2J まめ単 API</v-toolbar-title>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            clearable
            cache-items
            class="mx-4"
            filled
            flat
            hide-no-data
            hide-details
            label="All your base are belong to us."
            solo-inverted
          ></v-autocomplete>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { apiBaseUrl, apiMametan } from './mametan';

  export default {
    name: "MameTan",
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        states: [],
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      },
    },
    async mounted() {
      this.loading = true
      const res = await axios.get(`${apiBaseUrl}${apiMametan}`)
      this.states = res.data
      this.loading = false
    }
  }
</script>
