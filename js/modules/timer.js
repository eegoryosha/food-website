import { getZero } from '../script';

function timer(id, deadline) {
    


    
    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()); // разница в милисекундах 
        t += new Date().getTimezoneOffset() * 60 * 1000; // корректирует разницу между UTC и местным временем (в переменной deadline, в моем случае, +5 часов)
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // получаем количество дней 
        const hours = Math.floor(t / (1000 * 60 * 60) % 24);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function setClock(selector, endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        let timeInterval = setInterval(updateClock, 1000);

        updateClock(); 

        // вывожу на сайт, какого числа закончится акция
        let deadlineInfo = document.querySelector('.promotion__deadline');
        let deadlineDate = new Date(deadline);      
        let monthText = getMonthByIndex(deadlineDate.getMonth());
        deadlineInfo.innerHTML = `Акция закончится ${deadlineDate.getDate()} ${monthText} в 00:00`;
 
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);


    function getMonthByIndex(index){
        const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return month[index];
    }
}

export default timer;