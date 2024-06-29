export const printReport = (pages) => {
    console.log("The report is starting");
    const sortedP = sortPages(pages);
    sortedP.forEach((p) => {
        const url = sortPages[0];
        const count = sortPages[1];
        console.log(`Found ${count} internal links to ${url}`);
    });
};

export function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => {
        if (pageB[1] === pageA[1]) {
            return pageA[0].localeCompare(pageB[0]);
        }
        return pageB[1] - pageA[1];
    });
    return pagesArr;
}
