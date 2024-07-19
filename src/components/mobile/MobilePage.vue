<template>
  <section class="mobile-page" :class="currentMobilePage.cssClass">
    <header class="mobile-header" v-text="currentMobilePage.title"></header>
    <article class="mobile-content" v-html="mobilePageContent(currentMobilePage)"></article>
  </section>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'kpMobilePage',
  computed: {
     ...mapGetters([
        'currentMobilePage',
        'mobilePageContent'
      ]),
  },
}
</script>

<style scoped>
.mobile-page {
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  user-select: none;
  padding: 10px 10px 120px;
  position: relative;
  top: 45px;
  min-height: calc(100vh - 45px);
}


</style>
