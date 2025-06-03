<template>
  <transition name="contents-fade">
    <div id="app" v-cloak :class="{'right-to-left': rightToLeft, 'mobile': isMobile, 'zoomed': isZoomed, 'mobile-switch': mobileSwitch, 'mobile-font-large': isMobileFontLarge, 'ie11': isIE11, 'reader': isReader, 'doublePage': isDoublePage}">
      <template v-if="isPhantom">
        <img :src="companyLogo" alt="" class="logo-loading centre" />
      </template>
      <template v-else>
        <navigation-bar :title="title" :page="currentPage.title" ref="navBar" />
        <template v-if="(isMobile && mobileSwitch) || isReader">
          <mobile-container/>
          <template v-if="isReader">
            <mobile-link :click="goToPreviousMobilePage" v-if="previousMobilePage" rotation="180" classes="navigation-link--prev" />
            <mobile-link :click="goToNextMobilePage" v-if="nextMobilePage" classes="navigation-link--next" />
          </template>
        </template>
        <template v-else>
          <transition-group name="pages" tag="div" id="page-container" 
              :style="pageContainerStyle" v-on:leave="onLeave"
              :class="{contentsPinned: contentsPinned}">
            <page-dots key="page-dots" />

            <publish-page v-for="(page, key) in visiblePages" v-if="page" :classes="key" :page="page" 
              :width="width" 
              :height="height"
              :key="page.pageIndex + 'a' + page.sectionIndex"/>
          </transition-group>
          <template v-if="(isMobile && !isDoublePage)">
          </template>
          <template v-else>
            <navigation-link :to="previousPageURI" v-if="previousPageURI" rotation="180" classes="navigation-link--prev" />
            <navigation-link :to="previousSectionURI" v-if="previousSectionURI" rotation="270" classes="navigation-link--up" />
            <navigation-link :to="nextPageURI" v-if="nextPageURI" 
              :class="[contentsPinned ? 'navigation-link--next__contents' : 'navigation-link--next']" />
            <navigation-link :to="nextSectionURI" v-if="nextSectionURI" rotation="90" classes="navigation-link--down" />
          </template>
          <contents-panel v-show="showContents" />
          <search-panel v-show="showSearch" />
          <guide-container v-show="showGuide"/>
          <external-resource v-if="externalResources.length > 0" v-for="resource in externalResources" :source="resource" :key="resource"
          />
        </template>
      </template>
      <video-container v-if="videoURL != ''"/>
      <gallery-container v-if="galleryImages.length"/>
      <audio-container v-if="audioURL !=  ''"/>
      
    </div>
  </transition>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  import * as JsSearch from 'js-search'
  import PublishPage from './components/PublishPage.vue'
  import MobileContainer from './components/mobile/MobileContainer.vue'
  import NavigationBar from './components/NavigationBar.vue'
  import NavigationLink from './components/NavigationLink.vue'
  import MobileLink from './components/MobileLink.vue'
  import ContentsPanel from './components/ContentsPanel.vue'
  import LanguagesPanel from './components/LanguagesPanel.vue'
  import EditionsPanel from './components/EditionsPanel.vue'
  import SearchPanel from './components/SearchPanel.vue'
  import ExternalResource from './components/ExternalResource.vue'
  import PageDots from './components/PageDots.vue'
  import VideoContainer from './components/VideoContainer.vue'
  import GalleryContainer from './components/GalleryContainer.vue'
  import GuideContainer from './components/GuideContainer.vue'
  import AudioContainer from './components/AudioContainer.vue'

  export default {
    name: 'app',
    components: {
      PublishPage,
      NavigationBar,
      NavigationLink,
      ExternalResource,
      ContentsPanel,
      LanguagesPanel,
      EditionsPanel,
      SearchPanel,
      PageDots,
      GalleryContainer,
      MobileContainer,
      VideoContainer,
      GuideContainer,
      MobileLink,
      AudioContainer,
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        isReader: state => state.isReader,
      //   showLanguages: state => state.languages.showLanguages,
      //   showSearch: state => state.search.showSearch,
      //   isZoomed: state => state.zoom.isZoomed,
      }),

      ...mapGetters([
        'title',
        'description',
        'width',
        'height',
        'visiblePages',
        'currentPage',
        'previousPage',
        'nextPage',
        'nextNextPage',
        'previousPreviousPage',
        'previousPageURI',
        'nextPageURI',
        'previousSection',
        'nextSection',
        'previousSectionURI',
        'nextSectionURI',
        'previousMobilePage',
        'nextMobilePage',
        'previousMobilePageURI',
        'nextMobilePageURI',
        'externalResources',
        'searchObject',
        'pageScripts',
        'documentScript',
        'zoomLevel',
        'pageContainerStyle',
        'rightToLeft',
        'isMobile',
        'mobileSwitch',
        'videoURL',
        'showContents',
        'contentsPinned',
        'showLanguages',
        'showSearch',
        'showGuide',
        'showEditions',
        'isZoomed',
        'isIE11',
        'isPhantom',
        'companyLogo',
        'publishURL',
        'galleryImages',
        'galleryCaptions',
        'isDoublePage',
        'audioURL',
        'isMobileFontLarge',
      ]),
    },
    mounted() {
      // console.log('mounted app component')
      this.setTitle()
      this.setDescription()
      if(this.publishURL != '') this.setOGImage()
      if (!((this.isMobile && this.mobileSwitch) || this.isPhantom)) {
        this.loadScripts()
        window.addEventListener("load", function (event) {
          var p = parseInt(Publish.currentPage.pageIndex)
          var s = parseInt(Publish.currentPage.sectionIndex)
          if (window["p" + p + "s" + s + "onPageEnter"]) {
            window["p" + p + "s" + s + "onPageEnter"]()
          }
        });
        this.buildSearchIndex()
        this.resetSectionIndices()
      }
      if ((window.orientation == 90 || window.orientation == -90) && document.documentElement.dataset.mobile == "iOS" ) {
        this.setInitialWindowSize({
          width: screen.height,
          height: screen.width - 90
        })
        this.changeWindowSize({
          width: screen.height,
          height: screen.width - 90
        })
      } else if(document.documentElement.dataset.mobile == "android") {
        this.setInitialWindowSize({
          // width: screen.width,
          // height: screen.height
          width: window.innerWidth,
          height:window.innerHeight
        })
        this.changeWindowSize({
          // width: screen.width,
          // height: screen.height
          width: window.innerWidth,
          height:window.innerHeight
        })
      } else {
        this.changeWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      window.addEventListener("orientationchange", () => {
        if ((window.orientation == 90 || window.orientation == -90) && document.documentElement.dataset.mobile == "iOS" ) {
          this.setInitialWindowSize({
            width: screen.height,
            height: screen.width - 60
          })
          this.changeWindowSize({
            width: screen.height,
            height: screen.width - 60
          })
        } else {
          this.setInitialWindowSize({
            width: screen.width,
            height: screen.height
          })
          this.changeWindowSize({
            width: screen.width,
            height: screen.height
          })
        }
      });
    },
    watch: {
      currentPage: function(oldPage, newPage) {
        var newTitle = this.title
        if (this.currentPage.title && this.currentPage.title.length > 0) {
          newTitle += " - " + this.currentPage.title
        }
        window.document.title = newTitle
      },
    },
    methods: {
      setTitle() {
        var newTitle = this.title
        if (this.currentPage.title && this.currentPage.title.length > 0) {
          newTitle += " - " + this.currentPage.title
        }
        window.document.title = newTitle
        var meta = document.createElement('meta')
        meta.name = "og:title";
        meta.content = newTitle;
        meta.setAttribute('property', 'og:title');
        document.getElementsByTagName('head')[0].appendChild(meta);  
      },
      setDescription() {
        var newDescription = this.description
        if (this.currentPage.searchText && this.currentPage.searchText.length > 0) {
          newDescription = this.currentPage.searchText.substr(0,250)
        }
        var meta = document.createElement('meta')
        meta.name = "description"
        meta.content = newDescription
        document.getElementsByTagName('head')[0].appendChild(meta)
        var og = document.createElement('meta')
        og.name = "og:description"
        og.content = newDescription
        og.setAttribute('property', 'og:description');
        document.getElementsByTagName('head')[0].appendChild(og)
      },
      setOGImage() {
        var og = document.createElement('meta')
        og.name = "og:image"
        og.content = this.publishURL + (this.currentPage.index+1) + '.png'
        og.setAttribute('property', 'og:image');
        document.getElementsByTagName('head')[0].appendChild(og)
      },

      buildSearchIndex() {
        window.search = new JsSearch.Search('id')
        window.search.searchIndex = new JsSearch.UnorderedSearchIndex()
        window.search.addIndex('title')
        window.search.addIndex('body')
        window.search.addDocuments(this.searchObject)
      },

      loadScripts() {
        this.loadDocumentScript()
        this.loadPageScript()
        this.loadAddThis()
      },

      loadDocumentScript() {
        var newScript = document.createElement("script")
        var inlineScript = document.createTextNode(this.documentScript)
        newScript.appendChild(inlineScript)
        document.getElementById('app').appendChild(newScript)
      },

      loadPageScript() {
        var newScript = document.createElement("script")
        var inlineScript = document.createTextNode(this.pageScripts)
        newScript.appendChild(inlineScript);
        document.getElementById('app').appendChild(newScript)
      },

      loadAddThis() {
        if(!this.isMobile) {
          var addthisScript = document.createElement('script')
          addthisScript.setAttribute('src', 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a2eb48d8548953f')
          document.body.appendChild(addthisScript)
        }
      },

      ...mapActions([
        'goToPage',
        'goToNextPage',
        'goToPreviousPage',
        'goToNextSection',
        'goToPreviousSection',
        'resetSectionIndices',
        'checkMobileLanding',
        'goToPreviousMobilePage',
        'goToNextMobilePage',
        'changeWindowSize',
        'setInitialWindowSize',
      ]),

      onLeave(el) {
        el.style.opacity = 0
      }
    },
  }

</script>

<style>
  @import-normalize;

  #app[v-cloak] {
    opacity: 0;
  }
  #app {
    transition: opacity 1s ease;
    opacity: 1;
  }
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #2D2C2D;
    overflow: hidden;
  }

  body, h3, h4, h5, h6{
    font-family: 'Roboto', sans-serif;
  }

  h1, h2{
    font-family: 'Poppins', sans-serif;
  }

  #app {
    width: 100vw;
    height: 100vh;
    padding-top: 48px;
    overflow: hidden;
  }

  .mobile#app {
    min-height: 100vh;
    height: auto;
    overflow: hidden;
  }

  @supports (-webkit-touch-callout: none) {
    .mobile#app {
      min-height: -webkit-fill-available;
    }
  }

  #page-container {
    position: absolute;
    top: calc(50% + 24px);
    left: 50%;
    height: calc(100vh - 80px);
    width: 100vw;
  }  

  #page-container.contentsPinned {
    left: calc(50% - 150px);
    width: calc(100vw - 300px);
  }

  /* Safari Fix */
  /* .mobile #page-container {
    position: absolute;
    top: calc(50% + 24px);
    left: 0;
    height: auto;
    width: auto;
  }  

  .mobile.doublePage #page-container {
    left: 50%;
  } */

  #page-container img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  @-webkit-keyframes blink {
    0% {
      opacity: 0.0;
    }
    33% {
      opacity: 0.0;
    }
    66% {
      opacity: 1.0;
    }
    100% {
      opacity: 0.0;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.0;
    }
    33% {
      opacity: 0.0;
    }
    66% {
      opacity: 1.0;
    }
    100% {
      opacity: 0.0;
    }
  }
  
  .contentLink,
  .contentLinkThree{
    position: absolute;
    cursor: pointer;
    /* transition: opacity 0.2s ease; */
    background-color:rgba(2, 122, 191, 0.43);
  }

  .contentLinkNone {
    position: absolute;
    cursor: pointer;
  }

  .currentPage .contentLink,
  .leftPage .contentLink,
  .rightPage .contentLink {
    -webkit-animation-name: blink;
    -webkit-animation-duration: 1.4s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-iteration-count: 1;
    animation-name: blink;
    animation-duration: 1.4s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    border-radius: 8px;
    opacity: 0.0;
  }

  .currentPage .contentLinkThree,
  .leftPage .contentLinkThree,
  .rightPage .contentLinkThree {
    -webkit-animation-name: blink;
    -webkit-animation-duration: 1s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-iteration-count: 3;
    animation-name: blink;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: 3;
    border-radius: 8px;
    opacity: 0.0;
  }

  .currentPage .contentLink:hover,
  .leftPage .contentLink:hover,
  .rightPage .contentLink:hover,
  .currentPage .contentLinkThree:hover,
  .leftPage .contentLinkThree:hover,
  .rightPage .contentLinkThree:hover
  .currentPage .contentLinkNone:hover,
  .leftPage .contentLinkNone:hover,
  .rightPage .contentLinkNone:hover
   {
    opacity: 0;
  }

  

  .contentLink a,
  .contentLinkThree a {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }

  .contentOverlay {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .page-leave-active,
  .page-leave-to {
    opacity: 0!important;
  }

</style>
