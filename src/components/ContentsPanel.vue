<template>
  <transition name="contents-fade">
    <nav class="contents-panel">
      <ul v-if="contentsPinned" class="contents-list">
        <content-item v-show="showContents" v-for="(page, index) in titledPages" :page="page" :index="index" :key="index" />
      </ul>
      <ul v-else class="contents-list">
        <content-item v-show="showContents" v-for="(page, index) in pages" :page="page" :index="index" :key="index" />
      </ul>
    </nav>
  </transition>
</template>
<script>
import FeatherIcon from './FeatherIcon.vue'
import ContentItem from './ContentItem.vue'
import {
  mapState,
  mapActions,
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      isExpanded: false
    }
  },
  components: {
    FeatherIcon,
    ContentItem
  },
  //TODO make sections
  computed: {
    ...mapGetters([
      'pages',
      'titledPages',
      'basePath',
      'currentPage',
      'showContents',
      'contentsPinned'
    ]),  
  },
  
}
</script>

<style>
  /*TODO active page same as menu bar color */
  /*TODO make height of content item match the height of the page */
  .right-to-left .contents-panel {
    left: 0;
    right: auto;
  }
  
  .contents-fade-enter-active, .contents-fade-leave-active {
    transition: all .3s ease;
  }
  .contents-fade-enter, .contents-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .contents-panel {
    width: 300px;
    height: 100vh;
    position: absolute;
    right: 0;
    bottom: 0;
    top: 48px;
    background-color: #2D2C2D;
    box-shadow: -5px 15px 10px 10px rgba(0,0,0,0.3);
    overflow-y: scroll;
    padding-bottom: 100px;
  }
  
  .contents-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

</style>