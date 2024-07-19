<template>
  <transition name="editions-fade">
  <nav class="editions-panel">
    <ul class="editions-list">
      <li v-for="(edition, index) in editions_data" :key="index" class="editions-item">
        <a rel="alternate" :href="edition.href + currentLanguage.toLowerCase()" target="_blank">{{edition.code}}</a>
      </li>
    </ul>
  </nav>
  </transition>
</template>

<script>
import { mapGetters, mapState} from 'vuex'

export default {
  // components: {
  //   EditionsJson
  // },
  computed: {
    editions_data(){
      if (window.editions_data && window.editions_data.length){
        return window.editions_data
      } else {
        return editions
      }
    },
    ...mapState({
        currentLanguage: state => state.document.currentLanguage,
      //   showLanguages: state => state.languages.showLanguages,
      //   showSearch: state => state.search.showSearch,
      //   isZoomed: state => state.zoom.isZoomed,
      }),

    ...mapGetters([
      'currentLanguage'
    ])
  },
}
</script>

<style>
  /*TODO make it position correctly */
  /*TODO make it look nicer? */

  .editions-fade-enter-active, .editions-fade-leave-active {
    transition: all .3s ease
  }
  .editions-fade-enter, .editions-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .editions-panel {
    position: absolute;
    left: 0;
    right: 0;
    top: 48px;
    background-color: #2D2C2D;
    box-shadow: -5px 15px 10px 10px rgba(0,0,0,0.3);
  }
  
  .editions-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .editions-item {
    position: relative;
    height: 48px;
    border-style: solid;
    border-color: #fff;
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

  .editions-item a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
    line-height: 48px;
    text-decoration: none;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .editions-item:hover {
    background-color: rgba(91, 71, 88, 1);
  }

  .editions-item:first-child {
    border-top-width: 2px;
  }

  .editions-item:last-child {
    border-bottom-width: 2px;
  }
</style>