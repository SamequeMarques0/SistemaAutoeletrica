
const ExportadorDeNotas = (() => {
    function gerarNomeArquivo(prefixo = 'BancoDeDados') {
      const agora = new Date().toISOString().replace(/[:.]/g, '-');
      return `${agora} - ${prefixo}.json`;
    }

    function exportarDados(nomeArquivo = gerarNomeArquivo(), chave = 'notas') {
      const dados = JSON.parse(localStorage.getItem(chave)) || [];

      if (dados.length === 0) {
        alert('Não há dados para exportar.');
        return;
      }

      const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = nomeArquivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    return {
      exportar: exportarDados
    };
  })();

  document.getElementById('exportBD').addEventListener('click', (event) => {
    event.preventDefault();
    ExportadorDeNotas.exportar(); // Deve funcionar agora
  });