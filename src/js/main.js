import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import maskNum from './modules/maskNum';
import checkLangInput from './modules/checkLangInput';
import showCard from './modules/showCard';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const state = {};

    modals();
    sliders('.main-slider-item', 'vertical');
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    forms(state);
    maskNum(['[name="phone"]']);
    checkLangInput('[name="name"]');
    checkLangInput('[name="message"]');
    showCard('.button-styles','#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price', state);

});
