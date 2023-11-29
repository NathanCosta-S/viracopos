let carrinho = [];
let total = 0;
const frete = 6;
let total2 = 0;
const frete2 = 6;

function addItemToCarrinho(productName, price) {
    const existingItemIndex = carrinho.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
       
        carrinho[existingItemIndex].quantity++;
        carrinho[existingItemIndex].totalPrice += price;
       
        carrinho[existingItemIndex].totalPrice = parseFloat(carrinho[existingItemIndex].totalPrice.toFixed(2));
    } else {
       
        const item = {
            name: productName,
            price: price,
            quantity: 1,
      
            totalPrice: parseFloat(price.toFixed(2)),
        };

        carrinho.push(item);
    }

    total += price;
    updateCarrinhoUI();
}

function calcularTotal() {
    const totalComFrete = total + frete;
    return totalComFrete.toFixed(2);
}

function updateCarrinhoUI() {
    const carrinhoItemsElement = document.getElementById('carrinho-items');
    const totalElement = document.getElementById('total');

    carrinhoItemsElement.innerHTML = '';

    carrinho.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} (${item.quantity})Item = $${item.totalPrice}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeItemFromCarrinho(index);

        listItem.appendChild(removeButton);
        carrinhoItemsElement.appendChild(listItem);
    });

    totalElement.textContent = `Total: $${calcularTotal()}`;
}

function removeItemFromCarrinho(index) {
    const item = carrinho[index];

    
    if (item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
    } else {
       
        carrinho.splice(index, 1);
    }

   
    item.totalPrice = parseFloat(item.totalPrice.toFixed(2));

    total -= item.price;

    updateCarrinhoUI();
}
function limparCarrinho() {
    carrinho = [];
    total = 0;
    updateCarrinhoUI();
}

function enviarMensagem() {
    const campos = document.querySelectorAll(".input-text");
    let todosCamposPreenchidos = true;

    campos.forEach(function (campo) {
        if (campo.value.trim() === "") {
            todosCamposPreenchidos = false;

            campo.classList.remove("campo-preenchido");
            campo.classList.add("campo-nao-preenchido");

            const mensagemErro = campo.nextElementSibling;

            if (!mensagemErro || mensagemErro.className !== "mensagem-erro") {
                const mensagem = document.createElement("span");
                mensagem.className = "mensagem-erro";
                mensagem.textContent = "Campo obrigatório";
                campo.parentNode.insertBefore(mensagem, campo.nextSibling);
            }
        } else {
            campo.classList.remove("campo-nao-preenchido");
            campo.classList.add("campo-preenchido");

            const mensagemErro = campo.nextElementSibling;

            if (mensagemErro && mensagemErro.className === "mensagem-erro") {
                campo.parentNode.removeChild(mensagemErro);
            }
        }
    });
    if (todosCamposPreenchidos) {
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;
        const pagamento = document.getElementById('pagamento').value;

        
        let mensagemPedido = `%0AOlá, vim pelo site.%0ANome: ${nome}%0AEndereço: ${endereco}%0APagamento: ${pagamento}%0ATelefone: ${telefone}%0A%0AProdutos do Carrinho:%0A`;

        carrinho.forEach(item => {
            mensagemPedido += `${item.name} - $${item.price} (x${item.quantity}) = $${item.totalPrice}%0A`;
        });

        mensagemPedido += `%0AFrete: $${frete}%0ATotal com Frete: $${calcularTotal()} %0APoderia confirmar meu pedido?`;

        const larguraJanela = window.innerWidth;

        if (larguraJanela < 768) {
            window.open(`https://wa.me/5514996450887?text=${mensagemPedido}`, '_blank');
        } else {
            window.open(`https://web.whatsapp.com/send?phone=5514996450887&text=${mensagemPedido}`, '_blank');
        }
    } else {
        document.getElementById('mensagemErro').innerText = 'Por favor, preencha todos os campos obrigatórios.';
    }
}


var produtosPorPagina = 5; 
var paginaAtual = 1;


function loadMoreProducts() {
  var produtos = document.querySelectorAll('.produtos');
  var totalProdutos = produtos.length;
  var produtosExibidos = produtosPorPagina * paginaAtual;

 
  if (produtosExibidos < totalProdutos) {
    for (var i = produtosExibidos; i < produtosExibidos + produtosPorPagina; i++) {
      if (produtos[i]) {
        produtos[i].style.display = 'block';
      }
    }

    paginaAtual++;
  } else {
    
    document.getElementById('btnLoadMore').style.display = 'none';
  }
}


window.onload = function () {
  loadMoreProducts();
};


function filtrarProdutos() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const produtos = document.getElementsByClassName('produtos');

    for (let i = 0; i < produtos.length; i++) {
        const produtoNome = produtos[i].getElementsByClassName('card-title')[0].getElementsByTagName('h2')[0].innerText.toLowerCase();

        
        if (produtoNome.includes(searchTerm)) {
            produtos[i].style.display = 'block';  
        } else {
            produtos[i].style.display = 'none';   
        }
    }
}