<template>
  <div class="page-dots" :style="styleObject">
    <div class="page-dot" v-for="(page, index) in currentPages" :key="index" :class="{'page-dot--active': activePage(page)}"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentPages',
      'width',
      'height',
      'zeroedPageIndex',
      'zeroedSectionIndex',
      'rightToLeft'
    ]),
    styleObject() {
      let xTranslation = -((this.width / 2) + 20)
      let yTranslation = -((this.height / 2) - 5)
      if (this.rightToLeft) {
        xTranslation = this.width / 2
      }
      return {
        transform: `translate(${xTranslation}px, ${yTranslation}px)`,
        width: '20px'
      }
    },
  },
  methods: {
    activePage(page) {
      if(this.zeroedPageIndex == page.pageIndex && this.zeroedSectionIndex == page.sectionIndex) return true
      return false
    }
  }
}
</script>

<style>
  .page-dots {
    position: absolute;
    text-align: center;
  }
  .page-dot {
    transition: background-color 0.3s ease-in-out;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    margin: auto;
    margin-bottom: 6px;
    border: 1px solid #fff;
    background-color: #000;
  }
  .page-dot--active {
    background-color: #fff;
  }
  
</style>
