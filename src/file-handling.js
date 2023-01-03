import fs from 'fs';
import * as errorHandling from './error-handling.js';


function extractLinks(text) {
    const regex = /\[([^\[\]]*?)\]\((http[^(\)]*?)\)/gm;
    const links = [...text.matchAll(regex)];
    const result = links.map(link => ({['nome']: link[1], ['url']: link[2]}));

    return result.length !== 0 ? result : 'Não foram encontrados links no arquivo.';
}

async function getLinksFromFile(path) {
    try {
        const encoding = 'utf-8';
        const file = await fs.promises.readFile(path, encoding);    
        return extractLinks(file);
    } catch (error) {
        errorHandling.fileReadingError(error);
    }      
}

export default getLinksFromFile;