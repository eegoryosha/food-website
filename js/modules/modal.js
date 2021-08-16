function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide'); 
    modal.classList.remove('show');

    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
     
    modal.classList.add('show'); 
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';

    if (modalTimerId){
        clearInterval(modalTimerId);
    }
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    
    
    modalTrigger.forEach((btn) => { 
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // функция внутри стрелочной функции, потому что вторым аргументом мы должны передавать функцию без скобок
                                                                       // в нашем же случае, мы должны передать аргумент
                                                                       // чтобы обойти это, нужно функцию обернуть в стрелочную функцию 
    });         
    
    

    modal.addEventListener('click', (e) =>{
        
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

    

    function showModalByScroll(){
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimerId); 
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};