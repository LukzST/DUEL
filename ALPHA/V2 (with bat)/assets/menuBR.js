const readline = require('readline');
const { exec, execSync, spawn } = require('child_process');
const prompt = require('prompt-sync')();
const folderPath = '../Achievements';
const fs = require('fs');
const path = require('path');
const couaaant1a = fs.existsSync('../assets/ET.txt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let currentMenu = 'main';
let selectedIndex = 0;
let portugues = true; // Assume português como idioma padrão
let english = false;
let menu = true;

function centerText(text) {
    const terminalWidth = process.stdout.columns;
    const padding = Math.max(0, Math.floor((terminalWidth - text.length) / 2));
    console.log(' '.repeat(padding) + text);
}

function OpcaoInvalida() {
    console.clear();
    centerText("===========================================================================");
    centerText("[ERRO: OPÇÃO INVÁLIDA]");
    centerText("===========================================================================");
    centerText("[PRESSIONE QUALQUER TECLA PARA VOLTAR]");
    centerText("===========================================================================");
    process.stdin.once('data', () => {
        drawMenu(mainMenuItems);
    });
}

let skip11111 = false;
let lang1 = true; // Assume idioma selecionado como true para o menu BR
let config2 = false;
let FN = false;
let lang = 1; // 1 para português
let tocando = false;
const accountFilePath = '../Account/AccountInfo.txt';
const save_conquistas = '../Account/Achievementsavefile.bin';
let Login;
let overwrite = "S";
let skipaccount = false;
let check = false;
const conquistasExistem = fs.existsSync(save_conquistas);
const count = fs.readdirSync(folderPath).filter(f => f.endsWith('.bin')).length;
const finais = fs.readdirSync(folderPath).filter(f => f.endsWith('.bin'));
const contaExiste = fs.existsSync(accountFilePath);
let ET = false;

// Novos menus para opções de conta e trilha sonora
const accountOptionItems = [
    'Criar Conta',
    'Pular',
    'Voltar para as configurações'
];

const overwriteOptionItems = [
    'Sim',
    'Não'
];

const musicOptionItems = [
    'Sim',
    'Não'
];

async function showAccountMenu() {
    currentMenu = 'account';
    selectedIndex = 0;
    drawAccountMenu();
}

function drawAccountMenu() {
    console.clear();
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("██                                                               ██");
    centerText("██                           ██████                              ██");
    centerText("██                         ██████████                            ██");
    centerText("██                        ████████████                           ██");
    centerText("██                        ████████████                           ██");
    centerText("██                         ██████████                            ██");
    centerText("██                           ██████                              ██");
    centerText("██                          ████████                             ██");
    centerText("██                      ███████████████                          ██");
    centerText("██                      ███████████████                          ██");
    centerText("██                                                               ██");
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("");
    centerText("===========================================================================");
    centerText("[DESEJA CRIAR UMA CONTA LOCAL?]");
    centerText("===========================================================================");
    accountOptionItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}

async function showMusicMenu() {
    currentMenu = 'music';
    selectedIndex = 0;
    drawMusicMenu();
}

function drawMusicMenu() {
    console.clear();
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("██                                                               ██");
    centerText("██                              ███                              ██");
    centerText("██                              ███████                          ██");
    centerText("██                              ███   ███                        ██");
    centerText("██                              ███                              ██");
    centerText("██                              ███                              ██");
    centerText("██                         ████████                              ██");
    centerText("██                        █████████                              ██");
    centerText("██                         ████████                              ██");
    centerText("██                                                               ██");
    centerText("██                                                               ██");
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("");
    centerText("===========================================================================");
    centerText("[ATIVAR TRILHA SONORA]");
    centerText("===========================================================================");
    musicOptionItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}

async function handleAccountSelection() {
    if (selectedIndex === 0) { // Criar Conta
        if (fs.existsSync(accountFilePath)) {
            currentMenu = 'overwrite';
            selectedIndex = 0;
            drawOverwriteMenu();
        } else {
            await createAccount();
            settingsMenu();
        }
    } else if (selectedIndex === 1) { // Pular
        centerText("[CRIAÇÃO DE CONTA PULADA]");
        await pausarParaContinuar();
        settingsMenu();
    } else if (selectedIndex === 2) { // Voltar
        settingsMenu();
    }
}

async function handleOverwriteSelection() {
    if (selectedIndex === 0) { // Sim
        await createAccount();
        settingsMenu();
    } else { // Nao
        centerText("[CRIAÇÃO DE CONTA PULADA]");
        await pausarParaContinuar();
        settingsMenu();
    }
}

async function handleMusicSelection() {
    if (selectedIndex === 0) { // Sim
        if (tocando) {
            centerText("[A MÚSICA AINDA ESTÁ TOCANDO]");
            await pausarParaContinuar();
        } else {
            exec('start wscript ./Warning.vbs');
            centerText("[TRILHA SONORA INICIADA]");
            tocando = true;
            await pausarParaContinuar();
        }
        settingsMenu();
    } else { // Nao
        if (tocando) {
            exec('taskkill /IM vlc.exe /F');
            centerText("[MÚSICA PARADA]");
            tocando = false;
            await pausarParaContinuar();
        }
        settingsMenu();
    }
}

async function createAccount() {
    console.clear();
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("██                                                               ██");
    centerText("██                           ██████                              ██");
    centerText("██                         ██████████                            ██");
    centerText("██                        ████████████                           ██");
    centerText("██                        ████████████                           ██");
    centerText("██                         ██████████                            ██");
    centerText("██                           ██████                              ██");
    centerText("██                          ████████                             ██");
    centerText("██                      ███████████████                          ██");
    centerText("██                      ███████████████                          ██");
    centerText("██                                                               ██");
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("");
    centerText("===========================================================================");
    const Usuario = prompt("[NOME DE USUÁRIO]: ");
    const Senha = prompt("[SENHA]: ");
    centerText("===========================================================================");
    const conteudo = `[NOME]: ${Usuario}\r\n[SENHA]: ${Senha}\r\n[IDIOMA]: Português \r\n`;
    fs.writeFileSync(accountFilePath, conteudo, 'utf8');

    const hasEndings = fs.readdirSync(folderPath).filter(f => f.endsWith('.bin')).length > 0;
    if (hasEndings) {
        fs.writeFileSync(save_conquistas, finais.join('\r\n'), 'utf8');
        centerText("[SISTEMA]: Conta criada com sucesso! Seus finais estão salvos.");
    } else {
        centerText("[SISTEMA]: Conta criada com sucesso! Você não tem finais ainda.");
    }
    await pausarParaContinuar();
}

function drawOverwriteMenu() {
    console.clear();
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("██                                                               ██");
    centerText("██                           ██████                              ██");
    centerText("██                       █████   ██████                          ██");
    centerText("██                      ████        ██████                       ██");
    centerText("██                                 ██████                        ██");
    centerText("██                               ██████                          ██");
    centerText("██                             ██████                            ██");
    centerText("██                           ██████                              ██");
    centerText("██                                                               ██");
    centerText("██                           ██████                              ██");
    centerText("██                           ██████                              ██");
    centerText("██                                                               ██");
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("");
    centerText("===========================================================================");
    centerText("[EXISTE UM ARQUIVO DE SALVAMENTO, DESEJA SOBRESCREVE-LO?]");
    centerText("===========================================================================");
    overwriteOptionItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}

const mainMenuItems = [
    'INICIAR JOGO',
    'REINICIAR PROGRESSO',
    'CONQUISTAS',
    'CONFIGURAÇÕES',
    'CRÉDITOS',
    'SUPORTE',
    'SAIR'
];

const settingsMenuItems = [
    'Trilha Sonora',
    'Criação de Conta',
    'Restaurar Finais',
    'Incluir Easter Eggs',
    'Voltar ao menu principal'
];

const easterEggsMenuItems = [
    'Ativar Easter Eggs',
    'Desativar Easter Eggs',
    'Voltar ao menu de configurações'
];

const restoreMenuItems = [
    'Sim',
    'Não',
    'Verificar Pasta'
];

const supportMenuItems = [
    'Sim',
    'Não'
];

function drawMenu(menuItems) {
    console.clear();
    const logoLines = [
        "",
        "██████████    ████      ██  ████████████  ████              ███",
        "████      ██  ████      ██  ████          ████              ████",
        "████      ██  ████      ██  ████          ████              ████",
        "████      ██  ████      ██  ████          ████              ████",
        "████      ██  ████      ██  █████████     ████              ████",
        "████      ██  ████      ██  ████          ████              ████",
        "████      ██  ████      ██  ████          ████            ████████",
        "████      ██  ████      ██  ████          ████              ████",
        "██████████    ████████████  ████████████  ████████████      ████"
    ];

    const maxLineWidth = Math.max(...logoLines.map(line => line.length));
    const terminalWidth = process.stdout.columns;
    const padding = Math.max(0, Math.floor((terminalWidth - maxLineWidth) / 2));
    const paddedLogo = logoLines.map(line => ' '.repeat(padding) + line);
    paddedLogo.forEach(line => console.log(line));
    centerText(" ");
    centerText(" ");
    centerText(" ");

    menuItems.forEach((item, index) => {
        const itemPadding = Math.max(0, Math.floor((terminalWidth - item.length - 4) / 2));
        const centeredItem = ' '.repeat(itemPadding) + (index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
        console.log(centeredItem);
    });
    centerText('');
    centerText('Use as setas para cima/baixo para navegar, Enter para selecionar.');
}

function settingsMenu() {
    currentMenu = 'settings';
    selectedIndex = 0;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    drawSettingsMenu();
}

function drawSettingsMenu() {
    console.clear();
    centerText("===========================================================================");
    centerText("[CONFIGURAÇÕES]");
    centerText("===========================================================================");
    settingsMenuItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}

function easterEggsMenu() {
    currentMenu = 'easterEggs';
    selectedIndex = 0;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    drawEasterEggsMenu();
}

function drawEasterEggsMenu() {
    console.clear();
    centerText("===========================================================================");
    centerText("[EASTER EGGS]");
    centerText("===========================================================================");
    easterEggsMenuItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}

function restoreMenu() {
    currentMenu = 'restore';
    selectedIndex = 0;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    drawRestoreMenu();
}

function drawRestoreMenu() {
    console.clear();
    centerText("===========================================================================");
    centerText("[DESEJA RESTAURAR?]");
    centerText("===========================================================================");
    restoreMenuItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}

function supportMenu() {
    currentMenu = 'support';
    selectedIndex = 0;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    drawSupportMenu();
}

function drawSupportMenu() {
    console.clear();
    centerText("===========================================================================");
    centerText("[APOIE O JOGO]");
    centerText("===========================================================================");
    centerText("-> Se você quiser apoiar o desenvolvimento do jogo, você pode fazer uma doação,");
    centerText("qualquer valor é bem-vindo e ajuda muito com o desenvolvimento do jogo!");
    centerText("-> Você também pode deixar uma avaliação na página do jogo!");
    centerText("===========================================================================");
    centerText("-> Link para doação: https://sadberry.itch.io/duel");
    centerText("===========================================================================");
    centerText("[ABRIR?]");
    centerText("===========================================================================");
    supportMenuItems.forEach((item, index) => {
        centerText(index === selectedIndex ? `[> ${item} <]` : `  ${item}`);
    });
    centerText("===========================================================================");
}


async function pausarParaContinuar() {
    centerText("===========================================================================");
    centerText("[PRESSIONE QUALQUER TECLA PARA CONTINUAR]");
    centerText("===========================================================================");
    return new Promise(resolve => {
        process.stdin.once('data', () => {
            console.clear();
            resolve();
        });
    });
}

async function conquistas() {
    const count = fs.readdirSync(folderPath).filter(f => f.endsWith('.bin')).length;
    const finais = fs.readdirSync(folderPath).filter(f => f.endsWith('.bin'));
    console.clear();
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("██                                                               ██");
    centerText("██                              ██████                           ██");
    centerText("██                            ██      ██                         ██");
    centerText("██                          ██          ██                       ██");
    centerText("██                          ██          ██                       ██");
    centerText("██                            ██      ██                         ██");
    centerText("██                          ██  ██████                           ██");
    centerText("██                        ██                                     ██");
    centerText("██                      ██                                       ██");
    centerText("██                                                               ██");
    centerText("███████████████████████████████████████████████████████████████████");
    centerText("");
    centerText("===========================================================================");
    centerText("[VERIFICANDO PASTAS]");

    if (count > 0) {
        centerText("===========================================================================");
        centerText("[ARQUIVOS ENCONTRADOS]");
        centerText(finais);
        centerText("===========================================================================");
        centerText("-> Se você quiser manter esses finais, NÃO OS RESTAURE");
        await pausarParaContinuar();
    } else {
        centerText("===========================================================================");
        centerText("-> Nenhum arquivo de final encontrado!");
        await pausarParaContinuar();
    }
    drawMenu(mainMenuItems);
}

drawMenu(mainMenuItems);

let gameStarted = false;

process.stdin.on('data', async (chunk) => {
    if (!menu) return;

    const key = chunk.toString('hex');
    const menus = {
        'main': mainMenuItems,
        'settings': settingsMenuItems,
        'easterEggs': easterEggsMenuItems,
        'restore': restoreMenuItems,
        'support': supportMenuItems,
        'account': accountOptionItems,
        'overwrite': overwriteOptionItems,
        'music': musicOptionItems,
    };
    const menuItems = menus[currentMenu];

    if (key === '1b5b41') { // Seta para cima
        selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
        drawCurrentMenu();
    } else if (key === '1b5b42') { // Seta para baixo
        selectedIndex = (selectedIndex + 1) % menuItems.length;
        drawCurrentMenu();
    } else if (key === '0d') { // Enter
        await handleSelection();
    } else if (key === '03') { // Ctrl+C
        rl.close();
        process.exit();
    }
});

function getMenuItems() {
    switch (currentMenu) {
        case 'main': return mainMenuItems;
        case 'settings': return settingsMenuItems;
        case 'easterEggs': return easterEggsMenuItems;
        case 'restore': return restoreMenuItems;
        case 'support': return supportMenuItems;
        case 'account': return accountOptionItems;
        case 'overwrite': return overwriteOptionItems;
        case 'music': return musicOptionItems;
    }
}

function drawCurrentMenu() {
    switch (currentMenu) {
        case 'main': drawMenu(mainMenuItems); break;
        case 'settings': drawSettingsMenu(); break;
        case 'easterEggs': drawEasterEggsMenu(); break;
        case 'restore': drawRestoreMenu(); break;
        case 'support': drawSupportMenu(); break;
        case 'account': drawAccountMenu(); break;
        case 'overwrite': drawOverwriteMenu(); break;
        case 'music': drawMusicMenu(); break;
    }
}

async function handleSelection() {
    console.clear();
    switch (currentMenu) {
        case 'main':
            switch (selectedIndex) {
                case 0: // Iniciar Jogo
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    menu = false;
                    
                    require('./mainBR.js');
                    break;
                case 1: // Reiniciar Progresso
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    exec('start cmd.exe /c node eraseData.js', async (error) => {
                        if (error) {
                            centerText("===========================================================================");
                            console.error(`[ERRO: ARQUIVO FALHOU ${error.message}]`);
                        } else {
                            centerText("===========================================================================");
                            centerText('[PROGRESSO REINICIADO]');
                        }
                        centerText("===========================================================================");
                        centerText('[PRESSIONE [ENTER] PARA VOLTAR AO MENU]');
                        centerText("===========================================================================");
                        prompt('');
                        drawMenu(mainMenuItems);
                        process.stdin.setRawMode(true);
                        process.stdin.resume();
                    });
                    break;
                case 2: // Conquistas
                    await conquistas();
                    break;
                case 3: // Configurações
                    settingsMenu();
                    break;
                case 4: // Créditos
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    centerText("===========================================================================");
                    centerText("[CRÉDITOS]");
                    centerText("===========================================================================");
                    centerText("[NOSSA EQUIPE]");
                    centerText("===========================================================================");
                    centerText("-> Programação: Lucas Eduardo");
                    centerText("-> Testadores Beta: Lucas Eduardo");
                    centerText("-> Roteiro: Miguel Marconato");
                    centerText("-> Artes: Lucas Eduardo");
                    centerText("-> Música: Em breve");
                    centerText("===========================================================================");
                    centerText("-> OBRIGADO POR JOGAR NOSSO JOGO!");
                    centerText("===========================================================================");
                    centerText('[PRESSIONE [ENTER] PARA VOLTAR AO MENU]');
                    centerText("===========================================================================");
                    prompt('');
                    drawMenu(mainMenuItems);
                    process.stdin.setRawMode(true);
                    process.stdin.resume();
                    break;
                case 5: // Suporte
                    supportMenu();
                    break;
                case 6: // Sair
                    rl.close();
                    process.exit();
                    break;
            }
            break;
        case 'settings':
            switch (selectedIndex) {
                case 0: showMusicMenu(); break;
                case 1: showAccountMenu(); break;
                case 2: restoreMenu(); break;
                case 3: easterEggsMenu(); break;
                case 4: currentMenu = 'main'; selectedIndex = 3; drawMenu(mainMenuItems); break;
            }
            break;
        case 'easterEggs':
            switch (selectedIndex) {
                case 0: // Ativar
                    const ET1 = fs.existsSync('../assets/ET.txt');
                    if (ET1) {
                        centerText("[EASTER EGGS JÁ ESTÃO ATIVADOS]");
                    } else {
                        centerText("[EASTER EGGS ATIVADOS!]");
                        fs.writeFileSync('../assets/ET.txt', 'Easter Eggs Activated', 'utf8');
                    }
                    await pausarParaContinuar();
                    settingsMenu();
                    break;
                case 1: // Desativar
                    const ET2 = fs.existsSync('../assets/ET.txt');
                    if (!ET2) {
                        centerText("[EASTER EGGS JÁ ESTÃO DESATIVADOS]");
                    } else {
                        centerText("[EASTER EGGS DESATIVADOS!]");
                        fs.unlinkSync('../assets/ET.txt');
                    }
                    await pausarParaContinuar();
                    settingsMenu();
                    break;
                case 2: settingsMenu(); break;
            }
            break;
        case 'restore':
            const local_conta = save_conquistas;
            const count1 = fs.existsSync(local_conta);
            check = false;
            switch (selectedIndex) {
                case 0: // Sim
                    if (FN) {
                        centerText("[FINAIS JÁ RESTAURADOS]");
                        await pausarParaContinuar();
                    } else if (!count1) {
                        centerText("[ARQUIVO DE FINAIS NÃO ENCONTRADO]");
                        await pausarParaContinuar();
                    } else {
                        try {
                            const dados = fs.readFileSync(save_conquistas, 'utf8');
                            centerText("[FINAIS QUE SERÃO RESTAURADOS]");
                            centerText([dados]);
                            await pausarParaContinuar();
                            FN = true;
                            if (dados.includes('BAD_ENDING.bin')) fs.writeFileSync('../Achievements/BAD_ENDING.bin', 'a', 'utf8');
                            if (dados.includes('REAL_ENDING.bin')) fs.writeFileSync('../Achievements/REAL_ENDING.bin', 'a', 'utf8');
                            if (dados.includes('GOOD_ENDING.bin')) fs.writeFileSync('../Achievements/GOOD_ENDING.bin', 'a', 'utf8');
                            if (dados.includes('BAD_ENDING2.bin')) fs.writeFileSync('../Achievements/BAD_ENDING2.bin', 'a', 'utf8');
                            if (dados.includes('BAD_ENDING3.bin')) fs.writeFileSync('../Achievements/BAD_ENDING3.bin', 'a', 'utf8');
                            if (dados.includes('SECRET_ENDING.bin')) fs.writeFileSync('../Achievements/SECRET_ENDING.bin', 'a', 'utf8');
                            if (dados.includes('undefined')) {
                                centerText("[NENHUM FINAL DETECTADO]");
                                await pausarParaContinuar();
                            }
                        } catch (err) {
                            centerText('[ERRO]: Falha ao ler arquivos!');
                            await pausarParaContinuar();
                        }
                    }
                    settingsMenu();
                    break;
                case 1: // Não
                    centerText("[RESTAURAÇÃO CANCELADA]");
                    await pausarParaContinuar();
                    settingsMenu();
                    break;
                case 2: // Verificar Pasta
                    centerText("[VERIFICANDO PASTAS]");
                    if (finais.length > 0) {
                        centerText("[ARQUIVOS ENCONTRADOS]");
                        centerText(finais);
                        centerText("-> Se você quiser manter esses finais, NÃO OS RESTAURE");
                    } else {
                        centerText("[VOCÊ NÃO TEM FINAIS SALVOS]");
                    }
                    await pausarParaContinuar();
                    restoreMenu();
                    break;
            }
            break;
        case 'support':
            switch (selectedIndex) {
                case 0: // Sim
                    centerText("[ABRINDO LINK NO NAVEGADOR PADRÃO...]");
                    exec('start https://sadberry.itch.io/duel');
                    await pausarParaContinuar();
                    drawMenu(mainMenuItems);
                    currentMenu = 'main';
                    break;
                case 1: // Não
                    centerText("[OPÇÃO RECUSADA]");
                    await pausarParaContinuar();
                    drawMenu(mainMenuItems);
                    currentMenu = 'main';
                    break;
            }
            break;
        case 'account':
            await handleAccountSelection();
            break;
        case 'overwrite':
            await handleOverwriteSelection();
            break;
        case 'music':
            await handleMusicSelection();
            break;
    }
}


rl.on('close', () => {
    centerText("===========================================================================");
    centerText('[SAINDO DO JOGO]');
    centerText("===========================================================================");
});