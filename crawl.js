import { JSDOM } from 'jsdom'
export const normalizeURL = (url) => {
    const urlObj = new URL(url);
    let endUrl = `${urlObj.host}${urlObj.pathname}`;

    if (endUrl[endUrl.length - 1] === "/") {
        endUrl = endUrl.slice(0, -1);
    }
    return endUrl;
}

export const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = []
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')

            try {
                // convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch (err) {
                console.log(`${err.message}: ${href}`)
            }
        }
    }
    return urls
}

export const crawlPage = async (url) => {

    try {
        const res = await fetch(url);
        if (res.status >= 400 && res.status < 500) {
            console.log("error: ", res.status);
            return;
        }
        const contentType = res.headers.get("Content-Type");
        if (!contentType || !contentType.includes("text/html")) {
            console.log("Content-Type error ", contentType);
            return;
        }
        console.log(await res.text());
    } catch (error) {
        console.log(error)

    }

}

