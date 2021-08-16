import tabs from './modules/tabs';
import modal, { openModal } from './modules/modal'; 
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';

document.addEventListener('DOMContentLoaded', ()=>{
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 15000); 

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal', '.modal', modalTimerId);
    timer('.timer', '2021-09-22');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        currentCounter: '#current',
        field: '.offer__slider-inner'
    });
});

function getZero(num){
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

export { getZero };