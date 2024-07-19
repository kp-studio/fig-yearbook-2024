<template>
  <transition name="contents-fade">
    <div id="gallery-container">
      <template v-if="isDoublePage">
        <feather-icon id="gallery-next" onclick="Publish.nextGallerySlide()" icon="play" :options="nextOptions"/>
        <feather-icon id="gallery-previous" onclick="Publish.previousGallerySlide()" icon="play" :options="prevOptions"/>
        <div id="gallery-close" onclick="Publish.closeGallery()"><feather-icon icon="x-circle" :options="options"/></div>
      </template>
      <template v-else>
        <feather-icon id="gallery-next-mobile" onclick="Publish.nextGallerySlide()" icon="play" :options="mobileNextOptions"/>
        <feather-icon id="gallery-previous-mobile" onclick="Publish.previousGallerySlide()" icon="play" :options="mobilePrevOptions"/>
        <div id="gallery-close-mobile" onclick="Publish.closeGallery()"><feather-icon icon="x-circle" :options="mobileOptions"/></div>
      </template>
      <img v-for="(image, index) in galleryImages" :src="basePath + '/static/_content/' + image " alt="" :class="{'active': index == galleryIndex, 'inactive': index != galleryIndex}" />
      <div class="gallery-captions">
        <p v-if="galleryCaptions[galleryImages[galleryIndex]]" class="gallery-caption">
          {{ galleryCaptions[galleryImages[galleryIndex]] }}
        </p>
      </div>
      <div class="gallery-dots">
        <div v-for="(image, index) in galleryImages" class="gallery-dot" :class="{'gallery-dot--active': index == galleryIndex}">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import FeatherIcon from "./FeatherIcon.vue"

export default {
  components: {
    FeatherIcon,
  },
  computed: {
    ...mapGetters([
      "galleryImages",
      "galleryCaptions",
      "basePath",
      "galleryIndex",
      "isDoublePage"]),
    options() {
      return {
        width: 50,
        height: 50,
      }
    },

    nextOptions() {
      return {
        width: 50,
        height: 50,
      }
    },

    prevOptions() {
      return {
        class: "r180",
        width: 50,
        height: 50,
      }
    },

    mobileOptions() {
      return {
        width: 24,
        height: 24,
      }
    },
    mobileNextOptions() {
      return {
        width: 24,
        height: 24,
      }
    },

    mobilePrevOptions() {
      return {
        class: "r180",
        width: 24,
        height: 24,
      }
    },
  },
}
</script>

<style scoped>
#gallery-container {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  transition: 0.3s all ease;
  z-index: 2;
}

#gallery-next {
  color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  right: 40px;
  line-height: 100vh;
  cursor: pointer;
}

#gallery-previous {
  color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  left: 40px;
  line-height: 100vh;
  cursor: pointer;
}

#gallery-close {
  color: #ffffff;
  font-size: 48px;
  z-index: 10000;
  position: absolute;
  top: 10px;
  left: 100%;
  margin-left: -58px;
  cursor: pointer;
}

.gallery-dot {
  display: inline-block;
  transition: background-color 0.3s ease-in-out;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin-left: 6px;
  margin-right: 6px;
  border: 1px solid #fff;
  background-color: #000;
}
.gallery-dot--active {
  background-color: #fff;
}
.gallery-dots {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}

.gallery-captions {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color:#fff;
  font-family: Arial, Helvetica, sans-serif;
}

img {
  transition: opacity 0.3s ease;
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  max-width: 90%;
  max-height: calc(100vh - 100px);
  max-width: calc(100vw - 100px);
}

img.active {
  opacity: 1;
}

img.inactive {
  opacity: 0;
}

p.active {
  
}

p.inactive {
  position: absolute;
  display: none;
}

#gallery-next-mobile {
  color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  right: 0px;
  line-height: 100vh;
  cursor: pointer;
}

#gallery-previous-mobile {
  color: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  left: 0px;
  line-height: 100vh;
  cursor: pointer;
}

#gallery-close-mobile {
  top: 5px;
  margin-left: -38px;
  color: #ffffff;
  font-size: 48px;
  z-index: 10000;
  position: absolute; 
  left: 100%;
  cursor: pointer;
}

@media screen and (max-width:1199px) {
  #gallery-next {
    right: 0px;
  }

  #gallery-previous {
    left:0px;
  }

  #gallery-close {
    top: 5px;
  }
}
</style>