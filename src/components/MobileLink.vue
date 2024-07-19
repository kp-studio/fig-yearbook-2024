<template>
  <div class="navigation-link" :class="classes" @click="click">
      <feather-icon icon="play" :options="options"/>
  </div>
</template>

<script>
import FeatherIcon from './FeatherIcon.vue'

export default {
  props: ['to','rotation', 'color', 'classes', 'click'],
  components: {
    FeatherIcon
  },
  computed: {
    options() {
      return {
        class: 'r'+this.rotation,
        width: 50,
        height: 50
      }
    }
  }
}
</script>

<style>
  .navigation-link {
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .navigation-link:hover {
    opacity: 1;
  }
  .navigation-link a {
    color: #111;
  }

  .navigation-link svg {
    fill: #fff;
  }

  .navigation-link--next {
    position: fixed;
    right: 10px;;
    top: 50%;
  }

  .navigation-link--prev {
    position: fixed;
    left: 10px;
    top: 50%;
  }

  .navigation-link--up {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 45px;
  }

  .navigation-link--down {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }

  .right-to-left .navigation-link--next {
    left: 0;
    right: auto;
    transform: rotate(180deg);
  }

  .right-to-left .navigation-link--prev {
    right: 0;
    left: auto;
    transform: rotate(180deg);
  }

</style>
