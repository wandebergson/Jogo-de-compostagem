 
function soltarItem(event) {
  const alvo = event.target;

  if (alvo.classList.contains("hole")) {
    const contador = parseInt(alvo.dataset.contador) || 0;
    const novoValor = contador + 1;
    alvo.dataset.contador = novoValor;

    // Atualiza visual
    atualizarContadorVisual(alvo);

    // Se chegou a 5, vira gramado
    if (novoValor >= 5) {
      alvo.classList.remove("hole");
      alvo.classList.add("grass");

    
      
      
    }

    // Remove o item da tela
    const draggingItem = document.querySelector(".item.dragging");
    if (draggingItem) {
      draggingItem.remove();
      atualizarPainel();
      atualizarPainelPontos();
      verificarVitoria();
    }
  }
}

function verificarVitoria() {
  const buracosRestantes = document.querySelectorAll(".hole");
  if (buracosRestantes.length === 0) {
    alert( 'fim de jogo, vc restaurou toda a terra !')
Esteira.ativo = false; // para a esteira se quiser
  }
}


function atualizarContadorVisual(cell) {
  const id = cell.id;
  let contadorSpan = document.getElementById(`contador-${id}`);
  if (!contadorSpan) {
     
    contadorSpan.id = `contador-${id}`;
    contadorSpan.className = "contador";
    cell.appendChild(contadorSpan);
  }
  contadorSpan.textContent = cell.dataset.contador;
}
   
function atualizarPainel() {
  const pontosSpan = document.getElementById("painel-pontos");
  

  // Pontos = buracos que viraram grama (data-contador >= 5)
  const gramas = document.querySelectorAll(".grass");
  pontosSpan.textContent = gramas.length
 
}

class ItemOrganico {
  constructor(icon) {
    this.element = this.createElement(icon);
  }

  createElement(icon) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = icon;
    div.draggable = true;
    div.style.position = "absolute";
    div.style.left = "0px";
    div.style.top = "15px";

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", icon);
      div.classList.add("dragging");
    });
  
 //criar condição para se estiver no buraco 
                          //draggable = false
    div.addEventListener("dragend", () => {
      div.classList.remove("dragging");
    });

    return div;
  }
}

// Tipos de item
class Organicos extends ItemOrganico { constructor() 
  { super("🍃"); } 
}
class CascaDeBanana extends ItemOrganico { constructor() 
  { super("🍌"); } 
}
class BorraDeCafe extends ItemOrganico { constructor() 
  { super("☕"); } 
}
class ChasVelhos extends ItemOrganico { constructor() 
  { super("🍵"); } 
}
class FolhasVelhas extends ItemOrganico { constructor() 
  { super("🍂"); } 
}
class RestosDeComida extends ItemOrganico { constructor() 
  { super("🥗"); } 
}

class Esteira  {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.tipos = [Organicos, CascaDeBanana, BorraDeCafe, ChasVelhos, FolhasVelhas, RestosDeComida];
    this.itens = [];
    this.ativo = true;
    this.vidas = 5; // 🔴 Contador de vidas
    this.container.style.width = "509px";
  }

  criarObjetoAleatorio() {
    if (!this.ativo || this.itens.length >= this.limiteItens) {
      return;
    }

    const TipoObjeto = this.tipos[Math.floor(Math.random() * this.tipos.length)];
    const objeto = new TipoObjeto();
    this.container.appendChild(objeto.element);
    this.itens.push(objeto.element);
    this.animarObjeto(objeto.element);
  }
   

    
   
  animarObjeto(elemento) {
    let posicao = 0;
    const esteiraLargura = 509;
    const larguraItem = 50;
    
    const vidasSpan = document.getElementById("painel-vidas");
   
    vidasSpan.textContent = this.vidas ;
  
    const mover = () => {
      if (!this.ativo) return;

      if (posicao + larguraItem >= esteiraLargura) {
        // 🔴 Remover item e diminuir vida
        this.container.removeChild(elemento);
        this.itens = this.itens.filter(item => item !== elemento);
        
        this.vidas--; // ❗ Perdeu uma vida
        console.log(`Vidas restantes: ${this.vidas}`);
        
        if (this.vidas <= 0 ) {
          this.fimDeJogo();
          
          
        }
        

        return;
      }

      posicao += 1;
      elemento.style.left = `${posicao}px`;
      requestAnimationFrame(mover);
    };

    mover();
  }

  iniciarEsteira() {
    const loop = () => {
      if (!this.ativo) return;
      this.criarObjetoAleatorio();
      const proximoIntervalo = 1000 + Math.random() * 1000;
      setTimeout(loop, proximoIntervalo);
    };
    loop();
  }
 

 
  fimDeJogo() {
   
    
    this.ativo = false;
    alert("Fim de Jogo! vc condenou o mundo.");
    
     
  }
}
 