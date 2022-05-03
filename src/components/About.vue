<template lang="pug">
p I made this because I read hacker news (sometimes I really wish I didn't) on my phone and they have no mobile theme to speak of. The "comments" button is tiny and you have to zoom in to read it.

p 
  | There's lots of 
  a(href="https://hackerbits.com/hacker-news/improve-hacker-news-ui/") other hacker news 
  |  front-ends, the best of which is 
  a(href="https://hn.premii.com/") hn.premii.com
  |  but I still found a few things I didn't like. For one, it seems to load the threads in one giant div that kind of looks like a regular browser window, but isn't. This makes it so that tapping on the title bar of the browser window does nothing, instead of scrolling you to the top of the page. I guess that's pretty much it. But I wanted to build it for myself, so I did.
</template>

<script>
export default {
  name: 'About',
}
</script>
