export function getUrlList(links) {
    const urlList = links.map((link) => Object.values(link)[1]);
    return urlList;
}

export function getValidatedList(links, statusList) {
    const validatedList = links.map((object, index) => ({...object, status: statusList[index]}));
    return validatedList;
}