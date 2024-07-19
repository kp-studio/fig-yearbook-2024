export default {
  init() {
    let documentElement = document.documentElement
    documentElement.setAttribute("data-useragent", navigator.userAgent)
    documentElement.setAttribute("data-platform", navigator.platform)
    documentElement.setAttribute("data-mobile", this.getMobileOperatingSystem())
    documentElement.setAttribute("data-browser", this.getBrowserInformation())
  },
  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows"
    }

    if (/android/i.test(userAgent)) {
      return "Android"
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS"
    }

    return "unknown"
  },

  getBrowserInformation() {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || []
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return "IE " + (tem[1] || "")
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
      if (tem != null)
        return tem
          .slice(1)
          .join(" ")
          .replace("OPR", "Opera")
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"]
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
    return M[0]
  },
}
