<template>
  <div id="mobile-container">
    <mobile-navigation-bar/>
    <mobile-page v-if="currentMobilePage"/>
    <mobile-menu/>
    <div id="navButtons" class="nav-buttons">
      <button id="btnPrev" onclick="Publish.goToPreviousMobilePage();" class="advert-btn" style="visibility: visible;" v-if="previousMobilePage"></button>
      <button id="btnNext" onclick="Publish.goToNextMobilePage();" class="aqua-btn" style="visibility: visible;" v-if="nextMobilePage"></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import MobilePage from './MobilePage.vue'
import MobileNavigationBar from './MobileNavigationBar.vue'
import MobileMenu from './MobileMenu.vue'
 
export default {
  components: {
    MobilePage,
    MobileNavigationBar,
    MobileMenu,
  },
  computed: {
    ...mapGetters([
      'nextMobilePage',
      'previousMobilePage',
      'currentMobilePage'
    ]),
  }
}
</script>

<style>

</style>
