const prompts = require('prompts');

const menuItems = [
    { title: '\x1b[38;5;208mPORTUGUÊS (BR)\x1b[38;5;208m', value: 'portugues' },
    { title: '\x1b[38;5;208mENGLISH (US)\x1b[38;5;208m', value: 'english' },
    { title: '\x1b[38;5;208mEXIT / SAIR\x1b[38;5;208m', value: 'exit' }
];

function displayAsciiArt() {
    console.log("\x1b[38;5;208m█████████████████████████████████████████████████████████████████████");
    console.log("\x1b[38;5;208m██                                                                 ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                                                                 ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                               ██████                            ██");
    console.log("\x1b[38;5;208m██                                                                 ██");
    console.log("\x1b[38;5;208m█████████████████████████████████████████████████████████████████████");
    console.log("");
    console.log("\x1b[38;5;208m===========================================================================");
    console.log("\x1b[38;5;208m[LANGUAGE SELECTION] / [SELEÇÃO DE IDIOMA]");
    console.log("\x1b[38;5;208m===========================================================================");
}

async function main() {
    console.clear();
    displayAsciiArt();

    const response = await prompts({
        type: 'select',
        name: 'language',
        message: '\x1b[38;5;208mSelect your language:\x1b[38;5;208m',
        choices: menuItems
    });

    console.clear();

    if (response.language === 'portugues') {
        console.log("===========================================================================");
        console.log("Idioma selecionado: Português");
        console.log("===========================================================================");
        // Requer o arquivo do menu em Português
        require('./menuBR.js'); 
    } else if (response.language === 'english') {
        console.log("===========================================================================");
        console.log("Language selected: English");
        console.log("==========================================================================="); 
        // Requer o arquivo do menu em Inglês
        require('./menuEN.js');
    } else if (response.language === 'exit') {
        console.log("===========================================================================");
        console.log("[EXITING] / [SAINDO]");
        console.log("===========================================================================");
        process.exit(0);
    }
}

main().catch(console.error);