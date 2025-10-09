//Bibliotecas
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');

//ESPECIAL
const caracter = '='
const larguradoterminal = process.stdout.columns
const linha = caracter.repeat(larguradoterminal)


//Funcões
function Saude() {
console.clear()
if(Saude1 < 10) {
gameover()
centertext("==============================================================")
centertext("VOCÊ PERDEU MUITA VIDA!")
centertext("==============================================================")
process.exit()
} else {
centertext("==============================================================")
centertext("- INFORMAÇÕES SOBRE A SUA SAÚDE -")
centertext("==============================================================")
centertext("Sua saude atual é de "+Saude1)
pausarParaContinuar()
}
}

function Honra() {
console.clear()
centertext("==============================================================")
centertext("- INFORMAÇÕES SOBRE A SUA HONRA -")
centertext("==============================================================")
centertext("Sua honra atual é de "+honra1)
pausarParaContinuar()
}

function MenosHonra() {
console.clear()
centertext("==============================================================")
centertext("- INFORMAÇÕES SOBRE A SUA HONRA -")
centertext("==============================================================")
honra1-=10
centertext("Sua honra caiu para "+honra1)
pausarParaContinuar()
}

function MaisHonra() {
console.clear()
centertext("==============================================================")
centertext("- INFORMAÇÕES SOBRE A SUA HONRA -")
centertext("==============================================================")
honra1+=10
centertext("Sua honra subiu para "+honra1)
pausarParaContinuar()
}

function Pistas() {
    console.clear()
    centertext("==============================================================")
    centertext("AÇÃO - PISTAS")
    centertext("==============================================================")

    if (pistaxerife) {
        contadorpistas++
        if (!xerife) {
        centertext("[01] - VOCÊ DEVERIA VISITAR O XERIFE!")
        } else {
        centertext("[DESCARTADO] - VOCÊ DEVERIA VISITAR O XERIFE!")
        }
    }

    if (minapista) {
        contadorpistas++
        centertext("[02] - MINA ABANDONADA")
    }

     if (contadorpistas == 0) {
        centertext("- VOCÊ NÃO ACHOU NENHUMA PISTA AINDA! -")
    }

pausarParaContinuar()
}

function logoincial() {
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
    centertext(" ");
}

function pausarParaFechar() {
    centertext("==============================================================");
    centertext("[PRESSIONE ENTER PARA FECHAR]");
    centertext("==============================================================");
    prompt();
    process.exit()
    console.clear();
}

function opcaoinvalidanoclose() {
    console.clear()
    centertext(linha)
    centertext("[OPÇÃO INVALIDA]")
    centertext(linha)
    centertext("[PRESSIONE ENTER PARA VOLTAR]");
    centertext(linha)
    prompt();
    console.clear();

}

function Opcãoinvalida() {
    console.clear()
    centertext(linha)
    console.log("[OPÇÃO INVALIDA - PUNIÇÃO: FECHAR O JOGO]")
    centertext(linha)
    console.log("[PRESSIONE ENTER PARA FECHAR]");
    centertext(linha)
    prompt("")
    process.exit(90)
}

function pausarParaContinuar() {
    centertext("==============================================================");
    centertext("[PRESSIONE ENTER PARA CONTINUAR]");
    centertext("==============================================================");
    prompt();
    console.clear();
}

function pausarParaContinuarA() {
    centertext("==============================================================");
    centertext("[PRESSIONE ENTER PARA CONTINUAR]");
    centertext("==============================================================");
    prompt();
}


function centertext(text) {
    const terminalWidth = process.stdout.columns;
    const padding = Math.max(0, Math.floor((terminalWidth - text.length) / 2));
    console.log(' '.repeat(padding) + text);
}

