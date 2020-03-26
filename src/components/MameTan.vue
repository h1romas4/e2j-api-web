<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form
          @submit.prevent="">
          <v-toolbar
            dark
            color="grey darken-3">
          <v-toolbar-title>E2J まめ単 API</v-toolbar-title>
            <v-autocomplete
              v-model="select"
              :loading="loading"
              :items="items"
              :search-input.sync="search"
              :label="randome"
              cache-items
              color="light-blue darken-3"
              class="mx-4"
              filled
              flat
              hide-no-data
              hide-details
              solo-inverted
            ></v-autocomplete>
            <v-btn large
              @click="onSearch"
              color="light-blue darken-3">
              <v-icon>mdi-cached</v-icon>
              Search
            </v-btn>
         </v-toolbar>
        </v-form>
      </v-col>
    </v-row>
    <v-timeline dense>
      <v-timeline-item
        v-for="(result, i) in results"
        :key="i"
        small
        color="grey darken-3"
      >
        <template v-slot:opposite></template>
        <v-card class="elevation-2">
          <v-card-title class="headline">
            <v-btn
              color="primary"
              class="ma-2"
              v-for="release in result.release" :key="release.version"
              :href="'https://www.e2j.net/?s=' + release.version" target="_blank">
              {{ new Date(release.date) | dateFormat('YYYY-MM-DD') }}&nbsp;({{ release.version }})
            </v-btn>
          </v-card-title>
          <v-card-text>
            <blockquote class="blockquote">
              <p><small>{{ result.filename }}</small></p>
              <pre :class="$style.nowrap" v-html="result.content"></pre>
            </blockquote>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Exception</v-card-title>
        <v-card-text>検索結果がありませんでした。これは不具合です。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style module>
.nowrap {
  white-space: pre-wrap;
}
</style>

<script>
  import axios from 'axios'
  import sanitize from 'sanitize-html'
  import { apiBaseUrl, apiMametan, apiWhatsNewJ, apiRelases } from './mametan'

  export default {
    name: "MameTan",
    data() {
      return {
        loading: false,
        randome: "Now loading dictionary. Please wait..",
        items: [],
        search: null,
        dialog: false,
        select: null,
        nowSearch: null,
        results: [],
        resultsCashe: {},
        memetan: [],
        releases: [],
      }
    },
    watch: {
      search(val) {
        // list selected
        if(val && val !== this.select) this.querySelections(val)
      },
    },
    methods: {
      querySelections(val) {
        this.items = this.memetan.filter(e => {
          return (e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
        })
      },
      async queryWhatsNewJ(val) {
        if(this.memetan.indexOf(val) === -1) return
        if(this.loading) return

        this.randome = val
        if(val in this.resultsCashe) {
          this.results = this.resultsCashe[val]
          return
        }
        try {
          this.loading = true
          const res1 = await axios.get(`${apiBaseUrl}${apiWhatsNewJ}`, {
            params: { q: val }
          })
          // another search break
          if(val !== this.nowSearch) return
          // exception
          if(!Array.isArray(res1.data)) {
            this.dialog = true
            return
          }
          this.results = []
          res1.data.forEach((data) => {
            const release = this.getMameVersion(data.filename)
            let record = {
              filename: data.filename,
              release: release.release,
              content: "",
              line: data.line
            }
            // speed hack (TODO:)
            const content = this.highlight(data.content, val)
            Object.defineProperty(record, 'content', {
              configurable: false,
              value: content
            })
            this.results.push(record)
          })
          this.results.sort((a, b) => {
            return a.release.date - b.release.date
          })
          this.resultsCashe[val] = this.results
        } finally {
          this.loading = false
        }
      },
      async onSearch() {
        this.nowSearch = this.search
        // search query (TODO:)
        this.queryWhatsNewJ(this.search)
      },
      highlight(value, search) {
        // const content = escape(value)
        const content = sanitize(value)
        return content.replace(new RegExp(search, 'ig'), `<span class="blue-grey lighten-5">${search}</span>`)
      },
      getMameVersion(filename) {
        const regex = filename.match(/^whatsnewJ_(.+)\.txt$/)
        let release = []
        if(regex) {
          const vers = regex[1].split("-")
          vers.forEach((val) => {
            const verstr = "0." + val.replace(".", "").substring(1, val.length)
            release.push( { version: verstr, date: this.findReleaseDate('mame', verstr) })
          })
        }
        return { release: release }
      },
      findReleaseDate(kind, version) {
        // hack Final
        const find = this.releases[kind].find(rels => rels.version.replace(" Final", "") == version)
        // hack mame 0.36
        let date = "1999-07-19T00:00:00.000Z"
        if(find) date = find.date
        return Date.parse(date)
      },
      getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
    },
    async mounted() {
      this.loading = true
      try {
        const res1 = await axios.get(`${apiBaseUrl}${apiMametan}`)
        res1.data.sort((a, b) => { return a.length - b.length })
        this.memetan = res1.data
        const res2 = await axios.get(`${apiBaseUrl}${apiRelases}`)
        this.releases = res2.data
        this.randome = this.memetan[this.getRandomInt(this.memetan.length)]
      } catch(err) {
        console.log(err)
      }
      finally {
        this.loading = false
      }
    },
  }
</script>
