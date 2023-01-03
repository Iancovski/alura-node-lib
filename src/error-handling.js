import chalk from 'chalk';

export function fileReadingError(error) {
    throw new Error(chalk.red('Erro na leitura do arquivo: \n', error.message));
}

export function statSyncError(error) {
    throw new Error(chalk.red(getErrorMessage(error)));
}

export function fetchError(error) {
    return getErrorMessage(error);
}

function getErrorMessage(error) {
    if (error.code === 'ENOENT') {
        return 'Arquivo ou diretório inválido.';
    } else if (error.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado.';   
    } else { 
        return error.message;
    }
}