function gameover() {

    const logo = [
    " ███████████████    ████████████    █████████████████████     █████████████",
    "██████             ██████  ██████   ██████  ██████  ██████   ██████",
    "██████             ██████  ██████   ██████  ██████  ██████   ██████",
    "██████  ████████   ██████████████   ██████  ██████  ██████   ██████████",
    "██████    ██████   ██████  ██████   ██████  ██████  ██████   ██████",
    "██████    ██████   ██████  ██████   ██████  ██████  ██████   ██████",
    " ███████████████   ██████  ██████   ██████  ██████  ██████    █████████████",
    "",
    "   ██████████████    ██████  ██████    █████████████   ██████████████",
    "  ████████████████   ██████  ██████   ██████           ██████   ██████",
    "  ██████    ██████   ██████  ██████   ██████           ██████   ██████",
    "  ██████    ██████   ██████  ██████   ██████████       █████████████",
    "  ██████    ██████   ██████  ██████   ██████           ███████████████",
    "  ████████████████   ██████  ██████   ██████           ██████   ██████",
    "   ██████████████    █████████████     █████████████   ██████   ██████",
    ]
const maxLineWidth = Math.max(...logo.map(line => line.length));
    const terminalWidth = process.stdout.columns;
    const padding = Math.max(0, Math.floor((terminalWidth - maxLineWidth) / 2));
    const paddedLogo = logo.map(line => ' '.repeat(padding) + line);
    paddedLogo.forEach(line => console.log(line));
}



//Variaveis
let nomeJogador = "";
let jogadorpadrao=true
let dama=false
let dono=false
let velho=false
let pianista=false
let jogoativo = true;
let jogoativo2 = true;
let pistaxerife = false
let bebado = 0
let contadorpistas = 0
let xerife = false
let honra1 = 100
let Saude1 = 100
let conflitoresolvido = false
let conflitorodadas = 0;
let ignorerodadas = 0
let contadorotario = 0
let vidacapa = 50
let conflitoresolvido1 =false
let minapista = false
let inicia = true

//Jogo em si
console.clear();




//INICIO
logoincial()
    centertext("==============================================================")
    centertext("-- Versão 0.2 --")
    centertext("==============================================================")
    centertext("REGRAS BASICAS")
    centertext("==============================================================")
    centertext("-- Cada jogador começa com 100 pontos de vida --")
    centertext("-- Utilize apenas numeros indicados nas opções --")
    centertext("-- NÃO mude o tamanho do terminal. --")
    centertext("-- Divirta-se! --")
    pausarParaContinuar();

    //INFO BASICA
    while (inicia) {
    logoincial()
    centertext("==============================================================")
    centertext("INFORMAÇÕES BASICAS")
    centertext("==============================================================")
    centertext("NOME DO JOGADOR:")
    centertext("*Caso o espaço seja deixado em branco, o nome padrão será 'Kenan Thomas'*")
    nomeJogador = prompt(">> ");
    if (nomeJogador.trim() === "") {
        nomeJogador = "Kenan Thomas";
        inicia=false
    } else if (nomeJogador.length > 10) {
        console.clear()
        centertext("==============================================================")
    centertext("AVISO")
    centertext("==============================================================")
    centertext("Você não pode ter um nome maior que 10 letras. Tente Novamente!")
    centertext("==============================================================")
    } else {
        jogadorpadrao=false
        inicia=false
    }
}
    centertext("Certo... "+nomeJogador)
    pausarParaContinuar();

    
