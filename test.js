const btn = document.querySelectorAll('#btnImprimirMobile');
btn.addEventListerEnner('click', ()=>{
    alert('Vamos Imprimir');
    btn.style.display = "none";
    document.print();
})