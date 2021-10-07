<template lang="pug" v-cloak>
.comment(v-if="story.by")
  h2(v-if="story.title") {{story.title}}
  p.comment-byline
    span.story-author 
      a(:href="`${this.hn_url}/user?id=` + story.by") {{story.by}}
    span.story-timeago(v-if="story.time")  – {{formatTimeAgo(story.time*1000)}} 
    span {{story.score}}
  .comment-content(v-html="story.text" v-if="story.text")
ul(v-if="story.kids")
  li(v-for="id in story.kids" v-bind:key="{id}")
    CommentListItem(:comment="id")
</template>

<script>
import utils from "../shared/utils.js"

export default {
  name: 'CommentListItem',
  props: {
    comment: Object
  },
  data() {
    return {
      story: {},
    }
  },
  created() {
    this.get_story(this.comment)
    this.formatTimeAgo = utils.formatTimeAgo
  },
  methods: {
    async get_story(id) {
      let response = await fetch(`${this.hn_api_url}/item/${id}.json`)
      this.story = await response.json()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  pre, code {
    overflow: auto;
  }
</style>
