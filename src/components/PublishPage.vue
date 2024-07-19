<template>
  <section class="page" v-html="page.content" :style="styleObject" :class="classes" v-cloak :data-page="`${page.pageIndex + 1}-${page.sectionIndex + 1}`">
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import FeatherIcon from './FeatherIcon.vue'
export default {
  name: 'kpPage',
  components: {
    FeatherIcon
  },
  props: ['page', 'width', 'height', 'classes'],
  computed: {
    ...mapGetters([
      'basePath',
    ]),
    styleObject() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        'background-image': 'url('+ this.basePath +'/static/_content/'+ this.page.original +')'
      }
    },
  },
  updated() {
    if(this.classes == "currentPage" || (this.classes == "leftPage" || this.classes == "rightPage")){
      let p = parseInt(this.page.pageIndex)
      let s = parseInt(this.page.sectionIndex)
      if(window["p"+p+"s"+s+"onPageEnter"]) {
        window["p"+p+"s"+s+"onPageEnter"]()
      }
    }
  },
  mounted() {
    if(this.classes == "currentPage" || this.classes == "leftPage" || this.classes == "rightPage"){
      let p = parseInt(this.page.pageIndex)
      let s = parseInt(this.page.sectionIndex)
      if(window["p"+p+"s"+s+"onPageEnter"]) {
        window["p"+p+"s"+s+"onPageEnter"]()
      }
    }
  }
}
</script>

<style>
.page {
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  user-drag: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
  position: absolute;
  transition: all 0.6s cubic-bezier(.55,0,.1,1);
  transition-property: opacity, transform;
}

.currentPage{
  transform: translate(-50%, -50%);
  opacity: 1;
}

/* Safari Fix */
/* .mobile .currentPage{
  transform: translate(0, -50%);
} */

.mobile .nextPage,
.mobile .previousPage,
.mobile .previousPreviousPage,
.mobile .nextNextPage {
  opacity: 0;
  pointer-events: none;
}


.page img {
  position: absolute;
  user-drag: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
}


.previousPage{
  transform: translate(calc(-150% - 20px) , -50%);
  opacity: 0;
}

.previousPreviousPage{
  transform: translate(calc(-250% - 40px) , -50%);
  opacity: 0;
}

.nextPage{
  transform: translate(calc(50% + 20px) , -50%);
  opacity: 0;
}

.nextNextPage{
  transform: translate(calc(150% + 40px) , -50%);
  opacity: 0;
}

.previousPreviousSection{
  transform: translate(-50%, -250%);
  opacity: 0;
}

.previousSection{
  transform: translate(-50%, -150%);
  opacity: 0;
}

.nextSection{
  transform: translate(-50%, 50%);
  opacity: 0;
}

.nextNextSection{
  transform: translate(-50%, 150%);
  opacity: 0;
}

.previousLeftPage {
  transform: translate(-300%, -50%);
  opacity: 0;
}

.previousRightPage {
  opacity: 0;
  transform: translate(-200%, -50%);
}

.nextLeftPage {
  transform: translate(100%, -50%);
  opacity: 0;
}

.nextRightPage {
  opacity: 0;
  transform: translate(200%, -50%);
}

.leftPage {
  transform: translate(-100%, -50%);
  opacity: 1;
}

.rightPage {
  opacity: 1;
  transform: translate(0, -50%);
}

.right-to-left .previousPage{
  transform: translate(calc(50% + 20px) , -50%);
}

.right-to-left .previousPreviousPage{
  transform: translate(calc(150% + 40px) , -50%);
}

.right-to-left .nextPage{
  transform: translate(calc(-150% - 20px) , -50%);
}

.right-to-left .nextNextPage{
  transform: translate(calc(-250% - 40px) , -50%);
}

.page {
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  user-drag: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
  position: absolute;
  transition: all 0.6s cubic-bezier(.55,0,.1,1);
  transition-property: opacity, transform;
}

@media screen and (-webkit-min-device-pixel-ratio:0)
and (min-resolution:.001dpcm) {
  .page {
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;          /* Firefox */
  image-rendering: -o-crisp-edges;            /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
  -ms-interpolation-mode: nearest-neighbor;   /* IE (non-standard property) */
  }
}

/* Unset for Safari 11+ */
@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) and (stroke-color:transparent) {
  .page {
    image-rendering: unset !important;
  }
}}

</style>
