import { JSDOM } from 'jsdom'

export const normalizedURL = (url) => {
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
 
async function fetchHTML(url) {
    let res
    try {
      res = await fetch(url)
    } catch (err) {
      throw new Error(`Got Network error: ${err.message}`)
    }
  
    if (res.status > 399) {
      throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
    }
  
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error(`Got non-HTML response: ${contentType}`)
    }
  
    return res.text()
  }

export const crawlPage = async (baseURL, currentUrl = baseURL, pages = {}) => {
    const currentUrlObj = new URL(currentUrl);
    const baseURLObj = new URL(baseURL);
    if (currentUrlObj.hostname !== baseURLObj.hostname) {
        return pages;
    }

    const normalizeURL = normalizedURL(currentUrl);

    if (pages[normalizeURL] > 0) {
        pages[normalizeURL]++;
        return pages;
    }

    pages[normalizeURL] = 1;
    let res = "";
    try {
        res = await fetchHTML(currentUrl);
    } catch (error) {
        console.log(error.message)
    }

    const nextURLs = getURLsFromHTML(res, baseURL);
    for (const nextUrl of nextURLs) {
        pages = await crawlPage(baseURL, nextUrl, pages);
    }
    return pages
}

