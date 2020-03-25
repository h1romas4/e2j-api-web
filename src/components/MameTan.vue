<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-toolbar
          dark
          color="cyan darken-1"
        >
          <v-toolbar-title>E2J まめ単 API</v-toolbar-title>
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            :label="randome"
            @blur="onblur"
            clearable
            cache-items
            class="mx-4"
            filled
            flat
            hide-no-data
            hide-details
            solo-inverted
            data-element="autocomplete-element"
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
              <pre :class="$style.nowrap" v-html="$options.filters.highlight(result.content, searchb)"></pre>
            </blockquote>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
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
        select: null,
        searchb: null,
        results: [],
        memetan: [],
        releases: [],
      }
    },
    filters: {
      highlight(value, search) {
        // const content = escape(value)
        const content = sanitize(value)
        return content.replace(new RegExp(search, 'ig'), `<span class="blue-grey lighten-5">${search}</span>`)
      }
    },
    watch: {
      search(val) {
        // list selected
        if(val && val !== this.select) this.querySelections(val)
        // search query
        this.queryWhatsNewJ(val)
      },
    },
    methods: {
      querySelections(val) {
        this.items = this.memetan.filter(e => {
          return (e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
        })
      },
      async queryWhatsNewJ(val) {
        if(this.searchb === val) return
        if(this.memetan.indexOf(val) === -1) return
        if(this.loading) return
        this.searchb = val
        this.loading = true
        try {
          const res1 = await axios.get(`${apiBaseUrl}${apiWhatsNewJ}`, {
            params: { q: val }
          })
          this.results = []
          res1.data.forEach((data) => {
            const release = this.getMameVersion(data.filename)
            // let release = filename
            this.results.push({
              filename: data.filename,
              release: release.release,
              content: data.content,
              line: data.line
            })
          })
          this.results.sort((a, b) => {
            return a.release.date - b.release.date
          })
          console.log(this.results)
          this.randome = val
        } finally {
          this.loading = false
        }
      },
      onblur() {
        this.queryWhatsNewJ(this.search)
      },
      async keyboardEvent(e) {
        // press enter to search
        const focused = document.activeElement;
        if (!(e.which === 13 && focused.getAttribute("data-element") == "autocomplete-element")) {
          return
        }
        await this.queryWhatsNewJ(this.search)
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
    created() {
      window.addEventListener("keyup", this.keyboardEvent)
    },
    beforeDestroy() {
      window.removeEventListener("keyup", this.keyboardEvent)
    }
  }
</script>
