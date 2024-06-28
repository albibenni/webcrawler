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

