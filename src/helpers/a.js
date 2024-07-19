var allowDoublePage = false;

function sleep(milliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + milliseconds >= new Date().getTime()) {
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

var visitGUID = generateUUID();



document.body.ontouchmove = function(event) {
    event.preventDefault();
}

var currentSelectedPage;
var pageJustChanged = false;

function digiSelectPage(dynamicLayer) {
    if(digipage.isDoublePage()) {
        if(editmode && !pageJustChanged) {
            if(currentSelectedPage) {
                currentSelectedPage.className = "page dynamicLayer";
            }
            dynamicLayer.className = "page dynamicLater selectedPage";
            currentSelectedPage = dynamicLayer;

            if(editorWindow) {
                if(editorWindow.setContent) {
                    editorWindow.setDigipage(digipage);
                    if(dynamicLayer.sIdx > 0) {
                        editorWindow.setContent(digipageData.pages[dynamicLayer.idx].children[dynamicLayer.sIdx - 1]);
                    } else {
                        editorWindow.setContent(digipageData.pages[dynamicLayer.idx]);
                    }
                }
            }
        } else if(editmode) {
            pageJustChanged = false;
        }
    }
}

function pageBeforeUnload() {
    var p = document.getElementById("pages");
    var v = document.getElementById("viewport");
    v.removeChild(p);
}

var unloadFired = false;

function pageUnload() {
    if(!unloadFired) {
        var endTime = new Date();
        var timeSpan = Math.round((endTime - startTime) / 1000);
        var aInfo = { duration: timeSpan };
        if(/MSIE;/.test(navigator.userAgent) || Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
            digipage.sendTracking("CLSE", aInfo, true);
        } else {
            digipage.sendTracking("CLSE", aInfo, false);
            var currentTime = new Date();
            var timeNow = new Date();
            while(timeNow - currentTime < 300) {
                timeNow = new Date();
            }
        }
        unloadFired = true;
    }
    //return null;
}


function init() {
    startTime = new Date();
    
    guid = digipageData.guid;
    if(digipageData.versionID === 3) digipageData.options.pagemode = "single";
    
    if(digipageData.options.preload > 0) {
        preloadPages = digipageData.options.preload;
    }
    
    //digipageData.type = 1;
    if(digipageData.type == 1) {
        allowDoublePage = true;
        digipage.setDoublePage(true);
    }
    
    //digiContents = new contents();
    digiGallery = new gallery();
    digiVideo = new video();
    
    //console.log(digipageData.pages.length);
    
    var animScript = document.createElement("script");
    animScript.type = "text/javascript";
    animScript.src = "pageEffects/flatSlider/animation.js";
    animScript.onload = buildCSS;
    document.head.appendChild(animScript);
    
    // load external dependencies
    if(digipageData.externalDependencies) {
        for(var i = 0; i < digipageData.externalDependencies.length; i++) {
            loadExternalFile(digipageData.externalDependencies[i]);
        }
    }
    //buildCSS();
    
    var capabilities = {
        "screenWidth": screen.width,
        "screenHeight": screen.height,
        "referrer": document.referrer
    };
    
    
    digipage.sendTracking("OPEN", capabilities);
    
    window.addEventListener("beforeunload", pageUnload, false);
    window.addEventListener("unload", pageUnload, false);
    window.addEventListener("pagehide", pageUnload, false);
    
}


//Loading screen

function digi() {
    var topMargin = 0;//4;
    var bottomMargin = 0;//4;
    var leftMargin = 0;//20;
    var rightMargin = 0;//20;
    var idx = 0;
    var sIdx = 0;
    var doublePage = false;
    var pageTime;
    var lastPageInfo;
    var newVisitor = true;
    var visitorSet = false;
    var allowPageDrag = true;
    var events = { };
    
    if(allowDoublePage) doublePage = true;
    
    this.triggerEvent = function(eventName) {
        if(events[eventName]) {
            for(var i = 0; i < events[eventName].length; i++) {
                events[eventName][i]();
            }
        }
    };
    
    this.setNewVisitor = function(nV) {
        if(!visitorSet) {
            //console.log("setNewVisitor - " + nV);
            newVisitor = nV;
            visitorSet = true;
        }
    }
    
    this.isNewVisitor = function() {
        return newVisitor;
    };

    this.trackEvent = function(category, action, label, value, fieldsObject) {
        digipage.sendTracking("EVNT", { category : category, action : action, label : label, value : value, fields : fieldsObject }, false);
        
        if(typeof ga !== 'undefined') {
            ga('send', 'event', category, action, label, value, fieldsObject);
        }
        
        //var _gaq = _gaq || [];
        if(typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent', category, action, label, value]);
        }
    };
    
    this.sendTracking = function(recordType, additionalInfo, isClosing) {
        if(!editmode) {
            if(recordType == "PAGE") {
                if(pageTime && lastPageInfo) {
                    lastPageInfo.duration = ((new Date()) - pageTime) / 1000;
                    digipage.sendTracking("EPGE", lastPageInfo);
                }
                lastPageInfo = additionalInfo;
                pageTime = new Date();
            }
            var userGUID = getCookie("userguid");
            //console.log("userGUID = " + userGUID);
            if(userGUID == "") {
                digipage.setNewVisitor(true);
                userGUID = generateUUID();
                setCookie("userguid", userGUID, 365);
            } else {
                digipage.setNewVisitor(false);
            }
            
            var xmlhttp = new XMLHttpRequest();
            //var url = rootPath + "_tracking/" + recordType;// + "-" + additionalInfo;
            var url = "http://content.digipage.net/" + guid + "/_tracking/" + recordType;
            
            if(isClosing) {
                // this request was sent while the browser was closing down...
                // send as non-asynchronous to give greatest chance of it getting sent.
                // NOTE - we're not actually using this as it could lock up the browser for a while on exit
                // if the server is not available. It's here for reference purposes only.
                //xmlhttp.timeout = 800;
                xmlhttp.open("POST", url, false);
            } else {
                xmlhttp.open("POST", url, true);
            }
            
            xmlhttp.setRequestHeader("Content-type", "application/json");
            //if(recordType == "PAGE") {
            //    console.log("PAGE: " + additionalInfo.idx + "-" + additionalInfo.sIdx);
            //}
            /*
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp.responseText);
                    digipageData = JSON.parse(xmlhttp.responseText)
                    init();
                } else {
                    console.log("readyState = " + xmlhttp.readyState + ", status = " + xmlhttp.status);
                }
            };
            */

            //console.log("sending tracking: " + url);
            if(additionalInfo) {
                additionalInfo.userguid = userGUID;
                additionalInfo.visitguid = visitGUID;
            } else {
                additionalInfo = { userguid: userGUID, visitguid: visitGUID };
            }

            if(additionalInfo) {
                xmlhttp.send(JSON.stringify(additionalInfo));
            } else {
                xmlhttp.send(null);
            }
        }
    };
    
    this.checkAddThis = function () {
        var addThisWidth = 38;
        if(sideBarVisible) {
            digipage.closeAddThis();
        } else {
            if(window.innerWidth - scaledWidth > addThisWidth * 2) {
                digipage.openAddThis();
            } else {
                digipage.closeAddThis();
            }
        }
    };
    
    this.openAddThis = function() {
        if(browserOpen) {
            this.closeAddThis();
        } else {
            //console.log("openAddthis");
            var addthis = document.getElementById("divAddthis");
            addthis.className = "addthis_toolbox addthis_floating_style addthis_32x32_style animationTransition addthis-visible";

            //var addThisPos = Math.round((window.innerHeight - scaledHeight) / 2) + 4;
            //if(addThisPos < menuBarHeight + 4) addThisPos = menuBarHeight + 4;
            //console.log("addthis " + addthis.clientHeight);
            var addThisPos = Math.round(window.innerHeight - addthis.clientHeight - ((window.innerHeight - scaledHeight) / 2));
            //console.log(addThisPos);
            addthis.style.top = addThisPos + "px";

            var sidePanelButtons = document.getElementById("sidePanelButtons");
            //var buttonPos = 4;

            if(scaledHeight == pHeight) {
                buttonPos = Math.round((window.innerHeight - scaledHeight) / 2) + 4;
            } else {
                buttonPos = 4;
            }

            if(appmode) {
                if(buttonPos < menuBarHeight + 4) buttonPos = menuBarHeight + 4;
            }

            if(sideBarVisible) {
                sidePanelButtons.className = "animationTransition sideButtons-open";
            } else {
                sidePanelButtons.className = "animationTransition sideButtons-visible";
            }
            sidePanelButtons.style.top = buttonPos + "px";
        }
    };
    
    this.closeAddThis = function() {
        //console.log("closeAddthis");
        var addthis = document.getElementById("divAddthis");
        addthis.className = "addthis_toolbox addthis_floating_style addthis_32x32_style animationTransition addthis-hidden";
        
        var sidePanelButtons = document.getElementById("sidePanelButtons");
        if(sideBarVisible) {
            var buttonPos;// = 4;
            /*
            var buttonPos = Math.round((window.innerHeight - scaledHeight) / 2) + 4;
            if(buttonPos < menuBarHeight + 4) buttonPos = menuBarHeight + 4;
            */
            if(scaledHeight == pHeight) {
                buttonPos = Math.round((window.innerHeight - scaledHeight) / 2) + 4;
            } else {
                buttonPos = 4;
            }
            
            if(appmode) {
                if(buttonPos < menuBarHeight + 4) buttonPos = menuBarHeight + 4;
            }
            
            sidePanelButtons.style.top = buttonPos + "px";
            sidePanelButtons.className = "animationTransition sideButtons-open";
        } else {
            sidePanelButtons.className = "animationTransition sideButtons-hidden";
        }
    };
    
    this.openGallery = function(imageArray, nodots, noclosebtn) {
        if(imageArray.length > 1) {
            highlightArrows(true);
        } else {
            highlightArrows(false);
            var aL = document.getElementById("arrowLeft");
            var aLborder = document.getElementById("arrowLeftBorder");
            var aR = document.getElementById("arrowRight");
            var aRborder = document.getElementById("arrowRightBorder");
            aL.style.visibility = aLborder.style.visibility = aR.style.visibility = aRborder.style.visibility = "hidden";
        }
        overlayVisible = true;
        overlayObj = digiGallery;
        digiGallery.open(imageArray, nodots, noclosebtn);
        if(!noclosebtn) {
            this.showCloseButton(this.closeGallery);
        }
        this.openMenu(true);
    };
    
    this.closeGallery = function() {
        highlightArrows(false);
        overlayVisible = false;
        viewportVisible = true;
        digiGallery.close();
        digipage.hideCloseButton();
        digipage.closeMenu();
    };
    
    
    this.isDoublePage = function() {
        return doublePage;
    }
    
    this.setDoublePage = function(isDblPage, fullRefresh) {
        if(isDblPage) {
            preloadPages = 3;
        } else {
            preloadPages = 2;
        }
        doublePage = isDblPage;
        allowDoublePage = isDblPage;
        if(fullRefresh) {
            checkLoaded();
            digipage.setupPages(digipageData.width, digipageData.height);
            digipage.resizePages(window.innerWidth, window.innerHeight, reloadOnResize);
        }
    }
    this.isRoomForMenu = function() {
        if(window.innerHeight - scaledHeight > menuBarHeight * 2) {
            keepMenuBarOpen = true;
        } else {
            keepMenuBarOpen = false;
        }
        return keepMenuBarOpen;
    };
  
    
    if(editmode) {
        this.edit_UpdateCurrentPage = function(pageData, fullUpdate) {
            if(pageData.subIndex > 0) {
                digipageData.pages[pageData.index].children[pageData.subIndex - 1] = pageData;
            } else {
                digipageData.pages[pageData.index] = pageData;
            }
            console.log("updating page: " + pageData.index + "=" + pageData.subIndex);
            vDynamicPages[pageData.index][pageData.subIndex].updateContent(pageData.content);
            if(fullUpdate) {
                if(!doublePage && digipageData.type == 1) {
                    allowDoublePage = true;
                    doublePage = true;
                    checkLoaded();
                } else if(doublePage && digipageData.type == 0) {
                    allowDoublePage = false;
                    doublePage = false;
                    checkLoaded();
                }
                vPageArray[pageData.index][pageData.subIndex].updateContent();
                vDynamicPages[pageData.index][pageData.subIndex].reloadScript();
                vDynamicPages[pageData.index][pageData.subIndex].restart();
            }
            /*
            if(cPageV[cPage] > 0) {
                digipageData.pages[cPage].children[cPageV[cPage] - 1] = pageData;
            } else {
                digipageData.pages[cPage] = pageData;
            }
            vDynamicPages[cPage][cPageV[cPage]].updateContent(pageData.content);
            if(fullUpdate) {
                if(!doublePage && digipageData.type == 1) {
                    allowDoublePage = true;
                    doublePage = true;
                    checkLoaded();
                } else if(doublePage && digipageData.type == 0) {
                    allowDoublePage = false;
                    doublePage = false;
                    checkLoaded();
                }
                vPageArray[cPage][cPageV[cPage]].updateContent();
                vDynamicPages[cPage][cPageV[cPage]].reloadScript();
                vDynamicPages[cPage][cPageV[cPage]].restart();
            }
            */
        };
        
        this.edit_InsertPage = function(idx, sIdx, pg) {
           if(sIdx == 0) {
                numPages++;
                digipageData.pages.splice(idx, 0, pg);
                cPageV.splice(idx, 0, 0);
                vPageArray.splice(idx, 0, null);
                vPageZoom.splice(idx, 0, null);
                vDynamicPages.splice(idx, 0, null);
            } else {
                if(!digipageData.pages[idx].children) digipageData.pages[idx].children = new Array();
                if(digipageData.pages[idx].children.length == 0) {
                    digipageData.pages[idx].children[0] = pg;
                } else {
                    digipageData.pages[idx].children.splice(sIdx - 1, 0, pg);
                }
                //cPageV[idx] = sIdx;
                var vPage = new v3imagePage(idx, sIdx, pWidth, pHeight);
                var vdPage = new v3dynamicPage(idx, sIdx, pg.content, pWidth, pHeight);
                vPageArray[idx].splice(sIdx, 0, vPage);
                if(vPageZoom[idx]) vPageZoom[idx].splice(sIdx, 0, null);
                vDynamicPages[idx].splice(sIdx, 0, vdPage);
                
                pages.appendChild(vPage.getElement());
                pages.appendChild(vdPage.getElement());
            }
            buildPageDots();
            checkLoaded();
        };
        
        this.edit_RemovePage = function(idx, sIdx) {
           if(sIdx == 0) {
                var removedChild = false;
                if(digipageData.pages[idx].children) {
                    if(digipageData.pages[idx].children.length > 0) {
                        removedChild = true;
                        var newChildren = digipageData.pages[idx].children.slice(0);
                        newChildren.splice(0, 1);
                        digipageData.pages[idx] = digipageData.pages[idx].children[0];
                        digipageData.pages[idx].children = newChildren;
                        
                        //cPageV[idx]--;
                        pages.removeChild(vPageArray[idx][0].getElement());
                        pages.removeChild(vDynamicPages[idx][0].getElement());
                        if(vPageZoom[idx]) {
                            if(vPageZoom[idx][0]) {
                                pages.removeChild(vPageZoom[idx][0].getElement());
                                vPageZoom[idx].splice(0, 1);
                            }
                        }
                        vPageArray[idx].splice(0, 1);
                        vDynamicPages[idx].splice(0, 1);
                    }
                }
                if(!removedChild) {
                    //console.log("Removing - " + numPages);
                    //console.log("pages - " + digipageData.pages.length);
                    numPages--;
                    //console.log("Removing - " + numPages);
                    digipageData.pages.splice(idx, 1);
                    //console.log("pages - " + digipageData.pages.length);
                    
                    cPageV.splice(idx, 1);
                    pages.removeChild(vPageArray[idx][0].getElement());
                    pages.removeChild(vDynamicPages[idx][0].getElement());
                    if(vPageZoom[idx]) {
                        if(vPageZoom[idx][0]) {
                            pages.removeChild(vPageZoom[idx][0].getElement());
                            vPageZoom.splice(idx, 1);
                        }
                    }
                    vPageArray.splice(idx, 1);
                    vDynamicPages.splice(idx, 1);
                }
            } else {
                if(digipageData.pages[idx].children.length > 0) {
                    console.log("removing " + idx + ", " + sIdx);
                    //var newChildren = digipageData.pages[idx].children.slice(0);
                    //newChildren.splice(0, 1);
                    //digipageData.pages[idx] = digipageData.pages[idx].children[0];
                    //digipageData.pages[idx].children = newChildren;
                    digipageData.pages[idx].children.splice(sIdx - 1, 1);

                    if(digipageData.pages[idx].children.length < cPageV[idx]) {
                        cPageV[idx]--;
                    }
                    
                    pages.removeChild(vPageArray[idx][sIdx].getElement());
                    pages.removeChild(vDynamicPages[idx][sIdx].getElement());
                    if(vPageZoom[idx]) {
                        if(vPageZoom[idx][sIdx]) {
                            pages.removeChild(vPageZoom[idx][sIdx].getElement());
                            vPageZoom[idx].splice(sIdx, 1);
                        }
                    }
                    vPageArray[idx].splice(sIdx, 1);
                    vDynamicPages[idx].splice(sIdx, 1);
                }
            }
            checkLoaded();
        };
        
    }
       
    this.resizePages = function(windowWidth, windowHeight, forceReload) {
        // there are two potential ways to resize the pages. We can either make
        // them fit to a maximum size we decided at load, or we can try to
        // resize the pages and force them to reload. A forced reload will look
        // neater, but could cause a lot more traffic/higher rate of loading errors.
        if(allowDoublePage) {
            if (windowWidth > windowHeight) {
                if(!doublePage) {
                    //console.log("doublePage being set to true " + cPage);
                    cPage = (Math.floor((cPage - 1) / 2) * 2) + 1;
                    //console.log(cPage);
                }
                doublePage = true;
            } else {
                doublePage = false;
            }
        }
        
        var yReduction = 0;
        if(sideBarVisible) {
            windowWidth = Math.round(windowWidth - 260);
            yReduction = (document.getElementById("digiMenuBar").offsetHeight + 2) * 2;
            console.log("sideBarVisible - " + yReduction);
            windowHeight -= yReduction;
        }
        
        //console.log("resize. pageResizeMethod = " + pageResizeMethod + ", forceReload: " + forceReload);
        
        if(forceReload && pageResizeMethod == 0) {
            //console.log("pageResizeMethod = " + pageResizeMethod);
            //doublePage = false;
            pWidth = windowWidth - leftMargin - rightMargin;
            pHeight = Math.round((digipageData.height / digipageData.width) * pWidth);
            if(pHeight > windowHeight - topMargin - bottomMargin) {
                pHeight = windowHeight - topMargin - bottomMargin;
                pWidth = Math.round((digipageData.width / digipageData.height) * pHeight);
            }
            for(var i = 0; i < vPageArray.length; i++) {
                for(var v = 0; v < vPageArray[i].length; v++) {
                    if(vPageArray[i][v]) {
                        vPageArray[i][v].setPageSize(pWidth, pHeight);
                    }
                    if(vDynamicPages[i][v]) {
                        vDynamicPages[i][v].setPageSize(pWidth, pHeight);
                    }
                }
            }
            scaledWidth = pWidth;
            scaledHeight = pHeight;
            
            //digiContents.setSize(pWidth, pHeight);
            
            var digiMenuBarTable = document.getElementById("digiMenuBar-table");
            digiMenuBarTable.style.width = pWidth + "px";
            
            var buttonHolder = document.getElementById("digiMenuBar-ButtonHolder");
            buttonHolder.style.width = pWidth + "px";
            buttonHolder.style.left = Math.round((window.innerWidth - pWidth) / 2) + "px";
            
            var rect1 = digiMenuBarCenterLogo.getBoundingClientRect();
            var rect2 = digiMenuBarTitle.getBoundingClientRect();
        
            var overlap = !(rect1.right < rect2.left || 
                            rect1.left > rect2.right || 
                            rect1.bottom < rect2.top || 
                            rect1.top > rect2.bottom)
            if(overlap) {
                document.getElementById("digiMenuBarCenterDiv").className = "standardTransition hidden";
            } else {
                document.getElementById("digiMenuBarCenterDiv").className = "standardTransition";
            }

            
            /*
            if(window.innerHeight - pHeight > menuBarHeight * 2) {
                keepMenuBarOpen = true;
                digipage.openMenu();
            } else {
                keepMenuBarOpen = false;
                digipage.closeMenu();
            }
            */
        } else {
            //var pageScale;
            var pageScale2;

            //doublePage = false;
            if(doublePage) {
                pageScale = (windowWidth - leftMargin - rightMargin) / (pWidth * 2);
            } else {
                pageScale = (windowWidth - leftMargin - rightMargin) / pWidth;
            }
            pageScale2 = (windowHeight - topMargin - bottomMargin) / pHeight;
            if(pageScale2 < pageScale) pageScale = pageScale2;
            if(digipageData.scalemode !== 1) {
                if(pageScale > 1) pageScale = 1;
            }
            
            var translateStr = "";
            if(yReduction > 0) {
                translateStr = " translateY(" + Math.round(yReduction / 4) + "px)";
            }
            pageElements.pages.style.Transform = pageElements.pages.style.MozTransform = pageElements.pages.style.OTransform = pageElements.pages.style.msTransform = pageElements.pages.style.WebkitTransform = "scale(" + pageScale + "," + pageScale + ")" + translateStr;

            //digiContents.setSize(pWidth * pageScale, pHeight * pageScale);
            
            var digiMenuBarTable = document.getElementById("digiMenuBar-table");
            digiMenuBarTable.style.width = Math.round(pWidth * pageScale) + "px";
            
            var buttonHolder = document.getElementById("digiMenuBar-ButtonHolder");
            buttonHolder.style.width = Math.round(pWidth * pageScale) + "px";
            buttonHolder.style.left = Math.round((window.innerWidth - (pWidth * pageScale)) / 2) + "px";
            
            var digiMenuBarCenterLogo = document.getElementById("digiMenuBarCenterLogo");
            var digiMenuBarTitle = document.getElementById("digiMenuBar-title");
            var rect1 = digiMenuBarCenterLogo.getBoundingClientRect();
            var rect2 = digiMenuBarTitle.getBoundingClientRect();
        
            var overlap = !(rect1.right < rect2.left || 
                            rect1.left > rect2.right || 
                            rect1.bottom < rect2.top || 
                            rect1.top > rect2.bottom)
            if(overlap) {
                document.getElementById("digiMenuBarCenterDiv").className = "standardTransition hidden";
            } else {
                document.getElementById("digiMenuBarCenterDiv").className = "standardTransition";
            }
            
            scaledWidth = pWidth * pageScale;
            scaledHeight = pHeight * pageScale;
            /*
            if(window.innerHeight - (pHeight * pageScale) > menuBarHeight * 2) {
                keepMenuBarOpen = true;
                digipage.openMenu();
            } else {
                keepMenuBarOpen = false;
                digipage.closeMenu();
            }
            */

            if(forceReload && pageResizeMethod == 1) {
                for(var i = 0; i < vPageArray.length; i++) {
                    for(var v = 0; v < vPageArray[i].length; v++) {
                        if(vPageArray[i][v]) {
                            vPageArray[i][v].setPageSize2(pWidth, pHeight);
                        }
                    }
                }
            }
        }
        
        if(digipage.isRoomForMenu()) {
            digipage.openMenu();
        } else {
            digipage.closeMenu();
        }
        
        
        this.gotoPage(cPage, true);
        setZoomPositions();
        setMenuBarButtons();
        digipage.checkAddThis();
        digipage.checkPageDots();
        //checkLoaded();
        
        //var instructions = document.getElementById("digiInstructions");
        //instructions.style.width = scaledWidth;
        //instructions.style.height = scaledHeight;
        //instructions.style.marginLeft = -Math.round(scaledWidth / 2);
        //instructions.style.marginTop = -Math.round(scaledHeight / 2);
        if(digipageData.options.showinstructions == true) {
            //var gestureSwipeLeft = document.getElementById("gesture-swipe-left");
            //gestureSwipeLeft.style.marginLeft = (Math.round(scaledWidth / 2) - 160) + "px";
            //gestureSwipeLeft.style.marginTop = (-Math.round(scaledHeight / 2) + 40) + "px";
            /*
            var gestureSwipeUp = document.getElementById("gesture-swipe-up");
            gestureSwipeUp.style.marginLeft = (Math.round(scaledWidth / 2) - 80) + "px";
            gestureSwipeUp.style.marginTop = (Math.round(scaledHeight / 2) - 150) + "px";
            */
        }
        
        //if(digipageData.options.collapseviewport) {
            //var viewport = document.getElementById("viewport");
            //viewport.style.width = scaledWidth + "px !important";
            //viewport.style.height = scaledHeight + "px";
            //viewport.style.left = Math.round((window.innerWidth - scaledWidth) / 2) + "px";
            //viewport.style.top = Math.round((window.innerHeight - scaledHeight) / 2) + "px";
        //}
    };
    
    this.showPageOverlay = function(overlayName) {
        console.log("show " + overlayName);
        var pageElement = vDynamicPages[cPage][cPageV[cPage]].getElement();
        var elements = pageElement.getElementsByTagName("div");
        for(var i = 0; i < elements.length; i++) {
            //console.log(elements[i].getAttribute("name"));
            if(elements[i].getAttribute("name") == overlayName) {
                var overlay = elements[i];
                overlay.className = "standardTransition contentOverlay visible";
                if(!overlay.onclick) {
                    overlay.onclick = function() { digipage.hidePageOverlay(overlayName); };
                }
                var vidElements = overlay.getElementsByTagName("video");
                for(var v = 0; v < vidElements.length; v++) {
                    vidElements[v].onclick = function(evt) {
                        evt.stopPropagation();
                        //console.log("video clicked");
                    };
                }
            }
        }
    };
    
    this.hidePageOverlay = function(overlayName) {
        console.log("hide " + overlayName);
        var pageElement = vDynamicPages[cPage][cPageV[cPage]].getElement();
        var elements = pageElement.getElementsByTagName("div");
        for(var i = 0; i < elements.length; i++) {
            //console.log(elements[i].getAttribute("name"));
            if(elements[i].getAttribute("name") == overlayName) {
                var overlay = elements[i];
                overlay.className = "standardTransition contentOverlay hidden noclick";
                var vidElements = overlay.getElementsByTagName("video");
                for(var v = 0; v < vidElements.length; v++) {
                    vidElements[v].pause();
                }
            }
        }
    };
    
    this.playPageVideo = function(videoName) {
        //console.log("play " + videoName);
        if(cPage) {
            if(vDynamicPages) {
                if(vDynamicPages[cPage]) {
                    var pageElement = vDynamicPages[cPage][cPageV[cPage]].getElement();
                    var elements = pageElement.getElementsByTagName("video");
                    for(var i = 0; i < elements.length; i++) {
                        //console.log(elements[i].getAttribute("name"));
                        if(elements[i].getAttribute("name") == videoName) {
                            var video = elements[i];
                            video.play();
                            
                            var videoObj = {
                                idx: cPage,
                                sIdx: cPageV[cPage],
                                videoName: videoName
                            };
                            
                            digipage.sendTracking("VIDE", videoObj);
                        }
                    }
                }
            }
        }   
    };
    
    this.stopPageVideo = function(videoName) {
        //console.log("stop " + videoName);
        if(cPage) {
            if(vDynamicPages) {
                if(vDynamicPages[cPage]) {
                    var pageElement = vDynamicPages[cPage][cPageV[cPage]].getElement();
                    var elements = pageElement.getElementsByTagName("video");
                    for(var i = 0; i < elements.length; i++) {
                        //console.log(elements[i].getAttribute("name"));
                        if(elements[i].getAttribute("name") == videoName) {
                            var video = elements[i];
                            video.pause();
                        }
                    }
                }
            }
        }
    };
    
    this.stopCurrentPage = function() {
        if(cPage) {
            if(vDynamicPages) {
                if(vDynamicPages[cPage]) {
                    if(vDynamicPages[cPage][cPageV[cPage]]) {
                        var pageElement = vDynamicPages[cPage][cPageV[cPage]].getElement();
                        var elements = pageElement.getElementsByTagName("video");
                        for(var i = 0; i < elements.length; i++) {
                            //console.log(elements[i].getAttribute("name"));
                            //if(elements[i].getAttribute("name") == videoName) {
                            var video = elements[i];
                            video.pause();
                            //}
                        }
                    }
                }
            }
        }
    };
  }

var digipage = new digi();
//init();
if(!!document.createElement('canvas').getContext && document.addEventListener) {
    loadJSON();
    //loadFolder();
} else {
    var ibrowser = document.getElementById("incompatibleBrowser");
    ibrowser.style.visibility = "visible";
    ibrowser.className = "visible";
    ibrowser.style.backgroundImage = "url(images/digipage-not-compatible.png)";
}


window.onresize = function() {
    zoomOut();
    digipage.resizePages(window.innerWidth, window.innerHeight, reloadOnResize);
    
    if(overlayVisible) {
        overlayObj.onresize();
    }
    //digipage.setupPages(window.innerWidth, window.innerHeight);
};
    //console.log("onresize");
//}


function showViewport() {
    viewportVisible = true;
    var viewport = document.getElementById("viewport");
    viewport.className = "visible";    
    var logo = document.getElementById("logo");
    logo.className = "hidden";
    var loader = document.getElementById("loader");
    loader.className = "hidden";
}

function hideViewport() {
    viewportVisible = false;
    var viewport = document.getElementById("viewport");
    viewport.className = "hidden noclick";
    var logo = document.getElementById("logo");
    logo.className = "visible";
}

function moveViewport() {
    //console.log("moveViewport");
    var viewport = document.getElementById("viewport");
    viewport.className = "viewportAnimate";
    //console.log(viewport.style.TransformOrigin);
    viewport.style.TransformOrigin = viewport.style.MozTransformOrigin = viewport.style.OTransformOrigin = viewport.style.msTransformOrigin = viewport.style.WebkitTransformOrigin = "";
    //viewport.style.width = "120%";
    //viewport.style.left = "-10%";
    setTimeout(function () {
        viewport.className = "viewportAnimate viewportMove";
    }, 1);
}

function resetViewport() {
    //console.log("moveViewport");
    var viewport = document.getElementById("viewport");
    viewport.className = "viewportAnimate visible";
    //console.log(viewport.style.TransformOrigin);
    viewport.style.TransformOrigin = viewport.style.MozTransformOrigin = viewport.style.OTransformOrigin = viewport.style.msTransformOrigin = viewport.style.WebkitTransformOrigin = "";
    viewport.style.width = "";
    viewport.style.left = "";
    setTimeout(function () {
        if(!contentsVisible) {
            viewport.className = "visible";
        }
    }, 750);
}

function tryOpenMenu(event) {
    //console.log("tryOpenMenu");
    //console.log(event.target);
    //console.log(event.target.onclick);
    
    var groupSelector = document.getElementById("groupSelector");
    groupSelector.style.visibility = "hidden";
    groupSelector.style.display = "none";

    var shouldOpen = false;
    if(event.target == document.getElementById("viewport")) shouldOpen = true;
    if(event.target.onclick == null) shouldOpen = true;
    if(event.target.getAttribute("showMenuBar") == "false") shouldOpen = false;
    //console.log(event.target);
    //console.log(event.target.getAttribute("showMenuBar"));
    // this should only be fired from a mouse click/touch
    if(mouse.sx === mouse.ux && mouse.sy === mouse.uy && shouldOpen) {
        if(menuBarVisible) {
            //digipage.closeMenu();
            digipage.checkAddThis();
        } else {
            //digipage.openMenu();
            digipage.openAddThis();
        }
    }
}

document.getElementById("viewport").onclick = tryOpenMenu;
