<template>
  <div id="mobile-nav-bar" class="nav-bar">
    <div id="mobile-font-size-toggle" class="nav-menu-button" :class="{ mobileFontLarge: isMobileFontLarge }" @click="toggleFontSize">
      <span class="font-size-toggle-small">Aa</span>
      <span class="font-size-toggle-large">Aa</span>
    </div>
    <img id="mobile-nav-bar__logo" :src="companyLogo">
    <div id="mobile-nav-button" class="nav-menu-button" @click="toggleContents"><feather-icon icon="menu" /></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import FeatherIcon from '../FeatherIcon.vue'

export default {
  components: {
    FeatherIcon
  },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
        'title',
        'companyLogo',
        'showContents',
        'isMobileFontLarge'
    ]),

  },
  methods: {
    ...mapMutations({
      toggleContents: 'TOGGLE_CONTENTS',
      toggleFontSize: 'TOGGLE_FONT_SIZE'
    }),
  }
}
</script>

<style scoped>
  .nav-bar {
    position: fixed;
    width: 100vw;
    background-color: #f11e22;
    color: #fff;
    border-bottom: 1px solid rgba(51, 51, 51, 0.1);
    cursor: pointer;
    height: 45px;
    padding: 10px;
    z-index: 1;
  }

  .nav-title {
    line-height: 25px;
    display: inline-block;
  }
  .nav-menu-button {
    float: right;
  }

  #mobile-nav-bar__logo {
    max-height: 100%;
  }

  #mobile-font-size-toggle {
    align-items: baseline;
    display: flex;
    left: 15px;
    top: 14px;
    width: fit-content;
  }

  .font-size-toggle-small {
    color: #ffffff;
    font-size: 13px;
    text-decoration: underline;
  }

  .font-size-toggle-large {
    color: #aaaaaa;
    font-size: 18px;
  }

  .mobileFontLarge .font-size-toggle-small {
    color: #aaaaaa;
    text-decoration: none;
  }

  .mobileFontLarge .font-size-toggle-large {
    color: #ffffff;
    text-decoration: underline;
  }
</style>
