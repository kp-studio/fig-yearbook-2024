import Hammer from "hammerjs"

export default {
  init() {
    window.mouseDown = false
    window.mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      upX: 0,
      upY: 0,
      deltaX: 0,
      deltaY: 0,
    }
    // Mouse Events
    // document.addEventListener("mousedown", this.mouseDownHandler)
    // document.addEventListener("mousemove", this.mouseMoveHandler)
    // document.addEventListener("mouseup", this.mouseUpHandler)
    document.addEventListener(
      "wheel",
      this.mouseWheelHandler,
      { passive: false }
    )
    document.addEventListener("dblclick", this.doubleClickHandler)
    //Touch Events
    // document.addEventListener( "touchstart", this.touchStartHandler)
    // document.addEventListener( "touchend", this.touchEndHandler)
    // document.addEventListener( "touchmove", this.touchMoveHandler)
    //Keyboard Events
    document.onkeydown = this.keyDownHandler
    var hammertime;
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      hammertime = new Hammer(document.getElementById("app"), {
        touchAction: "auto",
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
        recognizers: [
          [Hammer.Swipe, {
            direction: Hammer.DIRECTION_HORIZONTAL
          }]
        ]
      })
      hammertime.add(new Hammer.Swipe());
    } else {
      hammertime = new Hammer(document.getElementById("app"), {
        touchAction: "auto",
      })
    }

    hammertime.get("swipe").set({direction: Hammer.DIRECTION_ALL})
      
    // hammertime.add(new Hammer.Tap({ event: "doubletap", taps: 2 }))
    // hammertime.add(new Hammer.Tap({ event: "singletap" }))
    // hammertime.get("doubletap").recognizeWith("singletap")
    // hammertime.get("singletap").requireFailure("doubletap")

    // hammertime.on("singletap", function(e) {
    //   if (Publish.zoomEnabled && Publish.isGalleryOpen == false && Publish.videoURL == "" &&
    //     (e.target.className.search("currentPage") !== -1 ||
    //       e.target.className.search("leftPage") !== -1 ||
    //       e.target.className.search("rightPage") !== -1)
    //   ) {
    //     mouse.lastX = e.srcEvent.clientX
    //     mouse.lastY = e.srcEvent.clientY
    //   } else {
    //     console.log("Could not single tap")
    //   }
    // })

    // hammertime.on("doubletap", function(e) {
    //   if (Publish.zoomEnabled && Publish.isGalleryOpen == false && Publish.videoURL == "" &&
    //     (e.target.className.search("currentPage") !== -1 ||
    //       e.target.className.search("leftPage") !== -1 ||
    //       e.target.className.search("rightPage") !== -1 ||
    //       e.path.indexOf(document.getElementById("page-container") !== -1)
    //     )
    //   ) {
    //     console.log("WORKING - MOBILE")
    //     Publish.toggleZoom({
    //       zoomOriginX: e.srcEvent.clientX,
    //       zoomOriginY: e.srcEvent.clientY,
    //     })
    //   } else {
    //     console.log("Could not double tap")
    //   }
    // })

    // hammertime.on("pinchin", function(e) {
    //   e.hammertime.preventDefault()
    //   if (Publish.zoomEnabled && Publish.isGalleryOpen == false && Publish.videoURL == "" &&
    //     (e.target.className.search("currentPage") !== -1 ||
    //       e.target.className.search("leftPage") !== -1 ||
    //       e.target.className.search("rightPage") !== -1 ||
    //       e.path.indexOf(document.getElementById("page-container") !== -1)
    //     )
    //   ) {
    //     Publish.pinchZoom({
    //       zoomOriginX: e.center.x,
    //       zoomOriginY: e.center.y,
    //       zoomLevel: e.scale,
    //     })
    //   } else {
    //     console.log("Could not pinch in")
    //   }
    // })


    // hammertime.on("pinchout", function(e) {
    //   e.hammertime.preventDefault()
    //   if (Publish.zoomEnabled && Publish.isGalleryOpen == false && Publish.videoURL == "" &&
    //     (e.target.className.search("currentPage") !== -1 ||
    //       e.target.className.search("leftPage") !== -1 ||
    //       e.target.className.search("rightPage") !== -1 ||
    //       e.path.indexOf(document.getElementById("page-container") !== -1)
    //     )
    //   ) {
    //     Publish.pinchZoom({
    //       zoomOriginX: e.center.x,
    //       zoomOriginY: e.center.y,
    //       zoomLevel: e.scale,
    //     })
    //   } else {
    //     console.log("Could not pinch out")
    //   }
    // })

    hammertime.on("pan", function(e) {
      if(!Publish.isMobile) {
        mouse.x = e.srcEvent.clientX
        mouse.y = e.srcEvent.clientY
        mouse.deltaX = mouse.x - mouse.lastX
        mouse.deltaY = mouse.y - mouse.lastY
        mouse.lastX = mouse.x
        mouse.lastY = mouse.y
        // console.log(mouse.deltaX + ", " + mouse.deltaY)
        // console.log("Panning")
        if (mouseDown && Publish.isZoomed && mouse.y > 50) {
          Publish.updateZoom({
            x: mouse.x,
            y: mouse.y,
          })
        }
      }
    })

    hammertime.on("panstart", function(e) {
      if(!Publish.isMobile) {
        if (Publish.isZoomed) {
          mouseDown = true
          mouse.lastX = e.srcEvent.clientX
          mouse.lastY = e.srcEvent.clientY
        }
      }
    })

    hammertime.on("panend", function(e) {
      if(!Publish.isMobile) {
        if (mouseDown && Publish.pagesVisible) {
          mouse.lastX = mouse.x
          mouse.lastX = mouse.y
          mouseDown = false
        }
      }
    })

    hammertime.on("swipe", function(e) {
      if( Publish.isMobile && document.documentElement.dataset.mobile == "iOS" && screen.width != window.innerWidth && screen.width != window.innerHeight) //Safari
      {
        // console.log('zoomed portrait')
      } else {
      if (Publish.isGalleryOpen) {
        if (e.direction === Hammer.DIRECTION_LEFT) {
          if (!Publish.rightToLeft) {
            Publish.nextGallerySlide()
          } else {
            Publish.previousGallerySlide()
          }
        } else if (e.direction === Hammer.DIRECTION_RIGHT) {
          if (!Publish.rightToLeft) {
            Publish.previousGallerySlide()
          } else {
            Publish.nextGallerySlide()
          }
        }
      } else if (Publish.videoURL == "" && Publish.audioURL == "" && !Publish.isZoomed) {
        if (Publish.isMobile || Publish.isReader) {
          if (Publish.mobileSwitch || Publish.isReader) {
            if (e.direction === Hammer.DIRECTION_LEFT) {
              if (!Publish.rightToLeft) {
                Publish.goToNextMobilePage()
              } else {
                Publish.goToPreviousMobilePage()
              }
            } else if (e.direction === Hammer.DIRECTION_RIGHT) {
              if (!Publish.rightToLeft) {
                Publish.goToPreviousMobilePage()
              } else {
                Publish.goToNextMobilePage()
              }
            } else if (e.direction === Hammer.DIRECTION_UP) {
              console.log('Hammering Up')
              if (Publish.pagesVisible) Publish.goToNextSection()
            } else if (e.direction === Hammer.DIRECTION_DOWN) {
              console.log('Hammering Down')
              if (Publish.pagesVisible) Publish.goToPreviousSection()
            }
          } else {
            if (!Publish.isZoomed) {
              if (e.direction === Hammer.DIRECTION_LEFT) {
                if (!Publish.rightToLeft) {
                  Publish.goToNextPage()
                } else {
                  Publish.goToPreviousPage()
                }
              } else if (e.direction === Hammer.DIRECTION_RIGHT) {
                if (!Publish.rightToLeft) {
                  Publish.goToPreviousPage()
                } else {
                  Publish.goToNextPage()
                }
              } else if (e.direction === Hammer.DIRECTION_UP) {
                console.log('Hammering Up')
                if (Publish.pagesVisible) Publish.goToNextSection()
              } else if (e.direction === Hammer.DIRECTION_DOWN) {
                console.log('Hammering Down')
                if (Publish.pagesVisible) Publish.goToPreviousSection()
              }
            }
          }
        } else {
          if (e.direction === Hammer.DIRECTION_LEFT) {
            if (!Publish.rightToLeft) {
              Publish.goToNextPage()
            } else {
              Publish.goToPreviousPage()
            }
          } else if (e.direction === Hammer.DIRECTION_RIGHT) {
            if (!Publish.rightToLeft) {
              Publish.goToPreviousPage()
            } else {
              Publish.goToNextPage()
            }
          } else if (e.direction === Hammer.DIRECTION_UP) {
            console.log('Hammering Up')
            if (Publish.pagesVisible) Publish.goToNextSection()
          } else if (e.direction === Hammer.DIRECTION_DOWN) {
            console.log('Hammering Down')
            if (Publish.pagesVisible) Publish.goToPreviousSection()
          }
        }
      }  
      // else {
      //   if (e.direction === Hammer.DIRECTION_LEFT) {
      //     if (!Publish.rightToLeft) {
      //       Publish.goToNextPage()
      //     } else {
      //       Publish.goToPreviousPage()
      //     }
      //   } else if (e.direction === Hammer.DIRECTION_RIGHT) {
      //     if (!Publish.rightToLeft) {
      //       Publish.goToPreviousPage()
      //     } else {
      //       Publish.goToNextPage()
      //     }
      //   } else if (e.direction === Hammer.DIRECTION_UP) {
      //     if (Publish.pagesVisible) Publish.goToPreviousSection()
      //   } else if (e.direction === Hammer.DIRECTION_DOWN) {
      //     if (Publish.pagesVisible) Publish.goToNextSection()
      //   }
      // }
    } 
    })
  },

  mouseWheelHandler(e) {
    if (e.ctrlKey) {
      e.preventDefault()
      mouse.x = e.clientX
      mouse.y = e.clientY

      if (e.wheelDelta > 0) {
        Publish.scrollZoom({
          x: mouse.x,
          y: mouse.y,
          zoomDelta: 0.08
        })
      } else {
        Publish.scrollZoom({
          x: mouse.x,
          y: mouse.y,
          zoomDelta: -0.08
        })
      }
    } else {
      if (e.wheelDelta > 0) {
        Publish.goToPreviousSection()
      } else {
        Publish.goToNextSection()
      }
    }
  },

  mouseMoveHandler(e) {
    if (Publish.pagesVisible && Publish.zoomEnabled) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (mouseDown && !Publish.isZoomed) {
        if (mouse.x - mouse.lastX < -100) {
          // if (Publish.pagesVisible) {
          //   if (Publish.rightToLeft)
          //     Publish.goToPreviousPage()
          //   else
          //     Publish.goToNextPage()
          // }
          mouseDown = false
          mouse.lastX = mouse.x
          mouse.lastY = mouse.y
        } else if (mouse.x - mouse.lastX > 100) {
          // if (Publish.pagesVisible) {
          //   if (Publish.rightToLeft)
          //     Publish.goToNextPage()
          //   else
          //     Publish.goToPreviousPage()
          // }
          mouse.lastX = mouse.x
          mouse.lastY = mouse.y
          mouseDown = false
        } else if (mouse.y - mouse.lastY < -100) {
          // if (Publish.pagesVisible) Publish.goToNextSection()
          mouse.lastX = mouse.x
          mouse.lastY = mouse.y
          mouseDown = false
        } else if (mouse.y - mouse.lastY > 100) {
          // if (Publish.pagesVisible) Publish.goToPreviousSection()
          mouse.lastX = mouse.x
          mouse.lastY = mouse.y
          mouseDown = false
        }
      }
      if (mouseDown && Publish.isZoomed) {
        Publish.updateZoom({
          x: mouse.x,
          y: mouse.y,
        })
      }
    }
  },

  mouseDownHandler(e) {
    if (!mouseDown && Publish.pagesVisible) {
      mouseDown = true
      mouse.lastX = mouse.x
      mouse.lastY = mouse.y
    }
  },

  mouseUpHandler(e, fromTouch) {
    if (mouseDown && Publish.pagesVisible) {
      mouse.upX = mouse.x
      mouse.upY = mouse.y
      mouseDown = false
    }
  },

  doubleClickHandler(e) {
    if (Publish.zoomClickEnabled && Publish.isGalleryOpen == false && Publish.videoURL == "" &&
      (e.target.className.search("currentPage") !== -1 ||
        e.target.className.search("leftPage") !== -1 ||
        e.target.className.search("rightPage") !== -1 ||
        e.path.indexOf(document.getElementById("page-container") !== -1))
    ) {
      Publish.toggleZoom({
        zoomOriginX: e.pageX - window.innerWidth / 2,
        zoomOriginY: e.pageY - window.innerHeight / 2,
      })
      
    } else {
      console.log("Double click failed!")
    }
  },

  keyDownHandler(e) {
    e = e || window.event
    if (e.target.tagName == "INPUT" || e.ctrlKey == true || e.metaKey == true)
      return
    if (Publish.isGalleryOpen) {
      if (e.keyCode == "37") {
        if (!Publish.rightToLeft) {
          Publish.previousGallerySlide()
        } else {
          Publish.nextGallerySlide()
        }
      }
      if (e.keyCode == "39") {
        if (!Publish.rightToLeft) {
          Publish.nextGallerySlide()
        } else {
          Publish.previousGallerySlide()
        }
      }
    } else if ((Publish.isMobile && Publish.mobileSwitch) || Publish.isReader){
      // if(!Publish.isZoomed){
      if (e.keyCode == "37") {
        if (Publish.rightToLeft) Publish.goToNextMobilePage()
        else Publish.goToPreviousMobilePage()
      }
      if (e.keyCode == "39") {
        if (Publish.rightToLeft) Publish.goToPreviousMobilePage()
        else Publish.goToNextMobilePage()
      }
      // }
    } else if (!Publish.videoURL == "" || !Publish.audioURL == ""){
      
    } else {
      if (e.keyCode == "37") {
        if (Publish.rightToLeft) Publish.goToNextPage()
        else Publish.goToPreviousPage()
      } // left arrow
      if (e.keyCode == "38") Publish.goToPreviousSection() // up arrow
      if (e.keyCode == "39") {
        if (Publish.rightToLeft) Publish.goToPreviousPage()
        else Publish.goToNextPage()
      } // right arrow
      if (e.keyCode == "40") Publish.goToNextSection() // down arrow
    }
  },

  throttle(func, wait = 100) {
    let timer = null
    return function(...args) {
      if (timer === null) {
        timer = setTimeout(() => {
          func.apply(this, args)
          timer = null
        }, wait)
      }
    }
  },
}
