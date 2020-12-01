const modals = () => {
    let btnPressed = false;

    function openModal(modal){
        const scroll = calcScroll();
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

                if(e.target){
                    e.preventDefault();
                }
                if(destroy){
                    btn.remove();
                }

                btnPressed = true;

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


    function calcScroll(){
        const div = document.createElement('div');
        div.style.height = '50px';
        div.style.width = '50px';
        div.style.visibility = 'hidden';
        div.style.overflowY = 'scroll';
        document.body.appendChild(div);

        const scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        return scrollWidth;
    }


    function showModalByTime(selector, time){
        const windows = document.querySelectorAll('[data-modal]');
        setTimeout(() => {
            let display;

            windows.forEach(window => {
                if(getComputedStyle(window).display !== 'none'){
                    display = 'block';
                }
            });

            if(!display){
                openModal(document.querySelector(selector));
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