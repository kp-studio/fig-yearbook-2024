export default {
  init() {
    let delay = 250
    let timeout = false
    this.actualResizeHandler()
    window.addEventListener('resize', this.debounce(this.actualResizeHandler, 250))
    document.addEventListener('fullscreenchange', this.updateFullscreen)
  },
  
  actualResizeHandler(event) {
    if(typeof(Publish) !== 'undefined') {
      if(!Publish.isMobile) {
        Publish.changeWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      } else {
        if(document.documentElement.dataset.mobile == "Android") {
          Publish.changeWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }
      }
    }
  },

  updateFullscreen() {
    Publish.updateFullscreen()
  },

  debounce(func, wait = 250) {
    let timeout
    return function(...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

}