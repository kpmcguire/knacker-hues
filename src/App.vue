<template lang="pug">
.header-bar
  .header-container
    .header-navigation
      a(href="#" @click="go_home") KH Home
      router-link(to="/about") About
      button.toggle-dark-light(@click="toggle_light_dark") 
        span(aria-hidden="true") {{this.color_scheme_icon}}
        span.sr-only {{this.color_scheme_label}}
.kh-content
  h1.sr-only Knacker Hues
  router-view(:page_index="page_index" :total_pages="total_pages" :per_page="per_page" :current_page_story_ids="top_stories" @go_to_next_page="next_page" v-if="top_stories")
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      page_index: 1,
      per_page: 30,
      top_stories: [],
      is_loading: false,
      start: 0,
      end: 29,
      total_pages: 16.67,
      color_scheme: "light",
      color_scheme_label: "Switch to dark mode",
      color_scheme_icon: "👓",
      initial_load: false
    }
  },
  methods: {
    next_page() {
      this.page_index++
      this.end += this.per_page
      this.start += this.per_page
      this.$router.push({ path: '/', query: { p: this.page_index }})
      window.scrollTo(0, 0);
      this.get_top_posts()
    },
    async get_top_posts() {
      // if (!this.initial_load) {
        this.top_stories = {}
        let response = await fetch(`${this.hn_api_url}/topstories.json?&orderBy="$key"&startAt="${this.start}"&endAt="${this.end}"`)
        let temp_stories = await response.json()
        this.top_stories = temp_stories
                
        // this.initial_load = true
      // }

    },
    go_home() {
      this.end = this.per_page -1
      this.start = 0
      this.page_index = 1
      this.get_top_posts()
      this.$router.push({ path: '/', query: { p: this.page_index }})
    },
    toggle_light_dark() {
      if(this.color_scheme == "dark") {
        this.color_scheme = "light"
        this.change_color_scheme()
      } else {
        this.color_scheme = "dark"
        this.change_color_scheme()
      }
    },
    change_color_scheme() {
      const html_el = document.querySelector("html")
      
      if(this.color_scheme == "dark") {
        console.log('dark')
        html_el.classList.add("theme-dark")
        html_el.classList.remove("theme-light")
        this.color_scheme_label = "Switch to light mode"
        this.color_scheme_icon = "🕶️"
        
      } else {
        console.log('light')
        html_el.classList.add("theme-light")
        html_el.classList.remove("theme-dark")        
        this.color_scheme_label = "Switch to dark mode" 
        this.color_scheme_icon = "👓"
      }
    }
  },
  created() {
    this.get_top_posts();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.color_scheme = "dark"
      this.change_color_scheme()
    } else {
      this.color_scheme = "light"
      this.change_color_scheme()
    }    

  },
//   computed: {
//     page_index_param() {
//       return this.$route.query.p ? Number(this.$route.query.p) : 1
//     },
//     indexes() {
//       return Object.keys(this.top_stories)
//     },
// 
//   },
//   watch: {
//     page_index_param() {
//       this.page_index = this.page_index_param
//       this.start = this.page_index * this.per_page - this.per_page
//       this.get_top_posts();
//     },
// 
//   }
}
</script>

<style lang="scss">

</style>
