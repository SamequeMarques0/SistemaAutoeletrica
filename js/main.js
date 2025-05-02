let contador = 124;

    function adicionarCampoServico() {
            const container = document.getElementById('servicosContainer');
            const div = document.createElement('div');
            div.classList.add('mb-3');
            div.innerHTML = `
                <input type="text"  class="form-control servico" placeholder="Descrição do serviço">
                <input type="number" class="form-control valor mt-1" placeholder="Valor (R$)">
            `;
            container.appendChild(div);
          }

    document.getElementById('adicionaCampo').addEventListener('click', ()=>{
      console.log('Clicado');
      adicionarCampoServico();
    });

    function gerarIdAleatorio() {
	      return Math.floor(100000 + Math.random() * 900000).toString();
	  }
	
    function adicionarNota() {
      const cliente = document.getElementById('cliente').value;
      const veiculo = document.getElementById('veiculo').value;
      const placa = document.getElementById('placa').value;
      const garantia = document.getElementById('garantia').value;
      const observacao = document.getElementById('observacao').value;
      const desconto = parseFloat(document.getElementById('desconto').value) || 0;

      const servicos = document.querySelectorAll('.servico');
      const valores = document.querySelectorAll('.valor');

      let listaServicos = '';
      let total = 0;

      for (let i = 0; i < servicos.length; i++) {
        const descricao = servicos[i].value;
        const valor = parseFloat(valores[i].value) || 0;
        if (descricao) {
          
          listaServicos += `<li><div class="descr">${descricao}</div><div class="vlr">R$ ${valor.toFixed(2)}</div></li>`;

          /* 
              default: listaServicos += `<li>${descricao} - R$ ${valor.toFixed(2)}</li>`;
            listaServico += `<li><div class="descr">${descricao}</div><div class="vlr">R$ ${valor.toFixed(2)}</div></li>`
          */

          total += valor;
        }
      }

      total -= desconto;

      if (!cliente || !veiculo || !placa || total < 0) return;

      const notaId = gerarIdAleatorio();
      const data = new Date().toLocaleDateString();

      const nota = {
        id: notaId,
        cliente,
        veiculo,
        placa,
        garantia,
        observacao,
        servicos: listaServicos,
        total: total.toFixed(2),
        data,
        desconto
      };

      

      salvarNota(nota);
      renderizarNota(nota);

      document.getElementById('formNovaNota').reset();
      document.getElementById('servicosContainer').innerHTML = `
        <div class="mb-3">
          <label class="form-label">Serviço</label>
          <input type="text" class="form-control servico" placeholder="Descrição do serviço">
          <input type="number" class="form-control valor mt-1" placeholder="Valor (R$)">
        </div>`;
      const modal = bootstrap.Modal.getInstance(document.getElementById('novaNotaModal'));
      modal.hide();
    }

    document.getElementById('addingNota').addEventListener('click', ()=>{
      adicionarNota();
    });

    function salvarNota(nota) {
      const notas = JSON.parse(localStorage.getItem('notas')) || [];
      notas.push(nota);
      localStorage.setItem('notas', JSON.stringify(notas));
    }

    function renderizarNota(nota) {
      const notaHtml = `
        <div class="col" data-id="${nota.id}">
          <div class="card">
            <div class="card-header bgcolorRed colorLight">ID ${nota.id}</div>
            <div class="card-body">
              <h5 class="card-title itemA">${nota.cliente}</h5>
              <p class="card-text itemB">
                <strong>Veículo:</strong> ${nota.veiculo} / ${nota.placa}<br>
                <strong>Data:</strong> ${nota.data}<br>
                <strong>Garantia:</strong> ${nota.garantia || '-'}
              </p>
              <ul class="itemC">${nota.servicos}</ul>
              ${nota.observacao ? `<p class="itemD"><strong class="">Observação:</strong><br>${nota.observacao}</p>` : ''}
              ${nota.desconto > 0 ? `<p class="itemE"><strong class="">Desconto:</strong><br> R$${nota.desconto.toFixed(2)}</p>` : ''}
              <p class="card-text itemF"><strong >Total:</strong><br> R$${nota.total}</p>
              <div class="btnsCard">
                <button class="btn btn-sm btn-outline-info itemG" onclick="imprimirNota(this)">Imprimir</button>
                <button class="btn btn-sm btn-outline-danger ms-2 itemH" onclick="excluirNota(this)">Excluir</button>
                <button class="btn btn-sm btn-outline-success ms-2 itemI" onclick="exportarNota(this)">JSON</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById('notasContainer').insertAdjacentHTML('afterbegin', notaHtml);
    }


    function imprimirNota(botao) {
              const card = botao.closest('.card');
              const col = botao.closest('.col');
              const notaId = col.getAttribute('data-id');

              const notas = JSON.parse(localStorage.getItem('notas')) || [];
              const nota = notas.find(n => n.id === notaId);

              console.log(nota);

              if (!nota) {
                alert("Nota não encontrada.");
                return;
              }

              // Usando o JSON da nota para criar a visualização
              const printWindow = window.open('', '', 'height=600,width=800');
              printWindow.document.write(`<html><head><title>OS | ${nota.id} </title>`);
              printWindow.document.write('<link rel="stylesheet" href="./css/main-os.css">');
              printWindow.document.write('</head><body class="">');


              /* ----______------_______------_______------_______------____ */
              printWindow.document.write(
                `
                  <div id="paper">
                        <header>
                            <div id="brading">
                                <img src="./image/silas-brading.png" alt="">
                            </div>
                            <ul id="info">
                                <li  style="list-style: none;">Rua Nossa Senhora do Carmo, 407, 57082-210, Maceió/AL</li>
                                <li  style="list-style: none;">999 999 999 999</li>
                                <li  style="list-style: none;">info@email.com</li>
                                <li  style="list-style: none;">site.com.br</li>
                            </ul>
                        </header>
                        
                        <div id="subheader">
                            <div id="cliente">
                                <div class="title">Detatlhe:</div>
                                <span class="row"></span>
                                <div class="clientBox">${nota.cliente}</div>
                                <div class="veiculo">${nota.veiculo}</div>
                                <div class="placa" style="text-transform: uppercase">${nota.placa}</div>
                            </div>
                            <div id="informacao">
                                <div class="id"><strong>ID:</strong>${nota.id}</div>
                                <div class="data"><strong>DATA:</strong>${nota.data}</div>
                                <div class="garantia"><strong>GARANTIA(FIM):</strong>${nota.garantia}</div>
                            </div>
                        </div>

                        <div id="servico">
                            <div class="thead">
                                <div class="ttitle">Descricao</div>
                                <div class="tvalor">Valor (R$)</div>
                            </div>
                            <ul class="servico">
                                <!-- Maximo de Item 12 -->
                                 ${nota.servicos}
                            </ul>
                        </div>

                        <div id="boxing">

                            <div class="card">
                                <div class="ckmdc">METODOS DE PAGAMENTO</div>

                                <div class="item">
                                    <strong>Cartão de Crédito</strong>
                                    <ul>
                                        <li>2x sem Juros. Parcelamento acima do citado <br>o juros é repassado ao cliente.</li>
                                    </ul>
                                </div>
                                <div class="item">
                                    <strong>Avista</strong>
                                    <ul style="display: flex;">
                                        <li>PIX</li>
                                        <li>Débito</li>
                                        <li>Dinheiro</li>
                                    </ul>
                                </div>
                                <div class="item">
                                    <strong>OBSERVAÇÃO:</strong>
                                    <span class="row2"></span>
                                    ${nota.observacao ? `<p style="width: 720px;height: 50px; text-indent: 20px;" class="obs">${nota.observacao}</p>` : '' }</p>
                                </div>
                            </div>

                            <div id="pag">
                                <div class="valortotal">
                                    
                                    ${nota.desconto > 0 ? `<div class="desconto" >Desconto: <div >R$ ${nota.desconto.toFixed(2)}</div></div>` : ''}

                                    <div class="total"><strong>Total OS:</strong> <div class="">R$ ${nota.total}</div></div>
                                    
                                </div>
                            </div>

                        </div>

                        <footer>
                            <div class="obg">Obrigado pela preferencia!!</div>
                            <span class="row2"></span>
                            <div class="termo"><strong>Termo e garantia</strong>, Acesse: <a target="_blank" href="https://silastermoeservicos.wasmer.app/">silastermoeservicos.wasmer.app</a></div>
                        </footer>

                    </div>

                
                    <span id="printButton">PRINT</span>
                    <script src="./js/pagePrint.js"></script>
                
                `)

              printWindow.document.write('</body></html>');
              printWindow.document.close();
              printWindow.focus();

            }

    function excluirNota(botao) {
      if (confirm("Tem certeza que deseja excluir esta nota?")) {
        const card = botao.closest('.col');
        const notaId = card.getAttribute('data-id');
        card.remove();
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        const atualizadas = notas.filter(n => n.id !== notaId);
        localStorage.setItem('notas', JSON.stringify(atualizadas));
      }
    }
    
    function exportarNota(botao) {
      const card = botao.closest('.col');
      const notaId = card.getAttribute('data-id');
      const notas = JSON.parse(localStorage.getItem('notas')) || [];
      const nota = notas.find(n => n.id === notaId);
      
      if (!nota) {
        alert("Nota não encontrada.");
        return;
      }
      
      const blob = new Blob([JSON.stringify(nota, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${notaId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    }

    function importarNotaJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const nota = JSON.parse(e.target.result);

          if (!nota.id || !nota.cliente || !nota.total) {
            alert("Arquivo inválido ou incompleto.");
            return;
          }

          const notas = JSON.parse(localStorage.getItem('notas')) || [];
          const notaExistente = notas.find(n => n.id === nota.id);

          if (notaExistente) {
            if (!confirm(`Já existe uma nota com o ID ${nota.id}. Deseja sobrescrever?`)) return;
            const atualizadas = notas.map(n => n.id === nota.id ? nota : n);
            localStorage.setItem('notas', JSON.stringify(atualizadas));
          } else {
            notas.push(nota);
            localStorage.setItem('notas', JSON.stringify(notas));
          }

          renderizarNota(nota);
          alert("Nota importada com sucesso!");
        } catch (err) {
          alert("Erro ao importar nota: " + err.message);
        }
      };

      reader.readAsText(file);
    }

    const inputImport = document.querySelector('.importBD');

    inputImport.addEventListener('change', importarNotaJson);


    // Carregar notas ao inicializar a página
    document.addEventListener("DOMContentLoaded", function() {
      const notas = JSON.parse(localStorage.getItem('notas')) || [];
      notas.forEach(renderizarNota);
    });


     /* ------------------------------------------------------------------------ */

   /*  function exportarBanco() {
      const notas = JSON.parse(localStorage.getItem('notas')) || [];
      const blob = new Blob([JSON.stringify(notas, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const hoje = new Date().toISOString().slice(0, 10);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${hoje} - BancoDeDados.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    document.getElementById('exportBD').addEventListener('click', (event)=> {
        event.preventDefault();
        exportarBanco();
        return false;
      }); */

 /* ------------------------------------------------------------------------ */

document.querySelectorAll(".btnlight").forEach(function(btn) {
    btn.addEventListener('click', bgAtualiza());
  });
  
  function bgAtualiza() {
      var body = document.body;
      var background = window.getComputedStyle(body).backgroundColor;
  
      // Função auxiliar para converter RGB para Hex
      function rgbParaHex(rgb) {
          var result = rgb.match(/\d+/g);
          return "#" + result.map(function(x) {
              var hex = parseInt(x).toString(16);
              return hex.length == 1 ? "0" + hex : hex;
          }).join('');
      }
  
      var corHexAtual = rgbParaHex(background).toLowerCase();
  
      if (corHexAtual === "#14171b") {
          body.style.backgroundColor = "#d2d2d2";
      } else {
          body.style.backgroundColor = "#14171b";
      }
  }