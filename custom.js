function refreshPage(){window.location.reload();}
/* 
document.getElementsByClassName('btnLight').addEventListener('click', ()=>{
    const body = document.body;

    if((body.style.backgroundColor ==='rgb(20,23,27' || body.style.backgroundColor === '#14171B')){
        body.style.backgroundColor = '#f8f9fa';
    }else{
        body.style.backgroundColor = '#14171B';
    }
}) */


var btnLight = document.querySelectorAll(".btnlight");

btnLight.forEach(function(btn) {
    btn.addEventListener('click', bgAtualiza);
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