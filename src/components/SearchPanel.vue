<template>
  <transition name="search-fade">
  <div class="search-container">
    <div class="search-panel">
      <div class="search-bar">
        <input type="text" class="search-input" placeholder="Search Publication" v-model="searchText" @keyup.enter="search" />
        <button class="search-button" @click="search"><feather-icon icon="search"/></button>
      </div>
      <!--<div class="search-close">
        <feather-icon icon="x-circle"/>
      </div> -->
      <transition-group name="list" tag="ul" class="search-results">
        <li v-for="searchResult in searchResults" class="search-result" @click="goToResultPage(searchResult.pageIndex, searchResult.sectionIndex)" :key="searchResult.id">
          <img class="search-result__image" :src="getBackgroundURL(searchResult.thumb)" alt="" />
          <div class="search-result__text">
            <div class="search-result__title">
              {{searchResult.id}}. {{searchResult.title}}
            </div>
            <div class="search-result__body">
              {{searchResult.body}}
            </div>
          </div>
        </li>
      </transition-group>
      <div id="noResultsContainer" v-if="noResults">
        <h2>No results found. Please try again</h2>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
import FeatherIcon from './FeatherIcon.vue'
import TrackingHandler from '../helpers/modules/trackingHandler'
import trackingHandler from '../helpers/modules/trackingHandler';

export default {
  // TODO Highlight search text */

  data() {
    return {
      searchText: '',
      searchResults: [],
      noResults: false
    }
  },
  components: {
    FeatherIcon
  },
  computed: {
    ...mapGetters([
      'pages',
      'rightToLeft',
      'basePath'
    ])
  },
  methods: {
    ...mapMutations({
      toggleSearch: 'TOGGLE_SEARCH',
    }),
    ...mapActions([
      'goToPage'
    ]),
    // getBackgroundURL: (index) => "url(/static/_thumbs/"+(index)+"="+1+"-w140-h105.png)",
    // getBackgroundURL: (background) => 'url(/static/_content/'+ background +')',
    getBackgroundURL(background) {
      return this.basePath + '/static/_thumbs/' + background + '.png'
    },

    search() {
      this.noResults = false
      trackingHandler.trackSearchTerms(this.searchText)
      this.searchResults = window.search.search(this.searchText)
      if(this.searchResults.length == 0) {
        this.noResults = true
      }
    },

    goToResultPage(pageIndex, sectionIndex) {
      this.goToPage({pageIndex, sectionIndex})
      this.toggleSearch()
    }
  }
}
</script>

<style>

  #noResultsContainer {
    color: white; 
    text-align: center;
  }
  
  .search-result {
    transition: all .3s ease;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .search-fade-enter-active, .search-fade-leave-active {
    transition: all .3s ease;
  }

  .search-fade-enter, .search-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .search-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    overflow: scroll;
  }

  .search-panel {
    max-width: 1280px;
    margin: auto;
    padding-top: 20px;
    padding-bottom :20px;
  }
  
  .search-bar {
    /* float: left; */
    width: calc(100% - 40px);
    display: flex;
    /*justify-content: flex-start;*/
    justify-content: center;
    margin-bottom: 25px;
  }

  .search-input {
    height: 60px;
    width: 1000px;
    max-width: 90vw;
    border: none;
    font-size: 2em;
    font-weight: lighter;
    padding-left: 30px;
    padding-right: 30px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 0;
    outline: none;
  }

  .search-button{
    background-color: #00FFB4;
    height: 60px;
    width: 60px;
    border: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 0;
    outline: none;
  }

  .search-button svg {
    height: 30px;
    width: 30px;
  }

  .search-results {
    padding: 0;
    margin: 0;
    list-style-type: none;
    clear: both;
  }

  .search-close {
    color: #eee;
    float: right;
    outline: none;
  }

  .search-close svg {
    width: 48px;
    height: 48px;
    fill: #00FFB4;
  }

  .search-result {
    width: 100%;
    float: left;
    height: 200px;
    color: #222;
    overflow: hidden;
    text-align: center;
    user-drag: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 20px;
  }

  

  .search-result__text {
    background-color: white;
    width: 50%;
    height: 180px;
    float: left;
    text-align: left;
    position: relative;
    padding: 1em 0.675em;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
    top: 10px;
  }

  .search-result__body {
    max-height: 130px;
    overflow-y: auto;
  }

  .search-result__title {
    font-weight: bold;
  }

  .search-result__image {
    max-width: 50%;
    max-height: 200px;
    height: 100%;
    float: left;
    margin-right: -1px;
    border: 2px solid white;
    border-radius: 10px;
  }

  .right-to-left .search-input {
    direction: rtl;
    border-top-right-radius: 30px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .right-to-left .search-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .right-to-left .search-result {
    float: right;
  }

  .right-to-left .search-bar {
    flex-direction: row-reverse;    
  }
  
  .right-to-left .search-result__text  {
    text-align: right;
    direction: rtl;
  }

  @media (min-width: 600px) {
    .search-result {
      width: calc(50% - 40px);
      float: left;
    }
  }

</style>