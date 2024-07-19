import { isNull } from "util"

export default {
  title: state => state.document.title,
  description: state => state.document.description,
  basePath: state => state.document.basePath,
  pages: state =>
    state.document.pages.map((page, pageIndex) =>
      page.map((section, sectionIndex) => {
        section.pageIndex = pageIndex
        section.sectionIndex = sectionIndex
        return section
      })
    ),
  titledPages: state => state.document.pages.filter((page) => page[0].title),
  videoURL: state => state.videoURL,
  audioURL: state => state.audioURL,
  showContents: (state, getters) => {
    return state.activePanel == "Contents" || getters.contentsPinned
  },
  showLanguages: state => state.activePanel == "Languages",
  showSearch: state => state.activePanel == "Search",
  showGuide: state => state.activePanel == "Guide",
  showEditions: state => state.activePanel == "Editions",
  isZoomed: state => state.zoomLevel != 1,
  zoomLevel: state => state.zoomLevel,
  companyLogo: (state, getters) => {
    if (state.document.companyLogo != "") {
      return getters.basePath + "/static/_content/" + state.document.companyLogo
    } else return getters.basePath + "/static/kp-logo-white.svg"
  },
  galleryImages: state => state.galleryImages,
  galleryCaptions: state => state.document.options.galleryCaptions,
  galleryIndex: state => state.galleryIndex,
  isGalleryOpen: state => state.galleryImages.length > 0,
  isMobile: (state, getters) => {
    return (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
          a.substr(0, 4)
        )
      )
        return true
    })(navigator.userAgent || navigator.vendor || window.opera)
      ? true
      : false
  },
  isMobileFontLarge: (state) => state.isMobileFontLarge,
  isIE11: (state, getters) => !!navigator.userAgent.match(/Trident\/7\./),
  isPhantom: (state, getters) =>
    !!(navigator.userAgent.match("PhantomJS") != null),
  initialWindowWidth: state => state.initialWindowWidth,
  initialWindowHeight: state => state.initialWindowHeight,
  publishURL: state => state.document.publishURL,
  doublePage: state => state.document.options.doublePage,
  contentsEnabled: state => state.document.options.contents.enabled,
  contentsPinned: (state, getters) => {
    return state.document.options.contents.pinned && getters.contentsEnabled &&
      !getters.isMobile && !getters.isFullscreen
  },
  contentsNumbers: state => state.document.options.contents.numbers,
  contentsTitles: state => state.document.options.contents.titles,
  downloadEnabled: state => state.document.options.downloadEnabled,
  languagesEnabled: state => state.document.options.languagesEnabled,
  readerEnabled: state => state.document.options.readerEnabled,
  printEnabled: state => state.document.options.printEnabled,
  searchEnabled: state => state.document.options.searchEnabled,
  guideEnabled: state => state.document.options.guideEnabled,
  editionsEnabled: state => state.document.options.editionsEnabled,
  zoomNavEnabled: state => state.document.options.zoom.navEnabled,
  zoomClickEnabled: state => state.document.options.zoom.clickEnabled,
  zoomScrollEnabled: state => state.document.options.zoom.scrollEnabled,
  zoomSliderEnabled: state => state.document.options.zoom.sliderEnabled,
  zoomEnabled: state => {
    return state.document.options.zoom.navEnabled ||
      state.document.options.zoom.clickEnabled ||
      state.document.options.zoom.scrollEnabled ||
      state.document.options.zoom.sliderEnabled
  },
  mobileSwitch: state => state.document.options.mobileSwitch,
  rightToLeft: (state, getters) => state.document.options.rightToLeft,
  pagesVisible: (state, getters) => !getters.showSearch,
  downloadPath: (state, getters) => state.document.options.downloadPath,
  fullscreenEnabled: state => {
    return state.document.options.fullscreenEnabled &&
    document.documentElement.requestFullscreen
  },
  isFullscreen: state => state.isFullscreen,
  width: state => state.document.width,
  height: state => state.document.height,
  languages: state => state.document.languages,
  currentLanguage: state => state.document.currentLanguage,
  editions: state => state.document.editions,
  zeroedPageIndex: (state, getters) => getters.pageIndex - 1,
  zeroedSectionIndex: (state, getters) => getters.sectionIndex - 1,
  currentPages: (state, getters) => getters.pages[getters.zeroedPageIndex],
  currentPage: (state, getters) =>
    getters.pages[getters.zeroedPageIndex][getters.zeroedSectionIndex],
  currentSection: (state, getters) =>
    getters.pages[getters.zeroedPageIndex][getters.zeroedSectionIndex],
  routeFromIndex: (state, getters) => (pageIndex, sectionIndex) =>
    "/" + pageIndex + "-" + sectionIndex,
  externalResources: state => state.document.externalResources,
  pageInRange: (state, getters) => (pageIndex, sectionIndex) =>
    (getters.pages[pageIndex - 1] || [])[sectionIndex - 1] !== undefined,
  isDoublePage: (state, getters) => state.isDoublePage,
  visiblePages: (state, getters) => {
    if (state.isDoublePage && getters.doublePage) {
      if (getters.zeroedPageIndex == 0) {
        return {
          previousLeftPage: null,
          previousRightPage: null,
          leftPage: null,
          previousSection: getters.previousSection,
          currentPage: getters.currentPage,
          nextSection: getters.nextSection,
          nextLeftPage: getters.nextPage,
          nextRightPage: getters.nextNextPage,
        }
      } else if (getters.nextPage == null && getters.nextNextPage == null) {
        return {
          previousLeftPage: getters.previousPreviousPage,
          previousRightPage: getters.previousPage,
          previousSection: getters.previousSection,
          leftPage: null,
          currentPage: getters.currentPage,
          nextSection: getters.nextSection,
          nextLeftPage: null,
          nextRightPage: null,
        }
      } else if (getters.zeroedPageIndex % 2 != 1) {
        return {
          previousLeftPage: getters.previousPreviousPreviousPage,
          previousRightPage: getters.previousPreviousPage,
          previousSection: getters.previousSection,
          leftPage: getters.previousPage,
          rightPage: getters.currentPage,
          nextSection: getters.nextSection,
          nextLeftPage: getters.nextPage,
          nextRightPage: getters.nextNextPage,
        }
      } else {
        return {
          previousLeftPage: getters.previousPreviousPage,
          previousRightPage: getters.previousPage,
          previousSection: getters.previousSection,
          leftPage: getters.currentPage,
          rightPage: getters.nextPage,
          nextSection: getters.nextSection,
          nextLeftPage: getters.nextNextPage,
          nextRightPage: getters.nextNextNextPage,
        }
      }
    } else {
      return {
        previousPreviousPage: getters.previousPreviousPage,
        previousPage: getters.previousPage,
        previousSection: getters.previousSection,
        currentPage: getters.currentPage,
        nextSection: getters.nextSection,
        nextPage: getters.nextPage,
        nextNextPage: getters.nextNextPage,
      }
    }
  },
  previousPreviousPreviousPage: (state, getters) => {
    if (getters.pageIndex <= 3) return null
    return getters.pages[getters.pageIndex - 4][state.sectionIndices[0]]
  },

  previousPreviousPage: (state, getters) => {
    if (getters.pageIndex <= 2) return null
    return getters.pages[getters.pageIndex - 3][state.sectionIndices[0]]
  },

  previousPage: (state, getters) => {
    if (getters.pageIndex <= 1) return null
    return getters.pages[getters.pageIndex - 2][state.sectionIndices[0]]
  },

  nextPage: (state, getters) => {
    if (getters.pageIndex >= getters.pages.length) return null
    return getters.pages[getters.pageIndex][state.sectionIndices[0]]
  },

  nextNextPage: (state, getters) => {
    if (getters.pageIndex >= getters.pages.length - 1) return null
    return getters.pages[getters.pageIndex + 1][state.sectionIndices[0]]
  },

  nextNextNextPage: (state, getters) => {
    if (getters.pageIndex >= getters.pages.length - 2) return null
    return getters.pages[getters.pageIndex + 2][state.sectionIndices[0]]
  },

  previousSection: (state, getters) => {
    if (getters.sectionIndex <= 1) return null
    return getters.pages[getters.pageIndex - 1][getters.sectionIndex - 2]
  },

  nextSection: (state, getters) => {
    if (getters.sectionIndex >= getters.pages[getters.pageIndex - 1].length)
      return null
    return getters.pages[getters.pageIndex - 1][getters.sectionIndex]
  },

  previousPageURI: (state, getters) => {
    if (getters.previousPage == null) return null
    if(state.isDoublePage && getters.doublePage) {
      if(getters.previousPreviousPage == null) {
        return getters.routeFromIndex(1,1)
      }
      return getters.routeFromIndex(
        2 * parseInt((getters.pageIndex - 2) / 2.0),
        1
      )
    }
    return getters.routeFromIndex(
      getters.pageIndex - 1,
      state.sectionIndices[getters.pageIndex - 2] + 1
    )
  },

  nextPageURI: (state, getters) => {
    if (getters.nextPage == null || (getters.nextPage.index == Publish.$store.state.document.pages.length)) return null
    if (state.isDoublePage && getters.doublePage){
      if(getters.nextNextPage == null) {
        return getters.routeFromIndex(Publish.$store.state.document.pages.length - 1, 1)
      }
      return getters.routeFromIndex(
        2 * parseInt((getters.pageIndex + 2) / 2.0),
        1
      )
    }
    return getters.routeFromIndex(
      getters.pageIndex + 1,
      state.sectionIndices[getters.pageIndex] + 1
    )
  },

  previousSectionURI: (state, getters) => {
    if (getters.previousSection == null) return null
    return getters.routeFromIndex(getters.pageIndex, getters.sectionIndex - 1)
  },

  nextSectionURI: (state, getters) => {
    if (getters.nextSection == null) return null
    return getters.routeFromIndex(getters.pageIndex, getters.sectionIndex + 1)
  },

  previousPageIndices: (state, getters) => {
    if (getters.previousPage == null) return null
    return {
      pageIndex: getters.pageIndex - 1,
      sectionIndex: state.sectionIndices[getters.pageIndex - 2] + 1,
    }
  },

  previousDoublePageIndices: (state, getters) => {
    if (getters.previousPage == null) return null
    return {
      pageIndex: Math.ceil(getters.pageIndex - 2),
      sectionIndex: state.sectionIndices[getters.pageIndex - 2] + 1,
    }
  },

  nextPageIndices: (state, getters) => {
    if (getters.nextPage == null) return null
    return {
      pageIndex: getters.pageIndex + 1,
      sectionIndex: state.sectionIndices[getters.pageIndex] + 1,
    }
  },

  nextDoublePageIndices: (state, getters) => {
    if (getters.nextNextPage == null) return null
    return {
      pageIndex: 2 * parseInt((getters.pageIndex + 2) / 2.0),
      sectionIndex: state.sectionIndices[getters.pageIndex] + 1,
    }
  },

  previousSectionIndices: (state, getters) => {
    if (getters.previousSection == null) return null
    return {
      pageIndex: getters.pageIndex,
      sectionIndex: getters.sectionIndex - 1,
    }
  },

  nextSectionIndices: (state, getters) => {
    if (getters.nextSection == null) return null
    return {
      pageIndex: getters.pageIndex,
      sectionIndex: getters.sectionIndex + 1,
    }
  },

  pageContainerStyle: (state, getters) => {
    let styleObject = {}

    styleObject.transformOrigin =
      state.zoomOriginX + "px " + state.zoomOriginY + "px"

    styleObject.transform = 
      "scale(" + getters.pageContainerZoomLevel * state.pageScale + ") translate(" + state.translateX + "px, " + state.translateY + "px)"

    return styleObject
  },

  pageContainerZoomLevel: (state, getters) => {
    return state.zoomLevel
  },

  searchObject: (state, getters) => {
    let searchArray = []
    getters.pages.forEach((sections, pageIndex) => {
      sections.forEach((section, sectionIndex) => {
        searchArray.push({
          id: pageIndex + 1 + "-" + (sectionIndex + 1),
          pageIndex: pageIndex + 1,
          sectionIndex: sectionIndex + 1,
          title: section.title,
          body: section.searchText || "",
          image: section.original || "",
          thumb: section.index + 1,
        })
      })
    })
    return searchArray
  },

  pageScripts: (state, getters) => {
    return getters.pages
      .map((page, pageIndex) => {
        return page.filter(e => e.script).map((section, sectionIndex) => {
          return section.script
            .replace(
              "onPageEnter",
              "p" + pageIndex + "s" + sectionIndex + "onPageEnter"
            )
            .replace(
              "onPageLeave",
              "p" + pageIndex + "s" + sectionIndex + "onPageLeave"
            )
        })
      })
      .reduce((a, b) => a.concat(b))
      .join("\n")
  },

  documentScript: state => state.document.script,

  //#region Mobile
  mobilePages: state => state.document.mobilePages,
  mobilePageLink: (state, getters) => page => {
    if (page.pageLinks.length) {
      let pageLink = page.pageLinks[0]
      return `/${pageLink.index + 1}-${pageLink.subIndex + 1}`
    }
  },
  currentMobilePage: (state, getters) => {
    if (!((getters.isMobile && getters.mobileSwitch) || getters.readerEnabled)) return
    let currentPage = getters.mobilePages.find(e =>
      e.pageLinks.find(
        f =>
          f.index == getters.zeroedPageIndex &&
          f.subIndex == getters.zeroedSectionIndex
      )
    )
    if (currentPage) return currentPage
    else return null
  },
  currentMobilePageIndex: (state, getters) => {
    if(!getters.mobilePages) return
    return getters.mobilePages.findIndex(e =>
      e.pageLinks.find(
        f =>
          f.index == getters.zeroedPageIndex &&
          f.subIndex == getters.zeroedSectionIndex
      )
    )
  },
  nextMobilePage: (state, getters) => {
    if (getters.currentMobilePageIndex >= getters.mobilePages.length)
      return null
    return getters.mobilePages[getters.currentMobilePageIndex + 1]
  },
  nextMobilePageIndices: (state, getters) => {
    if (getters.nextMobilePage == null) return null
    return {
      pageIndex: getters.nextMobilePage.pageLinks[0].index + 1,
      sectionIndex: getters.nextMobilePage.pageLinks[0].subIndex + 1,
    }
  },
  previousMobilePage: (state, getters) => {
    if (getters.currentMobilePageIndex <= 0) return null
    return getters.mobilePages[getters.currentMobilePageIndex - 1]
  },
  previousMobilePageIndices: (state, getters) => {
    if (getters.previousMobilePage == null) return null
    return {
      pageIndex: getters.previousMobilePage.pageLinks[0].index + 1,
      sectionIndex: getters.previousMobilePage.pageLinks[0].subIndex + 1,
    }
  },

  mobilePageContent: (state, getters) => mobilePage =>
    mobilePage.pageLinks
      .map(e => getters.pages[e.index][e.subIndex].mobileHtml)
      .reduce((a, b) => a + b, ""),
  
  //#endregion

  //#region doublePage

  //#endregion
}
