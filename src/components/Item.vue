<template lang="pug">
.story-wrapper(v-if="story")
  h2.story-title
    a(:href="story.url" target="_blank") {{story.title}}
  //- p.story-info(v-if="story.time") {{story.by}} – {{formatTimeAgo(story.time*1000)}} – {{story.score}} points
  p.comment-byline
    span.story-author 
      a(:href="`${this.hn_url}/user?id=` + story.by") {{story.by}}
    span.story-timeago(v-if="story.time")  – {{formatTimeAgo(story.time*1000)}}  
    span &nbsp;– {{story.score}} points

  div(v-html="story.text" v-if="story.text")
CommentList(:comments="story.kids")
</template>

<script>
import utils from "../shared/utils.js"
import CommentList from './CommentList.vue'
export default {
  name: 'Item',
  // emits: ["go_to_next_page"],
  components: {
    CommentList
  },
  data() {
    return {
      story: {},
    }
  },
  props: [
    // 'page_index',
    // 'per_page',
    // 'top_stories',
  ],
  created() {
    this.story_id = this.$route.query.id ? this.$route.query.id : this.story.id
    this.get_story(this.story_id)
    this.formatTimeAgo = utils.formatTimeAgo
    window.scrollTo(0, 0);
  },
  computed: {

  },
  methods: {
    async get_story(element) {
      let response = await fetch(`${this.hn_api_url}/item/${element}.json`)
      let response_json = await response.json()
      this.story = response_json
    },
  }
}
</script>

<style>

</style>