//CONTEXTO
    logoincial()
    centertext("==============================================================")
    centertext("CONTEXTUALIZAÇÃO")
    centertext("==============================================================")

    if (jogadorpadrao==true){
        nomeJogador="Kenan Thomas"
    }
    centertext(nomeJogador + " é um pistoleiro da antiga gangue Endline")
    centertext("á pouco tempo viu seu lider Silas Twone trair e matar seu melhor amigo Leonard.")
    centertext("==============================================================")
    centertext(nomeJogador + ", deixou a poeira abaixar, descobrindo que o traidor")
    centertext("havia sido visto em uma cidade isolada chamada 'Red Rock'.")
    centertext("==============================================================")
    centertext("Agora, sedento por vingança, você parte em uma jornada")
    centertext("para encontrar Silas Twone e fazer justiça com as próprias mãos.")
    pausarParaContinuar();

    //cenario 1
    centertext("==============================================================")
    centertext("CENÁRIO 1 - A CHEGADA EM RED ROCK")
    centertext("==============================================================")
    centertext("Noite fria. O vento traz a poeira vermelha das colinas.") 
    centertext("A lua ilumina a placa enferrujada:\x1b[91m Red Rock \x1b[38;2;255;140;0m")
    centertext("==============================================================")
    centertext(nomeJogador + " com a cicatriz da traição ainda marcada no corpo, ele cavalga")
    centertext("em direção ao primeiro estabelecimento. O American Venom Saloon")
    pausarParaContinuar();


    //CENARIO 1.1 - jogoativo
    while (jogoativo) {
    centertext("==============================================================")
    centertext("CENARIO 1.1 - AMERICAN VENOM SALOON")
    centertext("==============================================================")
    centertext(nomeJogador + " entra no Saloon, o ambiente cheira á uísque barato,")
    centertext("suor e madeira velha. O pianista para de tocar ao vê-lo entrar,")
    centertext("e todos os olhares se voltam para você.")
    centertext("==============================================================")
    centertext("INTERAÇÕES")
    centertext("==============================================================")
    centertext("[01] DONO DO BAR     ")
    centertext("[02] VELHO BÊBADO    ")
    centertext("[03] PIANISTA        ")
    centertext("[04] DAMA ELEGANTE   ")
    centertext("[05] SAIR DO SALOON  ")
    centertext("[06] CONSULTAR PISTAS")
    centertext("==============================================================")
    centertext("COMANDO? (1-6)")
    centertext("==============================================================")
    let bar = Number(prompt(">> "));

    if (bar == 1) {
        console.clear()
        if (dono) {
            centertext("==============================================================")
            centertext("DIÁLOGO - DONO DO BAR")
            centertext("==============================================================")
            centertext("DONO:")
            centertext("==============================================================")
            centertext("Já te disse tudo o que sei. Agora, se me der licença,")
            centertext("tenho um bar para tocar.")
            pausarParaContinuar()
        } else {
        centertext("==============================================================")
        centertext("DIÁLOGO - DONO DO BAR")
        centertext("==============================================================")
        centertext("DONO:")
        centertext("==============================================================")
        centertext("Aquele desgraçado do Silas passou por aqui. Bebeu até cair,")
        centertext("bateu em dois homens, quebrou a janela e ainda saiu rindo")
        centertext("da minha cara. Disse que essa cidade era pequena demais pra ele.") 
        centertext("\x1b[93mSe fosse você, procurava o xerife.\x1b[38;2;255;140;0m")
        pistaxerife=true
        pausarParaContinuar()
        }
dono=true
    } else if (bar == 2) {
        console.clear()
        if (velho && bebado == 2) {
            console.clear()
            centertext("==============================================================")
            centertext("EU NÃO TEM MAIS NADA PARA FALAR, QUE SACO, QUER SABER")
            centertext("UMA INFORMAÇÃO. AQUI ELA!")
            pausarParaContinuar()
            gameover()
            centertext("")
            centertext("==============================================================")
            centertext("[O VELHO SE APROXIMA... E ACERTA COM UMA FACA A REGIÃO DA SUA BARRIGA]")
            centertext("[VOCÊ SANGRA ATÉ A MORTE... MAS NÃO DESISTA, TENHA DETERMINAÇÃO]")
            pausarParaFechar()
        }
        if (velho) {
            centertext("==============================================================")
            centertext("DIÁLOGO - VELHO BÊBADO")
            centertext("==============================================================")
            centertext("VELHO:")
            centertext("==============================================================")
            centertext("Já te disse tudo o que sei. Agora, se me der licença,")
            centertext("tenho uma bebida para consumir.")
            bebado++
            pausarParaContinuar()
        } else {
        centertext("==============================================================")
        centertext("DIÁLOGO - VELHO BÊBADO")
        centertext("==============================================================")
        centertext("VELHO:")
        centertext("==============================================================")
        centertext("Silas… hah! Me pagou uma garrafa inteira ontem! Disse que ia procurar")
        centertext("o xerife, mas antes precisava ‘ressuscitar um amigo’. Homem bom…")
        centertext("ou pelo menos parecia, quando tinha bebida pra oferecer.")
        pausarParaContinuar()
        }
velho=true
    } else if (bar == 3) {
        console.clear()
        if (pianista) {
            centertext("==============================================================")
            centertext("DIÁLOGO - PIANISTA")
            centertext("==============================================================")
            centertext("PIANISTA:")
            centertext("==============================================================")
            centertext("Já te disse tudo o que sei. Agora, se me der licença,")
            centertext("tenho uma música para tocar.")
            pausarParaContinuar()
        } else {
        centertext("==============================================================")
        centertext("DIÁLOGO - PIANISTA")
        centertext("==============================================================")
        centertext("PIANISTA:")
        centertext("==============================================================")
        centertext("Silas Twone? Ah, sim, ele esteve aqui. Pediu uma música triste,")
        centertext("disse que estava com o coração partido. Tocou ‘The Streets of Laredo’")
        centertext("e ficou ali, bebendo e olhando para o nada. Depois saiu sem pagar.")
        pausarParaContinuar()
        }
pianista=true
    } else if (bar == 4) {
        console.clear()
        if (dama) {
            centertext("==============================================================")
            centertext("DIÁLOGO - DAMA ELEGANTE")
            centertext("==============================================================")
            centertext("DAMA:")
            centertext("==============================================================")
            centertext("Já te disse tudo o que sei. Agora, se me der licença...")
            centertext("==============================================================")
            pausarParaContinuar()
        } else {
            centertext("==============================================================")
            centertext("DIÁLOGO - DAMA ELEGANTE")
            centertext("==============================================================")
            centertext("DAMA:")
            centertext("==============================================================")
            centertext("Silas? Arrogante feito um rei. Tentou me comprar,")
            centertext("me chamou de prêmio barato. Disse que voltaria com dinheiro")
            centertext("suficiente pra comprar Red Rock inteira. Se for verdade,") 
            centertext("logo você vai sentir o cheiro da pólvora.")
            pausarParaContinuar()
        }
dama=true
    } else if (bar == 5) {
        console.clear()
        centertext("==============================================================")
        centertext(nomeJogador + " sai do saloon, a noite fria o envolve novamente.")

        if (!dama || !dono || !velho || !pianista) {
            centertext("Você sente que deixou algo para trás...")
            centertext("Talvez você deveria voltar e conversar com...")
            centertext("==============================================================")
            if (!dono) { 
                centertext("[01] DONO DO BAR")
            }
            if (!velho) {
                centertext("[02] VELHO BÊBADO")
            }
            if (!pianista) {
                centertext("[03] PIANISTA")
            }
            if (!dama) {
                centertext("[04] DAMA ELEGANTE")
            }
            pausarParaContinuar()
        } else {
            centertext("Você sente que já conversou com todos do Saloon.")
            jogoativo = false
        }
        
    } else if (bar == 6) {
        Pistas()

    } else {
        opcaoinvalidanoclose()
    }

    }

    while (!conflitoresolvido) {
    console.clear()
    if (conflitorodadas == 0 && vidacapa > 0) {
    centertext("==============================================================")
    centertext("CONFLITO - CAPANGAS DE SILAS")
    centertext("==============================================================")
    centertext("Ao sair do Saloon, os capangas de Silas te reconhecem e o confrotam!")
    centertext("==============================================================")
    centertext("INTERAÇÕES")
    centertext("==============================================================")
    centertext("[01] LUTAR              ")
    centertext("[02] POUPAR             ")
    centertext("[03] TENTAR COMPRAR ELES")
    centertext("==============================================================")
    conflitorodadas+=1
} else if (conflitorodadas > 0 && vidacapa > 0) {
        centertext("==============================================================")
    centertext("CONFLITO - RODADA N°"+conflitorodadas+" - VIDA DOS CAPANGAS: "+ vidacapa)
    centertext("==============================================================")
    centertext("INTERAÇÕES")
    centertext("==============================================================")
    centertext("[01] LUTAR              ")
    centertext("[02] POUPAR             ")
    centertext("[03] TENTAR COMPRAR ELES")
    centertext("==============================================================")
    conflitorodadas+=1
} else {
      centertext("==============================================================")
    centertext("CONFLITO - RODADA N°"+conflitorodadas+" - RESULTADO: VITORIA")
    pausarParaContinuar()
    conflitoresolvido1=true
    conflitoresolvido=true
}
if (!conflitoresolvido1) {
    let conflito1 = Number(prompt(">> "))

    if (conflito1 == 1) {
    console.clear()
    centertext("==============================================================")
    centertext("AÇÃO - LUTAR")
    centertext("==============================================================")
    centertext("Você ataca os capangas!")
    pausarParaContinuar()
    if (Math.random() > 0.4) {
        vidacapa-=10
        centertext("==============================================================")
    centertext("AÇÃO - LUTAR")
        centertext("==============================================================")
        centertext("Você acerta eles e causa 10 de dano")
        pausarParaContinuar()
    } else {
        centertext("==============================================================")
    centertext("AÇÃO - LUTAR")
    centertext("==============================================================")
    centertext("Você tenta acerta-los e erra.")
    centertext("eles te acertam e causam 10 de dano.")
    Saude1-=10
    pausarParaContinuar()
    Saude()
    }


    } else if (conflito1 == 2) {
    console.clear()
    if (ignorerodadas < 100) {
    ignorerodadas+=40
    centertext("==============================================================")
    centertext("Você escolhe poupar os capangas!")
    centertext("Eles te ignoram e atacam você...")
    pausarParaContinuar()
    centertext("==============================================================")
    if (Math.random() < 0.5) {
    centertext("Os capangas acertam um golpe com uma madeira")
    centertext("Você perdeu 10 pontos de Saúde!")
    Saude1-=10
    } else if (Math.random() >= 0.5 && Math.random() <= 0.9) {
        centertext("Os capangas acertam um golpe com uma pá")
        centertext("Você perdeu 30 pontos de Saúde!")
        Saude1-=30
    } else {
        centertext("Os capangas acertam um golpe com uma foice")
        centertext("Você perdeu 70 pontos de Saúde!")
        Saude1-=70
    }

    pausarParaContinuar()
    Saude()

    } else {
    centertext("==============================================================")
    centertext("Você poupa os capangas novamente e eles ficam entediados!")
    centertext("==============================================================")
    centertext("O que te permite fugir deles.")
    centertext("==============================================================")
    centertext("PISTA ENCONTRADA: Mina Abandonada")
    minapista=true
    conflitoresolvido=true
    conflitoresolvido1=true
    pausarParaContinuar()
    MaisHonra()
    Saude()
    }

    } else if (conflito1 == 3) {
        console.clear()
        if (contadorotario == 0) {
            contadorotario++
    centertext("==============================================================")
    centertext("AVISO")
    centertext("==============================================================")
    centertext("NARRADOR: 'Você acha que estamos na era moderna? ")
    centertext("aqui dinheiro não é tão facil de conseguir não...'")
    pausarParaContinuar()
        } else if (contadorotario == 1) {
            contadorotario++
            centertext("==============================================================")
    centertext("AVISO")
    centertext("==============================================================")
    centertext("NARRADOR: 'Você é do tipo que não desite tão facil né")
    centertext("VOCÊ NÃO TEM DINHEIRO, AGORA TENTA OUTRA OPCÃO!'")
    pausarParaContinuar()
        } else if (contadorotario == 2){
            contadorotario++
            centertext("==============================================================")
    centertext("AVISO")
    centertext("==============================================================")
    centertext("NARRADOR: 'Olha... se você não quiser ver o que eu tenho guardado é melhor desistir...")
    pausarParaContinuar()
} else if (contadorotario == 3) {
    contadorotario++
    centertext("==============================================================")
    centertext("AVISO")
    centertext("==============================================================")
    centertext("NARRADOR: 'Eu avisei...'")
    pausarParaContinuar()
    gameover()
    centertext("==============================================================")
    centertext("NARRADOR: 'HAHAHAHAHAHAHAHAHAHAHA, CONSEQUENCIAS...'")
    centertext("==============================================================")
    process.exit()
}


    } else {
        opcaoinvalidanoclose()
    }

}
    }

    //CENARIO 1.2 - jogoativo2
    while(jogoativo2) {
        
        console.clear()
    centertext("==============================================================")
    centertext("CENARIO 1.2 - RUAS DA RED ROCK")
    centertext("==============================================================")
    centertext("Você está nas ruas de Red Rock...")
    centertext("==============================================================")
    centertext("INTERAÇÕES")
    centertext("==============================================================")
    centertext("[01] CONSULTAR PISTAS   ")
    if (pistaxerife) {
        centertext("[02] IR PARA A DELEGACIA")
    }
    centertext("==============================================================")
    let rua = Number(prompt(">> "))

    if (rua == 1) {
        Pistas()
    } else if (rua == 2) {
        
        console.clear()
        centertext("==============================================================")
        centertext("Você decidi ir para a delegacia...")
        centertext("==============================================================")
        centertext("Dentro da delegacia, você imediatamente fala com o xerife sobre o Silas")
        centertext("==============================================================")
        centertext("DIALOGO - XERIFE LOCAL")
        centertext("==============================================================")
        centertext(nomeJogador+": ")





    } else {
        opcaoinvalidanoclose()
    }
    }
//Criação de conquistas

