<template lang="pug">
ul.comments-list(v-if="comments")
  li(v-for="comment in comments")
    CommentListItem(v-bind:comment="comment")
  
</template>

<script>
import utils from "../shared/utils.js"
import CommentListItem from "./CommentListItem.vue"
export default {
  name: 'CommentList',
  components: {
    CommentListItem
  },
  props: {
    story_id: Number,
    comments: Array

  },
  data() {
    return {
      temp_comments: [],
      comments_for_listing: [],
      story: {}
    }
  },
  created() {
    this.get_story()
    this.getRelativeTime = utils.getRelativeTime

  },
  methods: {
    async get_story() {
      let response = await fetch(`${this.hn_api_url}/item/${this.story_id}.json`)
      let response_json = await response.json()
      this.temp_comments.push(response_json)
    }
  }
}
</script>
