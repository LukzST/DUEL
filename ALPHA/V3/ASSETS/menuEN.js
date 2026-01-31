const blessed = require('blessed');
process.env.COLORTERM = 'truecolor';
process.env.TERM = 'xterm-256color';
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

// --- CONFIGURAÇÕES INICIAIS ---
const CURRENT_VERSION = "V1.0";
const COLOR_DEFAULT = '#ff7300'; // Laranja Âmbar
const folderPath = path.join(__dirname, '../Achievements');
const accountFilePath = path.join(__dirname, '../Account/AccountInfo.txt');

// Garante que as pastas existam
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
if (!fs.existsSync(path.dirname(accountFilePath))) fs.mkdirSync(path.dirname(accountFilePath), { recursive: true });

const screen = blessed.screen({
    smartCSR: true,
    title: 'DUEL - OPERATOR TERMINAL',
    fullUnicode: true
});

// --- UI PRINCIPAL (MENU DE FUNDO) ---

const logoText = [
    "██████████    ████      ██  ████████████  ████        ",
    "████      ██  ████      ██  ████          ████        ",
    "████      ██  ████      ██  ████          ████        ",
    "████      ██  ████      ██  ████          ████        ",
    "████      ██  ████      ██  █████████     ████        ",
    "████      ██  ████      ██  ████          ████        ",
    "████      ██  ████      ██  ████          ████        ",
    "████      ██  ████      ██  ████          ████        ",
    "██████████    ████████████  ████████████  ████████████"
].join('\n');
const logoBox = blessed.box({
    parent: screen,
    top: 2,
    left: 'center',
    width: 54,
    height: 11,
    content: logoText,
    style: { fg: COLOR_DEFAULT }
});

const menuBox = blessed.box({
    parent: screen,
    top: 13,
    left: 'center',
    width: 45,
    height: 12,
    border: 'line',
    style: { border: { fg: 'black' } }
});

const mainList = blessed.list({
    parent: menuBox,
    top: 0,
    left: 'center',
    width: '90%',
    height: '95%',
    keys: true,
    items: [
        '{center}START GAME{/center}',
        '{center}ACHIEVEMENTS{/center}',
        '{center}SETTINGS{/center}',
        '{center}ACCOUNT{/center}',
        '{center}UPDATES{/center}',
        '{center}CREDITS{/center}',
        '{center}SUPPORT{/center}',
        '{center}CLOSE{/center}'
    ],
    tags: true,
    style: {
        selected: { bg: COLOR_DEFAULT, fg: 'black' },
        item: { fg: '#bbbbbb' }
    }
});

const descriptionBox = blessed.box({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    tags: true,
    content: '{center}SELECT AN OPTION AND PRESS ENTER{/center}',
    style: { fg: '#888888' }
});

// --- LÓGICA DE NAVEGAÇÃO E DESCRIÇÕES ---

const descriptions = {
    'START GAME': 'INITIATE THE PRIMARY COMBAT PROTOCOL.',
    'ACHIEVEMENTS': 'VIEW YOUR DATA RECORDS AND ENDINGS.',
    'UPDATES': 'SYNC SYSTEM WITH THE LATEST VERSION.',
    'ACCOUNT': 'MANAGE YOUR LOCAL OPERATOR PROFILE.',
    'SETTINGS': 'CONFIGURE INTERFACE AND AUDIO PARAMETERS.',
    'CREDITS': 'SEE THE ARCHITECTS BEHIND DUEL.',
    'SUPPORT': 'DONATE TO THE PROJECT ON ITCH.IO.',
    'CLOSE': 'TERMINATE TERMINAL SESSION SAFELY.'
};

mainList.on('select item', (item) => {
    const text = item.getText().replace(/{.*?}/g, '').trim();
    descriptionBox.setContent(`{center}${descriptions[text] || ''}{/center}`);
    screen.render();
});

// --- FUNÇÕES DAS JANELAS (POPUPS) ---

// 1. SETTINGS
function showSettings() {
    const bg = blessed.box({ parent: screen, width: '100%', height: '100%', bg: 'black', index: 100 });
    
    const settingsWin = blessed.list({
        parent: bg,
        top: 'center', left: 'center',
        width: 40, height: 10,
        border: 'line',
        label: ' [ SETTINGS ] ',
        keys: true,
        tags: true,
        items: [
            ' AUDIO: [ON]',
            ' GLITCH: [ON]',
            ' LANGUAGE: [EN]',
            ' BACK '
        ],
        style: { border: { fg: COLOR_DEFAULT }, selected: { bg: COLOR_DEFAULT, fg: 'black' } }
    });

    settingsWin.focus();
    screen.render();

    settingsWin.on('select', (item) => {
        if (item.getText().includes('BACK')) {
            bg.destroy();
            mainList.focus();
            screen.render();
        }
    });
}

