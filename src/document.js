export default  {
    "guid": "437c4aa5-0410-47e4-b976-27dbfeda165b",
    "title": "Publish Mags v2",
    "shortTitle": "",
    "description": "",
    "width": 690,
    "height": 900,
    "currentLanguage": "EN",
    "languages": [{
      "code": "EN",
      "text": "English",
      "href": "#"
    }],
    "basePath": "",
    "companyLogo": "logo.png",
    "publishURL": "",
    "externalResources": ["https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"],
    "options": {
      "doublePage": true,
      "rightToLeft": false,
      "searchEnabled": true,
      "downloadEnabled": false,
      "downloadPath": '',
      "printEnabled": false,
      "zoom": {
        "navEnabled": false,
        "sliderEnabled": true,
        "clickEnabled": true,
        "scrollEnabled": true,
      },
      "contents": {
        "enabled": true,
        "pinned": false,
        "numbers": true,
        "titles": true,
      },
      "languagesEnabled": false,
      "editionsEnabled": false,
      "mobileSwitch": false,
      "guideEnabled": false,
      "galleryCaptions": {},
      "fullscreenEnabled": true,
    },
    "pages": [[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 0,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg1.png",
      "zoom": null,
      "content": ``,
      "script": `
        function onPageEnter() {
        }

        function onPageLeave() {
        }
      `,
      "searchText": ""
    },
    {
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 0,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg1-2.png",
      "zoom": null,
      "content": ``,
      "script": `
        function onPageEnter() {
        }

        function onPageLeave() {
        }
      `,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 1,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg2.png",
      "zoom": null,
      "content": ``,
      "script": `
        function onPageEnter() {
        }

        function onPageLeave() {
        }
      `,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 2,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg3.png",
      "zoom": null,
      "content": `

      `,
      "script": `
        function onPageEnter() {
        }

        function onPageLeave() {
        }
      `,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 3,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg4.png",
      "zoom": null,
      "content": ``,
      "script": `
        function onPageEnter() {
          
        }

        function onPageLeave() {
    
        }

      `,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 4,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg5.png",
      "zoom": null,
      "content": ``,
      "script": `
        function onPageEnter() {
          
        }

        function onPageLeave() {
          
        }
      `,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 5,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg6.png",
      "zoom": null,
      "content": ``,
      "script": `
        function onPageEnter() {
        }

        function onPageLeave() {
        }
      `,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 6,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg7.png",
      "zoom": null,
      "content": ``,
      "script": ``,
      "searchText": ""
    }],[{
      "guid": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "index": 7,
      "subIndex": 0,
      "startIndex": 0,
      "original": "pg8.png",
      "zoom": null,
      "content": ``,
      "script": ``,
      "searchText": ""
    }]],
    "script": `
      function idOf(id) {
        return document.getElementById(id)
      }
  
      function cOf(klass) {
        return document.getElementsByClassName(klass)
      }
      
      function removeContentLinks() {
        var contentLinks = [].slice.call(document.querySelectorAll('.addContentLink'))
        contentLinks.map(function callback(e) { 
          return e.className = 'addContentLink'
        })
      }
  
      function removeContentLinks() {
        var contentLinks = [].slice.call(document.querySelectorAll('.addContentLink'))
        var contentLinksThree = [].slice.call(document.querySelectorAll('.addContentLinkThree'))
        
        contentLinks.map(function callback(e) { 
          return e.className = 'addContentLink'
        })
        contentLinksThree.map(function callback(e) { 
          return e.className = 'addContentLinkThree'
        })
      }
  
      function addContentLinks() {
        var contentLinks = [].slice.call(document.querySelectorAll('.addContentLink'))
        var contentLinksThree = [].slice.call(document.querySelectorAll('.addContentLinkThree'))

        contentLinks.map(function callback(e) {
          return e.className = 'contentLink addContentLink'
        })
        contentLinksThree.map(function callback(e) {
          return e.className = 'contentLinkThree addContentLinkThree'
        })
      }
  
      function showOverlay(idx) {
        idOf(idx).className = 'contentOverlay visible'
      }
  
      function hideOverlay(idx) {
        idOf(idx).className = 'contentOverlay hidden noclick'
      }

      function animateNumber(element){
        if(element.getAttribute("data-number")){
          var args = JSON.parse(element.getAttribute("data-number"));
          var from = 0;
          var to = 100;
          var append = "";
          var preppend = "";
          var decimals = 0;
          var duration = 1;
          var ease = "Linear.easeNone";
          var comma = false;
          var separator = ",";
          var decChar = ".";
          for(obj in args){
            if(obj == "from") from = args[obj];
            if(obj == "to") to = args[obj];
            if(obj == "append") append = args[obj];
            if(obj == "preppend") preppend = args[obj];
            if(obj == "decimals") decimals = args[obj];
            if(obj == "duration") duration = args[obj];
            if(obj == "ease") ease = args[obj];
            if(obj == "comma") comma = args[obj];
            if(obj == "separator") separator = args[obj];
            if(obj == "decChar") decChar = args[obj];
          }
          var obj = {number: from}
          TweenMax.to(obj, duration, {number: to, onUpdate: function(){
            if(comma){
              console.log(obj.number)
              var str = obj.number.toFixed(decimals).toString();
              var predec = str.split(/^\d*/)[0];
              console.log("PREDEC", predec, typeof(predec));
              var newstr = predec.split('').reverse().join('').replace(/(.{3})/g, '$1'+ separator).split('').reverse().join('')
              var comp = newstr.replace(/^,/, '')
              console.log("NEWSTR", newstr, typeof(newstr));
              // console.log({newstr})
              // var dp = str.split(/\.\d+/) ? str.split(/\.\d+/)[0] : "";
              // if(dp[0]) dp = dp[0].replace(".", decChar);
              var dp = "";
              element.innerHTML = preppend+comp+dp+append;
            }else{
              element.innerHTML = preppend+obj.number.toFixed(decimals).toString().replace(".", decChar)+append;
            }
          }, ease: eval(ease)});
        }else{
          return;
        }
      }

      function animateNumbers(klass, delay = 1, stagger = 0.3) {
        numbers = cOf(klass)
      
        setTimeout(function() {
          for (let i = 0; i < numbers.length; i++) {
            setTimeout(animateNumber, stagger * 1000 * i, numbers[i])
          }
        }, delay * 1000)
      }

      function resetNumbers(ele){
        var numbers = cOf(ele)
        for(var i=0; i<numbers.length; i++) {
          numbers[i].innerText= ""
        }
      }

      function individualGallery(index) {
        Publish.openGalleryTwo([['8-gal-1.jpg', '8-gal-2.jpg'], index])
      }
    `,
    "mobilePages": [
      {
        title: "Title",
        link: "Link",
        cssClass: "cover mobile-p1",
        hideInMenu: false,
        pageLinks: [
          {
            index: 0,
            subIndex: 0
          }
        ]
      },
      {
        title: "Title",
        link: "Link",
        cssClass: "blue",
        hideInMenu: false,
        pageLinks: [
          {
            index: 2,
            subIndex: 0
          },
          {
            index: 4,
            subIndex: 0
          }
        ]
      }
    ],
    "mobileTemplate": null,
  }
