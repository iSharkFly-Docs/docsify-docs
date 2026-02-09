(function(window) {
    window.DocsifyAds = {
        create(caPub, slot) {
            return function(hook, vm) {
                hook.ready(function() {
                    window.DocsifyAds.injectCarbonStyle();
                });

                hook.doneEach(function() {
                    window.DocsifyAds.injectScript(caPub, slot);
                });
            };
        },

        injectScript(caPub, slot) {
            const adEl = document.querySelector("#adsense");
            const scriptID = "_adsense_js";
            const sidebarEl = document.querySelector(".sidebar-nav");


            if (!adEl && sidebarEl) {
                let scriptEl = document.querySelector(`#${scriptID}`);
                let scriptIns = document.querySelector(`#${scriptID}`);
                let scriptAdPush = document.querySelector(`#${scriptID}`);

                if (scriptEl) {
                    scriptEl = scriptEl.parentNode.removeChild(scriptEl);
                } else {
                    scriptEl = document.createElement("script");
                    scriptEl.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${caPub}`;
                    scriptEl.async = "async";
                    scriptEl.id = scriptID;
                    scriptEl.crossOrigin = "anonymous";

                    scriptIns = document.createElement("ins");
                    scriptIns.className = `adsbygoogle`;
                    scriptIns.style = 'display:inline-block;width:300px;height:150px';
                    scriptIns.setAttribute("data-ad-client", `${caPub}`);
                    scriptIns.setAttribute("data-ad-slot", `${slot}`);

                    scriptAdPush = document.createElement("script");
                    scriptAdPush.text = "(adsbygoogle = window.adsbygoogle || []).push({});";

                }

                sidebarEl.insertBefore(scriptEl, sidebarEl.firstChild);
                sidebarEl.insertBefore(scriptIns, sidebarEl.lastChild);
                sidebarEl.insertBefore(scriptAdPush, sidebarEl.lastChild);
            }


        },

        injectCarbonStyle() {
            const styleEl = document.createElement("style");

            styleEl.textContent = `
        #carbonads * {
          margin: initial;
          padding: initial;
        }

        #carbonads {
          max-width: 330px;
          background-color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
            sans-serif;
        }

        #carbonads ins {
          class="adsbygoogle";
     style="display:block";
     data-ad-client="ca-pub-4797644559430915";
     data-ad-slot="3324230529";
     data-ad-format="auto";
     data-full-width-responsive="true";
        }

        #carbonads a:hover {
          color: inherit;
        }

        #carbonads span {
          display: block;
          position: relative;
          overflow: hidden;
        }

        #carbonads .carbon-wrap {
          display: flex;
        }

        #carbonads .carbon-img img {
          display: block;
        }

        #carbonads .carbon-text {
          align-self: center;
          margin-bottom: 20px;
          padding: 8px 10px;
          font-size: 12px;
          line-height: 1.5;
          text-align: left;
        }

        #carbonads .carbon-poweredby {
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 6px 8px;
          border-top-left-radius: 3px;
          background-color: #f1f1f1;
          font-size: 8px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.5px;
          text-align: center;
          text-transform: uppercase;
        }
      `;

            document.head.insertBefore(styleEl, document.querySelector("head style, head link[rel*='stylesheet']"));
        },
    };
})(window);