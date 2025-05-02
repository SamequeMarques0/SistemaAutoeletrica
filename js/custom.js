function refreshPage(){window.location.reload();}

 document.getElementById('refreshPage').addEventListener('click', ()=>{
    console.log('Atualizado');
    refreshPage();
 }); 