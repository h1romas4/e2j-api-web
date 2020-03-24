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
    <v-timeline dense>
      <v-timeline-item
        v-for="(result, i) in results"
        :key="i"
        small
      >
        <template v-slot:opposite>
          <span
            :class="`headline font-weight-bold`"
            v-text="result.release"
          ></span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">{{ result.filename }}</v-card-title>
          <v-card-text><pre>{{ result.content }}</pre></v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { apiBaseUrl, apiMametan, apiWhatsNewJ } from './mametan';

  export default {
    name: "MameTan",
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        results: [],
        memetan: [],
        releases: [],
      }
    },
    watch: {
      search (val) {
        if(val) {
          if(val !== this.select) this.querySelections(val)
          if(this.memetan.indexOf(val) >= 0) this.queryWhatsNewJ(val)
        }
      },
    },
    methods: {
      querySelections (v) {
        this.items = this.memetan.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
      },
      async queryWhatsNewJ (val) {
        console.log("hit!")
        this.loading = true
        try {
          const res1 = await axios.get(`${apiBaseUrl}${apiWhatsNewJ}`, {
            params: { q: val }
          })
          this.results = []
          res1.data.forEach((data) => {
            this.results.push({
              filename: data.filename,
              release: "release",
              content: data.content,
              line: data.line
            })
          })
          console.log(this.results)
        } finally {
          this.loading = false
        }
      },
    },
    async mounted() {
      this.loading = true
      try {
        const res1 = await axios.get(`${apiBaseUrl}${apiMametan}`)
        this.memetan = res1.data
        const res2 = await axios.get(`${apiBaseUrl}${apiMametan}`)
        this.releases = res2.data
      } finally {
        this.loading = false
      }
    },
  }
</script>
