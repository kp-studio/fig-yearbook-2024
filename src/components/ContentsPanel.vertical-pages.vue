<template>
  <transition name="contents-fade">
    <nav class="contents-panel">
      <ul class="contents-list">
        <li v-for="(page, index) in pages" :key="index" class="contents-item" :class="{active: page[0].pageIndex == currentPage.pageIndex, 'expanded': isExpanded}" >
          <div class="contents-item__text" @click="goToPage({pageIndex: index + 1, sectionIndex: 1})">
            <p class="contents-item__text--index">{{ index + 1 }}</p>
            <p :class="['contents-item__text--title', contentsPinned ? 'pinned' : '']">
              {{page[0].title}}
            </p>
          </div>
          <div class="contents-item__thumb" :style="{'background-image': getBackgroundURL(index)}" @click="goToPage({pageIndex: index + 1, sectionIndex: 1})"></div>
          <div v-if="page.length > 1" class="contents-item__sections" :class="{'collapsed': !isExpanded}">
            <div @click="toggleExpanded">
              <feather-icon  icon="chevron-up" v-if="isExpanded"/>
              <feather-icon  icon="chevron-down" v-else/>
            </div>
            <div v-if="contentsPinned" v-for="(section, sectionIndex) in page" :key="(index+1) + '-' + (sectionIndex + 1)"  v-if="sectionIndex != 0" class="contents-section__thumb" :style="{'background-image': getBackgroundURL(currentPageIndex)}" @click="goToPage({pageIndex: currentPageIndex + 1, sectionIndex: sectionIndex + 1})">HI</div>
            <div v-else v-for="(section, sectionIndex) in page" :key="(index+1) + '-' + (sectionIndex + 1)"  v-if="sectionIndex != 0" class="contents-section__thumb" :style="{'background-image': getBackgroundURL(index)}" @click="goToPage({pageIndex: index + 1, sectionIndex: sectionIndex + 1})">HI</div>
          </div>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script>
import FeatherIcon from './FeatherIcon.vue'
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
    FeatherIcon
  },
  //TODO make sections
  computed: {
    ...mapGetters([
      'pages',
      'basePath',
      'currentPage'
    ]),

    
  },
  methods: {
    ...mapActions([
      'goToPage'
    ]),
    getBackgroundURL: function (index) {
      return 'url('+ this.basePath + '/static/_thumbs/' + (index + 1) + '.png)'
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    }
  }
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

  .contents-item {
    height: 140px;
    border-style: solid;
    border-color: #fff;
    border-left-width: 4px;
    border-right-width: 4px;
    border-top-width: 2px;
    border-bottom-width: 2px;
    color: white;
    text-align: center;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .contents-item:hover,
  .contents-item.active {
    background-color: rgba(91, 71, 88, 1);
  }

  .contents-item:first-child {
    border-top-width: 4px;
  }

  .contents-item:last-child {
    border-bottom-width: 4px;
  }

  .contents-item__text {
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
  }

  .contents-item__text--index {
    font-size: 2em;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50%;
    margin: 0 auto;
  }

  .contents-item__text--title {
    margin: 0 auto;
    padding: 0 5px;
    font-size: 0.85em;
  }

  .contents-item__text--title:not(.pinned) {
    left: 0;
    position: absolute;
    right: 0;
    top: 50%;
  }

  .contents-item__text--title.pinned {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }

  .contents-item__thumb {
    width: 50%;
    height: 60%;
    float: right;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .expanded {
    height: auto;
  }
  
  .collapsed {
    overflow: hidden;
    height: 20px;
    width: 50%;
  }

  .contents-item__sections {
    width: 50%;
    float: right;
    transition: all 0.3s ease-in-out;
  }

</style>