let imgPokemon = document.querySelector("#fotoPoke");//mostra imagem

let formPoke = document.querySelector("#form");//
let inputF = document.querySelector("#input");//mostra input

let idPoke = document.querySelector("#id-pokemon");//mostra id 
let nomePoke = document.querySelector("#nome-pok");//mostra nome

let tipo01 = document.querySelector("#tipo01");//mostra tipo
let tipo02 = document.querySelector("#tipo02");//mostra tipo02

let habilidade = document.querySelector("#habilidade"); //mostra habilidade
let peso = document.querySelector("#peso");//mostra peso
let altura = document.querySelector("#altura");//mostra altura

let back = document.querySelector("#voltar");//mostra voltar
let next = document.querySelector("#proximo");//mostra proximo

let botaoIntro = document.querySelector("#botaoIntro");//botao para pausar e tocar intro
let audioIntro = document.querySelector("#audioIntro");//audio 

let numeroPokedex = 1;

audioPoke.volume = 0.1; // ajusta volume do pokemon


const fetchPokemon = async(pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await APIresponse.json();
    return data; //  busca dados do pokemon na api
}

const showPokemon = async(pokemon) =>{
    const dataPokemon = await fetchPokemon(pokemon); //mostra informações do pokemon na tela

   segundaImage(dataPokemon.sprites.other.showdown.front_default, dataPokemon.sprites.front_default)// Atualiza a imagem do Pokémon usando a função que tenta carregar um GIF e, se falhar, carrega uma imagem padrão
    nomePoke.innerHTML = dataPokemon.name; // atualiza o nome
    idPoke.innerHTML = dataPokemon.id;// atualiza o id
    tipo01.innerHTML = "Tipo 1: " + dataPokemon.types[0].type.name; // atualiza o tipo

    if (dataPokemon.types.length > 1) {
        tipo02.innerHTML = "Tipo 2: " + dataPokemon.types[1].type.name; // se o a seção "tipo" for maior que 1 insira o Tipo 02;
    } else {
        tipo02.innerHTML = "Tipo 2: inexistente"; // se não existir, tipo dois é "inexistente";
    }
    
    habilidade.innerHTML = "Habilidade: " + dataPokemon.abilities[0].ability.name; //atualiza habilidade
    peso.innerHTML = "Peso: " + (dataPokemon.weight / 10) + "kg"; // "/10" - transformando em kilograas;
    altura.innerHTML = "Altura: " + (dataPokemon.height / 10) + " m"; // "/10" - transformando em metros;
    audioPoke.src = dataPokemon.cries.latest;
    audioPoke.play();    
}

// Função que tenta carregar uma imagem GIF (sprite animado).
// Se não conseguir (por exemplo, se o Pokémon não tiver essa imagem), usa a imagem padrão como fallback.
function segundaImage(gif, image) {
    imgPokemon.src = gif;

    imgPokemon.onerror = function() {
        this.onerror = null; // evita repetição de erro
        this.src = image; // carrega a imagem padrão
    }
    return;
}


// busca o pokemon através do id digitado
formPoke.addEventListener("submit", (event) => {
    event.preventDefault();
    showPokemon(inputF.value.toLowerCase()); // busca o pokemon usando o valor do input
})

audioIntro.volume = 0.1;

botaoIntro.addEventListener("click", () => {
    if (audioIntro.paused) { // Se o áudio estiver pausado
        audioIntro.play();  // ao clicar Toca o áudio
        botaoIntro.textContent = "Pausar intro";  // Altera o texto do botão para "Pausar Intro"
    } else {  // Se o áudio estiver tocando
        audioIntro.pause();  // Pausa o áudio
        botaoIntro.textContent = "Tocar intro";  // Altera o texto do botão para "Tocar Intro"
    }
});

//botão voltar
back.addEventListener("click", (event) => {
    if(numeroPokedex > 1){ //se o numero de pokemon no pokedex for maior que 1
        numeroPokedex = numeroPokedex - 1; //ele volta para o pokemon anterior
    }
    showPokemon(numeroPokedex); //chama a função para exibir o pokemon anterior
})

//botão proximo
next.addEventListener("click", (event) => {
    if(numeroPokedex < 1000){ // se o numero de pokemons na pokedex for menor que 1000
        numeroPokedex = numeroPokedex + 1; // ele passa para o proximo pokemon
    }
    showPokemon(numeroPokedex);
})

