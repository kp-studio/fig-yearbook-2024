<template>
  <transition name="contents-fade">
    <div id="audio-container">
      <audio controls controlsList="nodownload" autoplay preload="metadata" style="width:300px; height:36px;">
        <source :src="audioURL" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <template v-if="isDoublePage">
        <div id="audio-close" onclick="Publish.updateAudioURL('')"><feather-icon icon="x-circle" :options="options"/></div>
      </template>
      <template v-else>
        <div id="audio-close-mobile" onclick="Publish.updateAudioURL('')"><feather-icon icon="x-circle" :options="mobileOptions"/></div>
      </template>
    </div>
  </transition>
</template>

<script>
import {
  mapGetters,
  mapState,
} from 'vuex'
import FeatherIcon from './FeatherIcon.vue'

export default {
  components: {
    FeatherIcon
  },
  computed: {
    ...mapGetters([
      'audioURL',
      'isDoublePage',
    ]),
    options() {
      return {
        width: 50,
        height: 50
      }
    },
    mobileOptions() {
      return {
        width: 24,
        height: 24
      }
    }
  },
}
</script>

<style>
  #audio-container{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,1); */
    transition: 0.3s all ease;
    z-index: 2;
  }

  audio{
    position:absolute;
    top:0px;
    left:0px;
  }

  #audio-close {
    color: #ffffff;
    font-size: 48px;
    z-index: 10000;
    position: absolute;
    top: 10px;
    left: 100%;
    margin-left: -58px;
    cursor: pointer;
  }

  #audio-close-mobile {
    color: #ffffff;
    font-size: 48px;
    z-index: 10000;
    position: absolute;
    top: 5px;
    left: 100%;
    margin-left: -28px;
    cursor: pointer;
  }
  
  #audio-container #audio {
    visibility: visible;
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%, -50%);
  }

  .embed-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;

  }

  @media screen and (max-width:1199px) {
  #audio-close {
    top: 5px;
  }
}

    
</style>