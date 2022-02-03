XMLHttpRequest = new Proxy(XMLHttpRequest, {
    construct(target, _) {
        let xhr = window.xhrHook = new target(),
            _open = xhr.open,
            _send = xhr.send;
        xhr.open = function (method, url, async) {
            console.log(`[${method}] to ${url} (async ${async})`);
            _open.apply(this, arguments);
        }

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
                console.log(`Incoming -> ${this.responseText}`);
        };

        xhr.send = function (...args) {
            console.log(`Outgoing -> ${args}`);
            _send.apply(this, arguments);
        }
        return xhr;
    }
})
