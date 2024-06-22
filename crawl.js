export const normalizeURL = (url) => {
    const urlObj = new URL(url);
    let endUrl = `${urlObj.host}${urlObj.pathname}`;
   
    if (endUrl[endUrl.length-1] === "/") {
        endUrl = endUrl.slice(0, -1);
    }
    return endUrl;
}

