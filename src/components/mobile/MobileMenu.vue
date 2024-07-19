<template>
  <div id="mobile-menu" v-if="showContents">
    <ul id="mobile-list">
      <li v-for="(mobilePage, index) in mobilePages" :key="index" v-if="!mobilePage.hideInMenu" @click="toggleContents">
        <router-link :to="mobilePageLink(mobilePage)">{{mobilePage.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'mobilePages',
        'mobilePageLink',
        'showContents'
      ]),

    },
    methods: {
      ...mapMutations({
        toggleContents: 'TOGGLE_CONTENTS'
      }),
      
    }
  }

</script>

<style scoped>
  #mobile-menu {
    position: fixed;
    background: #232e6d ;
    width: 100%;
    text-align: right;
    top: 45px;
    height: calc(100vh - 45px);
    overflow-y: scroll;
    z-index: 5;
  }
  
  #mobile-menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li a {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgba(51, 51, 51, 0.2);
  }

</style>
