
class LeuFormatter extends HTMLElement {

    connectedCallback() {
        console.log("load");
        for(let select in LeuFormatter.config) {
            console.log (select);
             for(let e of this.querySelectorAll(select)) {
                 let classes = LeuFormatter.config[select];
                 for( let cls of classes)
                    e.classList.add(cls)
             }
        }

        let lastContainer = null;
        let i = 0;
        main: do {
            if (this.children.length < i + 1)
                break;
            let e = this.children[i];

            console.log("log", e);
            let container = e.querySelector("[container]")
            if (container !== null) {
                lastContainer = container;
                i++;
                continue;
            }
            if (lastContainer === null) {
                i++;
                continue;
            }
            console.log("move", e);
            lastContainer.append(e);


        } while(true)

    }
}



LeuFormatter.config = {
    "h1": ["fs-2", "text-center", "content-space-2"],
    "h2": ["fs-3", ],
    "hr": ["clearboth"],
    "img": ["float-start", "w-lg-50", "w-100", "pt-2", "pb-2", "pe-4"]
}
customElements.define("leu-formatter", LeuFormatter);


function leuIsMobileDevice() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

for(let e of document.querySelectorAll("[leu-if]")) {
    if (KaToolsV1.eval(e.getAttribute("leu-if"), {}, e) != true) {
        e.setAttribute("hidden", "hidden");
    } else {
        e.removeAttribute("hidden");
    }
}


function leu_translate(text) {
    if (typeof document.translations[text] === "undefined" || document.translations[text] === null)
        return text;
    let trans = document.translations[text][document.lang];
    if (typeof trans !== "undefined" && trans != '') {
        return trans;
    }
    return text;
}

for(let e of document.querySelectorAll("[leu-translate]")) {
    let content = e.innerHTML;
    for (let key in document.translations) {
        let trans = document.translations[key][document.lang];
        if (typeof trans !== "undefined" && trans != '') {
            content = content.replaceAll(key, trans);
        }
    }
    e.innerHTML = content;
}
