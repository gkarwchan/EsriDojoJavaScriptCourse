define(["dojo/_base/declare", "dojo/dom-geometry", "dojo/dom", "dojo/topic", "dojo/_base/lang"],
    function (declare, domGeom, dom, topic, lang) {
        return declare (null, {
            clientHeight: null,
            isPortrait: null,
            isiPad: null,
            isiPhone: null,
            statusBarHeight: null,
            headerGeom: null,
            headerName: null,
            mapName: null,

            constructor: function (headerName, mapName) {
                this.headerName = headerName;
                this.mapName = mapName;
                this.isPortrait = window.matchMedia("(orientation: portrait)").matches;
                this.isiPad = navigator.userAgent.match(/iPad/i);
                this.isiPhone = navigator.userAgent.match(/iPhone/i);
                this.headerGeom = domGeom.position(dom.byId(this.headerName));
                this.statusBarHeight = 20;
                this.clientHeight = document.body.clientHeight;

                var supportsOrientationChange = "onorientationchange" in window,
                    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
                window.addEventListener(orientationEvent, lang.hitch(this, this.orientationChanged), false);
            },
            mapLoadHandler: function () {
                // check device type
                if (this.isiPhone) {
                    dom.byId(this.mapName).style.height = (this.clientHeight + this.statusBarHeight) + "px";
                }
                if (this.isiPad != null) {
                    this.adjustMapHeight();
                }
                topic.publish('dimension/changed');
            },
            adjustMapHeight: function () {
                dom.byId(this.mapName).style.height = (window.innerHeight - this.headerGeom.h) + "px";
            },
            hideAddressBar: function () {
            // Set a timeout...
                setTimeout(function () {
                    // Hide the address bar!
                    window.scrollTo(0, 1);}, 0);
            },
            orientationChanged: function () {
                 this.hideAddressBar();
                if (this.isiPhone != null) {
                    // iPhone
                    if (thi.isPortrait) {
                        // portrait ----> landscape mode
                        this.addjustMapHeight();
                        this.isPortrait = false;
                    } else {
                        // landscape ----> portrait mode
                        dom.byId(this.mapName).style.height = (window.innerHeight + this.statusBarHeight) + "px";
                        this.isPortrait = true;
                    }
                }
                else if (this.isiPad != null) {
                    // iPad

                    this.adjustMapHeight();
                }

                topic.publish('dimension/changed');

            }
        })
    });