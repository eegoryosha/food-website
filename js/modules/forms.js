import {closeModal, openModal} from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
    };
    
    forms.forEach(item => {
        bindPostData(item); 
    });
    
    


    // функция для отправки данных
    function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                    e.preventDefault();  
                    
                    const statusMessage = document.createElement('img');
                    statusMessage.src = message.loading;  
                    // можно использовать statusMessage.setAttribute('src', message.loading);
                    statusMessage.style.cssText = `
                        display: block; 
                        margin: 0 auto;
                    `;

                    form.insertAdjacentElement('afterend', statusMessage);
                
                    const formData = new FormData(form); 

                    // Берем FormData, которая собрала данные с формы
                    // Превращаем данные в массив массивов
                    // Превращаем все это в классический объект
                    // Превращаем далее все в JSON
                    const json = JSON.stringify(Object.fromEntries(formData.entries()));                  

                    postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data); // data - данные, которые возвращаются из промиса
                        showThanksModal(message.success);
                        statusMessage.remove(); 
                    })
                    .catch(() => {
                        showThanksModal(message.failure);
                    })
                    .finally(() => {
                        form.reset();
                    });
    
            });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // берем контент старого модального окна
        prevModalDialog.classList.add('hide'); // и скрываем его (не удаляем)

        openModal('.modal', modalTimerId); // открываем модальное окно
        
        const thanksModal = document.createElement('div'); // создаем div, куда будем помещать новый контент
        thanksModal.classList.add('modal__dialog'); // добавляем ему тот же класс, что и у старого
        // создаем контент:
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;