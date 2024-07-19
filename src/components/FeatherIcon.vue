<template>
  <i v-html="iconSvg" />
</template>

<script>
const feather = require('feather-icons')
//  feather.icons.x
// {
//    name: 'x',
//    contents: '<line ... /><line ... />`,
//    tags: ['cancel', 'close', 'delete', 'remove'],
//    attrs: {
//      class: 'feather feather-x',
//      xmlns: 'http://www.w3.org/2000/svg',
//      width: 24,
//      height: 24,
//      viewBox: '0 0 24 24',
//      fill: 'none',
//      stroke: 'currentColor',
//      'stroke-width': 2,
//      'stroke-linecap': 'round',
//      'stroke-linejoin': 'round',
//    }
// }
export default {
  name: 'feather-icon',
  props: ['icon', 'options'],
  computed: {
    iconSvg: function () {
      return feather.icons[this.icon].toSvg(this.options)
    }
  },
}
</script>

<style>
  .nav-bar__link i {
    display: block;
  }
  .r90 {
    transform: rotate(90deg);
  }
  .r180 {
    transform: rotate(180deg);
  }
  .r270 {
    transform: rotate(270deg);
  }
</style>
