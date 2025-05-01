const btn = document.getElementById('printButton');
btn.addEventListener('click', ()=>{
    let conf = window.confirm('Deseja Imprimir Documento?');

    if(conf){
        btn.style.display = "none";

        window.print();
    }else{
        alert('Cancelado!!')
    }
    
})