export const normalizeURL = (url) => {
    let endUrl = url.replace("https://", "");
    endUrl = endUrl.replace("http://", "");
    
    if (endUrl[endUrl.length-1] === "/") {
        endUrl = endUrl.slice(0, -1);
    }
    return endUrl;
}

