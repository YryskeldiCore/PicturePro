const adaptScreen = (trigger, menu) => {
    const burgerBtn = document.querySelector(trigger),
          burgerMenu = document.querySelector(menu);

    burgerMenu.style.display = 'none';

    burgerBtn.addEventListener('click', () => {
        if(burgerMenu.style.display == 'none' && window.screen.availWidth < 993){
            burgerMenu.style.display = 'block';
        } else {
            burgerMenu.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if(burgerMenu.style.display == 'block'){
            burgerMenu.style.display = 'none';
        }
    });
};

export default adaptScreen;