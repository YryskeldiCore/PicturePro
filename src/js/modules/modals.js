const modals = () => {
    let btnPressed = false; // this var is for showModalByScroll to open later or not

    function openModal(modal){
        const scroll = calcScroll(); // number of px which hide the scroll 
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        if(document.querySelector('.fixed-gift')){
            document.querySelector('.fixed-gift').style.marginRight = `${scroll}px`;
        }
        document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal(modal){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        if(document.querySelector('.fixed-gift')){
            document.querySelector('.fixed-gift').style.marginRight = `0px`;
        }
        document.body.style.marginRight = `0px`;
    }

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false){
        const btns = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');
        
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {

                if(e.target){ // if it's link we cancel the base behavior of browser 
                    e.preventDefault();
                }

                if(destroy){ // we give the param to bindModal if true FE: gift-btn this btn will remove others not
                    btn.remove();
                }

                btnPressed = true; // if true we won't open the modal by scroll

                windows.forEach(window => {
                    closeModal(window);
                });
                openModal(modal);
            });
        });

        close.addEventListener('click', () => {
                closeModal(modal);
        });

        modal.addEventListener('click', (e) => {
            if(e.target == modal){
                closeModal(modal);
            }
        });

        window.addEventListener('keydown', (e) => {
            if(e.code == 'Escape'){
                closeModal(modal);
            }
        });
    }

    function calcScroll(){ // In this func we hide the scroll at right side to correct positioning of gift
        const div = document.createElement('div');
        div.style.height = '50px';
        div.style.width = '50px';
        div.style.visibility = 'hidden';
        div.style.overflowY = 'scroll';
        document.body.appendChild(div);

        const scrollWidth = div.offsetWidth - div.clientWidth;
        // offsetWidth returns the width of Elem 
        // clientWidth returns client width it means without scroll padding and margin 
        div.remove();
        return scrollWidth; // it's number of px counted in func 
    }

    function showModalByTime(selector, time){
        const windows = document.querySelectorAll('[data-modal]'); // We got all modalWindows to getComputedStyle
        setTimeout(() => {
            let display; // We need to create this var for keeping Boolean value which we got from computedStyle

            windows.forEach(window => {
                if(getComputedStyle(window).display !== 'none'){ // We got from computedStyle displayValue if it's not 'none'
                    display = 'block';                           // We got dipslay var from above and give the value 'display'
                }
            });

            if(!display){ // If display = block We can't open in future modalWindow 
                openModal(document.querySelector(selector)); // if display can't get the value it will openModal 
            }

        }, time);
    }
    
    function showModalByScroll(selector){
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight/1.001)){
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift','.popup-gift', '.popup-gift .popup-close', true);
    showModalByTime('.popup-consultation', 60000);
    showModalByScroll('.fixed-gift');
};

export default modals;