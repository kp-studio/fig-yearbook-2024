<template>
  <transition name="languages-fade">
  <nav class="languages-panel">
    <ul class="languages-list">
      <li v-for="(language, index) in languages" :key="index" class="languages-item">
        <a rel="alternate" :href="language.href" target="_blank">{{language.code}}</a>
      </li>
    </ul>
  </nav>
  </transition>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'languages'
    ])
  },
}
</script>

<style>
  /*TODO make it position correctly */
  /*TODO make it look nicer? */

  .languages-fade-enter-active, .languages-fade-leave-active {
    transition: all .3s ease
  }
  .languages-fade-enter, .languages-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .languages-panel {
    position: absolute;
    left: 0;
    right: 0;
    top: 48px;
    background-color: #2D2C2D;
    box-shadow: -5px 15px 10px 10px rgba(0,0,0,0.3);
  }
  
  .languages-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .languages-item {
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

  .languages-item a {
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

  .languages-item:hover {
    background-color: rgba(91, 71, 88, 1);
  }

  .languages-item:first-child {
    border-top-width: 2px;
  }

  .languages-item:last-child {
    border-bottom-width: 2px;
  }
</style>