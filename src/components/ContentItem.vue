<template>
  <li class="contents-item">
    <div class="contents-item__section" :class="{active: currentPage.pageIndex == currentPageIndex && currentPage.sectionIndex == 0}">
      <div class="contents-item__text" @click.self="goToPage({pageIndex: currentPageIndex + 1, sectionIndex: 1});toggleContents();">
          <p v-if="contentsNumbers" class="contents-item__text--index">
            {{ currentPageIndex + 1 }}
          </p>
          <p v-if="contentsTitles" :class="['contents-item__text--title', contentsPinned ? '' : '']">
            {{page[0].title}}
          </p>
          <div v-if="contentsPinned && page.length > 1" class="content-item__chevrons">
              <div @click="toggleExpanded(index)" class="contents-item__expander">
                  <feather-icon  icon="chevron-up" v-if="isExpanded"/>
                  <feather-icon  icon="chevron-down" v-else/>
              </div>
          </div>
      </div>
      <div v-if="contentsPinned" class="contents-item__thumb" :style="{'background-image': getBackgroundURL(currentPageIndex, 0)}" @click="goToPage({pageIndex: currentPageIndex + 1, sectionIndex: 1});toggleContents();"></div>
      <div v-else class="contents-item__thumb" :style="{'background-image': getBackgroundURL(index, 0)}" @click="goToPage({pageIndex: index + 1, sectionIndex: 1});toggleContents();"></div>
    </div>
    <div v-if="page.length > 1" class="contents-item__sections" :class="{'collapsed': !isExpanded}">
      <div v-for="(section, sectionIndex) in page" :key="(index+1) + '-' + (sectionIndex + 1)"  v-if="sectionIndex != 0" class="contents-item__subsection" :class="{active: currentPage.pageIndex == index && currentPage.sectionIndex == sectionIndex}">
        <div v-if="contentsPinned" class="contents-item__text" @click="goToPage({pageIndex: index + 1, sectionIndex: sectionIndex + 1});">
          <p class="contents-item__text--index">{{ index + 1 }} - {{ sectionIndex + 1 }}</p>
        </div>
        <div v-else class="contents-item__text" @click="goToPage({pageIndex: index + 1, sectionIndex: sectionIndex + 1});toggleContents();">
          <p class="contents-item__text--index">{{ index + 1 }} - {{ sectionIndex + 1 }}</p>
        </div>
        <div class="contents-section__thumb" :style="{'background-image': getBackgroundURL(index, sectionIndex)}" @click="goToPage({pageIndex: index + 1, sectionIndex: sectionIndex + 1});toggleContents();"></div>
      </div>
    </div>
  </li>
</template>

<script>
import FeatherIcon from './FeatherIcon.vue'
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  props: ['page', 'index'],
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
      'titledPages',
      'basePath',
      'currentPage',
      'contentsPinned',
      'contentsNumbers',
      'contentsTitles'
    ]),

    currentPageIndex: function(){
      return this.page[0].pageIndex
    }
  },
  methods: {
    ...mapActions([
      'goToPage',
    ]),
    ...mapMutations({
      toggleContents: "TOGGLE_CONTENTS",
    }),

    getBackgroundURL: function (index, sectionIndex) {
        if (sectionIndex == 0) {
            return 'url('+ this.basePath + '/static/_thumbs/' + (index + 1) + '.png)'
        } else {
            return 'url('+ this.basePath + '/static/_thumbs/' + (index + 1) + '-' + (sectionIndex + 1) + '.png)'
        } 
    },

    toggleExpanded(index) {
      this.isExpanded = !this.isExpanded
    },
  }
}
</script>
<style>
    .contents-item {
    min-height: 112px;
    clear: both;
    color: white;
    text-align: center;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid white;
  }

  .contents-item__section {
    min-height: 108px;
  }


  .contents-item__subsection{
      width: 100%;
      clear: both;
      display: inline-block;
  }


  .contents-item__text {
    width: 50%;
    height: 108px;
    float: left;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .contents-item__text--index {
    font-size: 2em;
    margin: 0;
    pointer-events: none;
  }

  .contents-item__text--title {
    align-items: center;
    display: flex;
    font-size: 0.85em;
    justify-content: center;
    margin: 0 auto;
    padding: 0 5px;
    pointer-events: none;
  }

  .contents-item__text--title.pinned {
  }

  .contents-item__thumb {
    width: 50%;
    height: 107px;
    float: right;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

.contents-section__thumb {
    width: 50%;
    height: 107px;
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
    height: 0px;
  }

  .contents-item__subsection {
    transition: all 0.2s ease-in-out;
    background-color: rgba(255,255,255,0.1)
  }

  .contents-item__section:hover,
  .contents-item__section.active,
  .contents-item__subsection:hover,
  .contents-item__subsection.active{
    background-color: #e73c20!important;
  }

  .content-item__chevrons {
      position:absolute;
      left:0;
      right:0;
      bottom:5px;
  }
</style>