<template lang="pug">
ul.main-stories-list
  li(v-for="object in stories" :key="object.id")
    .story-about
      h2
        a(:href="object.url" target="_blank") {{object.title}}
      p.comment-byline
        span.story-author 
          a(:href="`${this.hn_url}/user?id=` + object.by") {{object.by}}
        span.story-timeago(v-if="object.time")  – {{formatTimeAgo(object.time*1000)}} 
        span &nbsp; — {{object.score}} points
    .story-link(v-if="object.type != 'job'")
      router-link(:to="{name: 'Item', query: {id: `${object.id}`}}") 
        .story-comments-count {{object.descendants}} 
        .story-comments-label {{object.descendants === 1 ? 'comment' : 'comments'}} 
button.next-page(@click="$emit('go_to_next_page')" v-if="Object.keys(stories).length") Next Page

</template>

<script>

import utils from "../shared/utils.js"

export default {
  name: 'StoryList',
  emits: ["go_to_next_page"],
  data() {
    return {
      stories: {},
      loading: false
    }
  },
  props: [
    'page_index',
    'per_page',
    'total_pages',
    'current_page_story_ids'
  ],

  methods: {
    prepare_story_listing() {
      this.stories = {}
      Object.entries(this.current_page_story_ids).forEach(async ([key, value]) => {
        let response = await fetch(`${this.hn_api_url}/item/${value}.json`)
        let response_json = await response.json()
        this.stories[`${key}`] = response_json;
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
    },
    current_page_story_ids() {
      this.prepare_story_listing()
    }
  }
}
</script>
