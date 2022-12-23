import fs from 'fs';
import chalk from 'chalk';

function extractLinks(text) {
    const regex = /\[([^\[\]]*?)\]\((http[^(\)]*?)\)/gm;
    const links = [...text.matchAll(regex)];

    return links.map(link => ({[link[1]]: link[2]}));
}

function throwError(error) {
    throw new Error(chalk.red('Erro na leitura do arquivo: \n', error.message));
}

async function getFileContent(path) {
    try {
        const encoding = 'utf-8';
        const file = await fs.promises.readFile(path, encoding);    
        console.log(extractLinks(file));
    } catch (error) {
        throwError(error);
    }      
}

export default getFileContent;