import chalk from 'chalk';
import fs from 'fs';
import getLinksFromFile from './file-handling.js';
import getLinkStatus from './http-validate.js';
import * as errorHandling from './error-handling.js';

const arg = process.argv;

export function validatePath(path) {
    try {
        fs.lstatSync(path);
    } catch (error) {
        errorHandling.statSyncError(error); 
    }
}

function printResult(links, fileName = '') {
    console.log(
        fileName !== '' ? chalk.black.bgGreen('Arquivo: ', fileName, '\n'): '', 
        chalk.green('Links:'), 
        links);
}

async function validateLinks(arg) {
    const path = arg[2];

    validatePath(path);

    if (fs.lstatSync(path).isFile()) {
        const links = await getLinksFromFile(path);
        const validatedLinks = await getLinkStatus(links);
        printResult(validatedLinks);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            const links = await getLinksFromFile(`${path}/${fileName}`); 
            const validatedLinks = await getLinkStatus(links);
            printResult(validatedLinks, fileName);
        })
    }
}

validateLinks(arg);