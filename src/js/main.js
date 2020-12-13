import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import maskNum from './modules/maskNum';
import checkLangInput from './modules/checkLangInput';
import showCard from './modules/showCard';
import calc from './modules/calc';
import filter from './modules/filter';
import PictureHover from './modules/pictureHover';
import accordion from './modules/accordion';
import adaptScreen from './modules/adaptScreen';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

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
    filter();
    PictureHover('.sizes-block');
    accordion('.accordion-heading');
    adaptScreen('.burger', '.burger-menu');
    scrolling('.pageup');
    drop();
});
