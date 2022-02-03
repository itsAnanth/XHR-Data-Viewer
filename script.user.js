// ==UserScript==
// @name         XHR Data Viewer
// @namespace    https://github.com/itsAnanth/XHR-Data-Viewer/
// @version      0.1.2
// @description  View request and response sent from a website using xhr
// @author       itsAnanth
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

XMLHttpRequest = new Proxy(XMLHttpRequest, {
    construct(target, _) {
        let xhr = window.xhrHook = new target(),
            _open = xhr.open,
            _send = xhr.send;
        xhr.open = function (method, url, async) {
            console.log(`[xhr hook] [${method}] to ${url} (async ${async})`);
            _open.apply(this, arguments);
        }

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
                console.log(`[xhr hook] Incoming -> ${this.responseText}`);
        };

        xhr.send = function (...args) {
            console.log(`[xhr hook] Outgoing -> ${args}`);
            _send.apply(this, arguments);
        }
        return xhr;
    }
})
