export default {
  init() {
    // Events

    //External Links clicked
    document.addEventListener('click', this.trackOutboundLinks, false)
    //Video Played
    //https://medium.com/@matt_west/track-html5-video-events-using-google-analytics-and-javascript-3be691b8bd45


  },

  trackOutboundLinks(event) {
    if(event.target.tagName != 'A') return
    if(Publish.$gtag) {
      Publish.$gtag.event({
        eventCategory: 'Outbound Link',
        eventAction: 'Click',
        eventLabel: event.target.href,
        transport: 'beacon'
      })
    }
  },

  trackSearchTerms(searchTerm) {
    if(searchTerm == "") return
    if(Publish.$gtag) {
      Publish.$gtag.event({
        eventCategory: 'Search',
        eventAction: 'Search',
        eventLabel: searchTerm
      })
    }
  },
  
  trackVideoPlay(filename) {
    if(filename == "") return
    if(Publish.$gtag) {
      Publish.$gtag.event({
        eventCategory: 'Video',
        eventAction: 'Play',
        eventLabel: filename
      })
    }
  },

  trackAudioPlay(filename) {
    if(filename == "") return
    if(Publish.$gtag) {
      Publish.$gtag.event({
        eventCategory: 'Audio',
        eventAction: 'Play',
        eventLabel: filename
      })
    }
  }
};