// 2. ACHIEVEMENTS (Lê arquivos da pasta folderPath)
function showAchievements() {
    const bg = blessed.box({ parent: screen, width: '100%', height: '100%', bg: 'black', index: 100 });
    
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.bin'));
    const content = files.length > 0 
        ? files.map(f => `{green-fg}[X]{/} ${f.replace('.bin', '')}`).join('\n')
        : '{red-fg}NO DATA FOUND{/}';

    const achWin = blessed.box({
        parent: bg,
        top: 'center', left: 'center',
        width: 60, height: 15,
        border: 'line',
        label: ' [ DATA ARCHIVE ] ',
        tags: true,
        content: `{center}\n${content}\n\n{grey-fg}[ESC] RETURN{/center}`,
        style: { border: { fg: COLOR_DEFAULT } }
    });

    screen.render();
    
    screen.onceKey(['escape'], () => {
        bg.destroy();
        mainList.focus();
        screen.render();
    });
}

// 3. ACCOUNT (Lê Info do Arquivo)
function showAccount() {
    const bg = blessed.box({ parent: screen, width: '100%', height: '100%', bg: 'black', index: 100 });
    
    let accInfo = "GUEST";
    if (fs.existsSync(accountFilePath)) {
        accInfo = fs.readFileSync(accountFilePath, 'utf8').split('\n')[0].replace('[NAME]:', '').trim();
    }

    const accWin = blessed.box({
        parent: bg,
        top: 'center', left: 'center',
        width: 50, height: 10,
        border: 'line',
        label: ' [ ACCOUNT STATUS ] ',
        tags: true,
        content: `{center}\n\nOPERATOR ID: {bold}${accInfo}{/}\nSTATUS: {green-fg}ONLINE{/}\n\n{grey-fg}[ESC] TO RETURN{/center}`,
        style: { border: { fg: COLOR_DEFAULT } }
    });

    screen.render();
    
    screen.onceKey(['escape'], () => {
        bg.destroy();
        mainList.focus();
        screen.render();
    });
}

// 4. UPDATES (Animação de Barra)
function showUpdates() {
    const bg = blessed.box({ parent: screen, width: '100%', height: '100%', bg: 'black', index: 100 });
    
    const upWin = blessed.box({
        parent: bg,
        top: 'center', left: 'center',
        width: 50, height: 10,
        border: 'line',
        label: ' [ SYSTEM UPDATE ] ',
        tags: true,
        content: '{center}\nConnecting to repository...\n\n[░░░░░░░░░░░░░░░░░░░░] 0%{/center}',
        style: { border: { fg: COLOR_DEFAULT } }
    });

    screen.render();

    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        const barLength = progress / 5;
        const bar = "█".repeat(barLength) + "░".repeat(20 - barLength);
        
        upWin.setContent(`{center}\nDownloading packages...\n\n[${bar}] ${progress}%\n\n{grey-fg}PLEASE WAIT...{/center}`);
        screen.render();

        if (progress >= 100) {
            clearInterval(interval);
            upWin.setContent(`{center}\n{green-fg}SYSTEM IS UP TO DATE{/}\n\nVersion: ${CURRENT_VERSION}\n\n{white-fg}PRESS [ESC] TO RETURN{/center}`);
            screen.render();
        }
    }, 200);

    screen.onceKey(['escape'], () => {
        clearInterval(interval);
        bg.destroy();
        mainList.focus();
        screen.render();
    });
}

// 5. CREDITS
function showCredits() {
    const bg = blessed.box({ parent: screen, width: '100%', height: '100%', bg: 'black', index: 100 });
    
    const creditsWin = blessed.box({
        parent: bg,
        top: 'center', left: 'center',
        width: 60, height: 14,
        border: 'line',
        label: ' [ ARCHITECTS ] ',
        tags: true,
        content: '{center}\n{bold}DUEL DEVELOPMENT TEAM{/}\n\n' +
                 'Programming: Lucas Eduardo\n' +
                 'Script: Miguel Marconato\n' +
                 'Arts/ASCII: Lucas Eduardo\n\n' +
                 '{yellow-fg}THANK YOU FOR PLAYING!{/}\n\n' +
                 '{grey-fg}[ESC] TO RETURN{/center}',
        style: { border: { fg: COLOR_DEFAULT } }
    });

    screen.render();
    
    screen.onceKey(['escape'], () => {
        bg.destroy();
        mainList.focus();
        screen.render();
    });
}

// --- EVENTO DE SELEÇÃO PRINCIPAL ---

mainList.on('select', (item) => {
    const text = item.getText().replace(/{.*?}/g, '').trim();

    switch (text) {
        case 'CLOSE':
            process.exit(0);
            break;
        case 'SETTINGS':
            showSettings();
            break;
        case 'ACCOUNT':
            showAccount();
            break;
        case 'ACHIEVEMENTS':
            showAchievements();
            break;
        case 'UPDATES':
            showUpdates();
            break;
        case 'CREDITS':
            showCredits();
            break;
        case 'SUPPORT':
            exec('start https://palelunadev.itch.io/duel');
            break;
        case 'START GAME':
            screen.destroy();
            const game = spawn('node', ['mainEN.js'], { stdio: 'inherit', shell: true });
            game.on('exit', () => {
                process.exit();
            });
            break;
    }
});

// Atalhos Globais
screen.key(['C-c'], () => process.exit(0));

// Inicialização do Foco
mainList.focus();
screen.render();