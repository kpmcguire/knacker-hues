<template lang="pug">
ul.main-stories-list
  li(v-for="object in stories" :key="object.id")
    .story-about
      h2
        a(:href="object.url" target="_blank") {{object.title}}
      p 
        | {{object.by}} — {{formatTimeAgo(object.time*1000)}} — {{object.score}} points 
    .story-link(v-if="object.type != 'job'")
      router-link(:to="{name: 'Item', query: {id: `${object.id}`}}") 
        .story-comments-count {{object.descendants}} 
        .story-comments-label {{object.descendants === 1 ? 'comment' : 'comments'}} 
button.next-page(@click="$emit('go_to_next_page')" v-if="page_index <= total_pages") Next Page

</template>

<script>

import utils from "../shared/utils.js"

export default {
  name: 'StoryList',
  emits: ["go_to_next_page"],
  data() {
    return {
      stories: [],
      loading: false
    }
  },
  props: [
    'page_index',
    'per_page',
    'total_pages',
    // 'top_stories',
    'current_page_story_ids'
  ],

  methods: {
    async prepare_story_listing() {
      this.stories = []
      this.current_page_story_ids.forEach(async (id)=>{
        let response = await fetch(`${this.hn_api_url}/item/${id}.json`)
        let response_json = await response.json()
        this.stories.push(response_json);
      })
    }
  },

  created() {
    this.formatTimeAgo = utils.formatTimeAgo
    this.prepare_story_listing()
  },

  watch: {
    page_index(){
      this.prepare_story_listing()
    }
  }
}
</script>

<style>
  .loading {
    opacity: 0.25;
  }
</style>
