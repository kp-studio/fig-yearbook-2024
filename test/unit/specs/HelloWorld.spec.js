import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App')
  })
})

/* Tests to write 
options.languagesEnabled => buttonvisible
options.searchEnabled => buttonvisible
options.contentsEnabled => buttonvisible
options.zoomEnabled => buttonvisible





Click zoom button should zoom
double click page should zoom - when zoom Enabled, not when its disabled
double click rest should not zoom
click contents button should open contents
click languages button should open languages
click download button should open download





*/