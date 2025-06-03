<template>
  <transition name="contents-fade">
    <div id="video-container" v-if="isYoutubeOrOlympics">
      <div class="embed-container">
        <iframe id="video" width="854" height="480" :src="videoURL" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <template v-if="isDoublePage">
        <div id="video-close" onclick="Publish.updateVideoURL('')"><feather-icon icon="x-circle" :options="options"/></div>
      </template>
      <template v-else>
        <div id="video-close-mobile" onclick="Publish.updateVideoURL('')"><feather-icon icon="x-circle" :options="mobileOptions"/></div>
      </template>
    </div>
    <div id="video-container" v-else>
      <video id="video" :src="videoURL" autoplay="" controls="controls"  width="967" height="544">
        <source :src="videoURL" type="video/mp4">
      </video>
      <template v-if="isDoublePage">
        <div id="video-close" onclick="Publish.updateVideoURL('')"><feather-icon icon="x-circle" :options="options"/></div>
      </template>
      <template v-else>
        <div id="video-close-mobile" onclick="Publish.updateVideoURL('')"><feather-icon icon="x-circle" :options="mobileOptions"/></div>
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
      'videoURL',
      'isDoublePage',
    ]),
    isYoutubeOrOlympics() {
      return (this.videoURL.search('youtube') !== -1) || (this.videoURL.search('olympic') !== -1)
    },
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
  #video-container{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,1);
    transition: 0.3s all ease;
    z-index: 2;
  }

  #video-close {
    color: #ffffff;
    font-size: 48px;
    z-index: 10000;
    position: absolute;
    top: 10px;
    left: 100%;
    margin-left: -58px;
    cursor: pointer;
  }

  #video-close-mobile {
    color: #ffffff;
    font-size: 48px;
    z-index: 10000;
    position: absolute;
    top: 5px;
    left: 100%;
    margin-left: -28px;
    cursor: pointer;
  }
  
  #video-container #video {
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
  #video-close {
    top: 5px;
  }
}

    
</style>