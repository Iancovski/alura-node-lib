import * as errorHandling from './error-handling.js';
import * as arrayHandling from './array-handling.js';

export default async function getLinkStatus(links) {
    const urlList = arrayHandling.getUrlList(links);

    const statusList = await Promise.all(
        urlList.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status
            } catch(error) {
                return errorHandling.fetchError(error);
            }
        })
    );

    const validatedLinks = arrayHandling.getValidatedList(links, statusList);

    return validatedLinks;
}