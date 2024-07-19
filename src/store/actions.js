import * as types from './mutation-types'
import router from '../router'
import TrackingHandler from '../helpers/modules/trackingHandler'

export default {
  goToPage: (context, payload) => {
    if (payload === null) {
      // console.log('Page does not exist')
      return
    }
    if (typeof(payload) == "number") {
      if (context.getters.pageInRange(payload, 1)) { 
        if(Publish.isDoublePage && (Publish.$store.state.document.pages.length == payload.pageIndex && (payload.pageIndex % 2 !== 0))) {
          console.log('TEST 1')
          router.push(context.getters.routeFromIndex((payload - 1), 1),
          function() {
            // console.log(payload)
            context.commit('CHANGE_SECTION_INDEX', {
              pageIndex: payload,
              sectionIndex: 0
            })
          }
          )
        } else {
          router.push(context.getters.routeFromIndex(payload, 1),
            function() {
              // console.log(payload)
              context.commit('CHANGE_SECTION_INDEX', {
                pageIndex: payload,
                sectionIndex: 0
              })
            }
          )
        }
      }
    } else {
      if (context.getters.pageInRange(payload.pageIndex, payload.sectionIndex)) {
        if(Publish.isDoublePage && (Publish.$store.state.document.pages.length == payload.pageIndex && (payload.pageIndex % 2 !== 0))) {
          router.push(context.getters.routeFromIndex((payload.pageIndex - 1), payload.sectionIndex),
          function() {
            context.commit('CHANGE_SECTION_INDEX', {
              pageIndex: payload.pageIndex - 1,
              sectionIndex: payload.sectionIndex - 1
            })
          }
          )
        } else {
          router.push(context.getters.routeFromIndex(payload.pageIndex, payload.sectionIndex),
          function() {
            context.commit('CHANGE_SECTION_INDEX', {
              pageIndex: payload.pageIndex - 1,
              sectionIndex: payload.sectionIndex - 1
            })
          }
          )
        }
        
      }
    }
    
  },

  goToPreviousPage: (context) => {
    if(context.getters.previousPreviousPage != null && context.state.isDoublePage && context.getters.doublePage){
      context.dispatch('goToPage', context.getters.previousDoublePageIndices)
    } else {
      context.dispatch('goToPage', context.getters.previousPageIndices)
    }

  },
  goToNextPage: (context) => {
    if(context.state.isDoublePage && context.getters.doublePage){
      context.dispatch('goToPage', context.getters.nextDoublePageIndices)
    } else {
      context.dispatch('goToPage', context.getters.nextPageIndices)
    }
  },
  previousPage: (context) => {
    if(context.getters.previousPreviousPage != null && context.state.isDoublePage && context.getters.doublePage){
      context.dispatch('goToPage', context.getters.previousDoublePageIndices)
    } else {
      context.dispatch('goToPage', context.getters.previousPageIndices)
    }

  },
  nextPage: (context) => {
    if(context.getters.nextNextPage != null && context.state.isDoublePage && context.getters.doublePage){
      context.dispatch('goToPage', context.getters.nextDoublePageIndices)
    } else {
      context.dispatch('goToPage', context.getters.nextPageIndices)
    }
  },
  goToPreviousMobilePage: (context) => context.dispatch('goToPage', context.getters.previousMobilePageIndices),
  goToNextMobilePage: (context) => context.dispatch('goToPage', context.getters.nextMobilePageIndices),
  goToPreviousSection: (context) => context.dispatch('goToPage', context.getters.previousSectionIndices),
  goToNextSection: (context) => context.dispatch('goToPage', context.getters.nextSectionIndices),
  previousMobilePage: (context) => context.dispatch('goToPage', context.getters.previousMobilePageIndices),
  nextMobilePage: (context) => context.dispatch('goToPage', context.getters.nextMobilePageIndices),
  previousSection: (context) => context.dispatch('goToPage', context.getters.previousSectionIndices),
  nextSection: (context) => context.dispatch('goToPage', context.getters.nextSectionIndices),

  resetSectionIndices: (context) => {
    let sectionIndices = context.getters.pages.map((page, index) => {
      if(index == context.getters.zeroedPageIndex) return context.getters.sectionIndex - 1
      return page.startIndex || 0
    })
    context.commit('RESET_SECTION_INDICES', sectionIndices)
  },

  updateVideoURL: (context, payload) => {
    context.commit('UPDATE_VIDEO_URL', payload)
    TrackingHandler.trackVideoPlay(payload)
  },

  openVideo: (context, payload) => {
    context.commit('UPDATE_VIDEO_URL', payload)
    TrackingHandler.trackVideoPlay(payload)
  },

  setInitialWindowSize: (context, payload) => {
    context.commit('UPDATE_INITIAL_WINDOW_SIZE', {...payload})
  },
  changeWindowSize: (context, payload) => {
    let pageWidth = context.getters.width
    let pageHeight = context.getters.height
    if (context.getters.contentsPinned) {
      if (payload.width < 992) {
        var windowWidth = payload.width
        var mobile = true
      } else {
        var windowWidth = payload.width - 300
        var mobile = false
      }
    } else {
      var windowWidth = payload.width
    }
    let windowHeight = payload.height - 60
    let widthRatio = windowWidth / pageWidth
    let heightRatio = windowHeight / pageHeight
    if(context.getters.doublePage) {
      if ((windowWidth / (pageWidth * 2)) < heightRatio) {
        context.commit('UPDATE_IS_DOUBLE_PAGE', false)
      } else {
        context.commit('UPDATE_IS_DOUBLE_PAGE', true)
      }
    }
  
    if((pageWidth <= windowWidth) && (pageHeight <= windowHeight)){
      let newScale = Math.min(widthRatio, heightRatio)
      // console.log('widthratio', widthRatio)
      // console.log('heightratio', heightRatio)
      context.commit('UPDATE_PAGE_SCALE', {pageScale: newScale})
    } else {
      let newScale = Math.min(widthRatio, heightRatio)
      context.commit('UPDATE_PAGE_SCALE', {pageScale: newScale})
    }
    if (context.getters.contentsPinned) {
      if(windowWidth <= 992 && mobile){
        context.commit('UPDATE_CONTENT_PANEL', false)
      } else {
        context.commit('UPDATE_CONTENT_PANEL', true)
      }
    }
  },
  
  checkMobileLanding: (context, payload) => {
    let isMobile = context.getters.isMobile
    let landingPage = context.getters.currentMobilePage
    let mobileSwitch = context.getters.mobileSwitch
    if(!mobileSwitch || !isMobile) return
    if(landingPage) {
      return 
    }
    else {
      router.replace('/1-1')
    }
  },

  updateZoom (context, payload) {
    let newZ = (context.state.zoomLevel * context.state.pageScale) - 1
    let newX = context.state.zoomOriginX - (mouse.deltaX / newZ)
    let newY = context.state.zoomOriginY - (mouse.deltaY / newZ)
    // if(newX < -context.getters.width  ) newX = (-context.getters.width -  100) / newZ
    // if(newY < -context.getters.height ) newY = (-context.getters.height - 100) / newZ
    // if(newX > context.getters.width ) newX = (context.getters.width + 100) / newZ
    // if(newY > context.getters.height) newY = (context.getters.height + 100) / newZ
    context.commit('UPDATE_ZOOM', {zoomOriginX: newX, zoomOriginY: newY, zoomLevel: payload.zoomLevel})
  },

  scrollZoom (context, payload) {
    let zoomLevel = context.state.zoomLevel + payload.zoomDelta
    zoomLevel = zoomLevel > 2 ? 2 : zoomLevel
    zoomLevel = zoomLevel < 1 ? 1 : zoomLevel
    let windowWidthAdjustment = context.getters.contentsPinned ? 300 : 0
    let newX = (payload.x) - (window.innerWidth - windowWidthAdjustment) / 2
    let newY = (payload.y) - (window.innerHeight + 48) / 2
    let translateX = context.state.translateX + (newX - context.state.zoomOriginX) * (1 - 1 / (context.state.zoomLevel * context.state.pageScale))
    let translateY = context.state.translateY + (newY - context.state.zoomOriginY) * (1 - 1 / (context.state.zoomLevel * context.state.pageScale))
    
    console.log({zoomOriginX: newX, zoomOriginY: newY, zoomLevel: zoomLevel, translateX: translateX, translateY: translateY})

    context.commit(
      'UPDATE_ZOOM',
      {zoomOriginX: newX, zoomOriginY: newY, zoomLevel: zoomLevel, translateX: translateX, translateY: translateY}
    )
  },

  pinchZoom (context, payload) {
    let newZ = (context.state.zoomLevel * context.state.pageScale) - 1
    let newX = context.state.zoomOriginX / newZ
    let newY = context.state.zoomOriginY / newZ
    // if(newX < -context.getters.width  ) newX = -context.getters.width -  100
    // if(newY < -context.getters.height ) newY = -context.getters.height - 100
    // if(newX > context.getters.width ) newX = context.getters.width + 100
    // if(newY > context.getters.height) newY = context.getters.height + 100
    context.commit('UPDATE_ZOOM', {zoomOriginX: newX, zoomOriginY: newY, zoomLevel: payload.zoomLevel})
  },

  panZoom (context, payload) {
    let newZ = (context.state.zoomLevel * context.state.pageScale) - 1
    let newX = context.state.zoomOriginX - (payload.zoomOriginX / newZ)
    let newY = context.state.zoomOriginY - (payload.zoomOriginY / newZ)
    console.log("Pan Zoom: " + newZ + ", " + newX + ", " + newY)
    context.commit('UPDATE_ZOOM', {zoomOriginX: newX, zoomOriginY: newY, zoomLevel: context.state.zoomLevel})
  },

  openGallery(context, payload) {
    context.commit('UPDATE_GALLERY', payload)
  },

  openGalleryTwo(context, payload) {
    context.commit('UPDATE_GALLERY_INDEX', payload[1])
    context.commit('UPDATE_GALLERY', payload[0])
  },
  
  closeGallery(context, payload) {
    context.commit('UPDATE_GALLERY', [])
  },

  goToGallerySlide(context, payload) {
    context.commit('UPDATE_GALLERY_INDEX', payload)
  },

  nextGallerySlide(context, payload) {
    if(context.state.galleryIndex < context.state.galleryImages.length - 1) context.commit('UPDATE_GALLERY_INDEX', context.state.galleryIndex + 1)
    else context.commit('UPDATE_GALLERY_INDEX', 0)
  },

  previousGallerySlide(context, payload) {
    if(context.state.galleryIndex > 0) context.commit('UPDATE_GALLERY_INDEX', context.state.galleryIndex - 1)
    else context.commit('UPDATE_GALLERY_INDEX', context.state.galleryImages.length - 1)
  },

  updateAudioURL: (context, payload) => {
    context.commit('UPDATE_AUDIO_URL', payload)
    TrackingHandler.trackAudioPlay(payload)
  },

  openAudio: (context, payload) => {
    context.commit('UPDATE_AUDIO_URL', payload)
    TrackingHandler.trackAudioPlay(payload)
  },
}
