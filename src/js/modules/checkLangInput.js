const checkLangInput = (selector) => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if(e.key.match(/[^а-яё 0-9]/ig) || (input.getAttribute ('autocomplete') == 'language') == 'ru'){
                e.preventDefault();
            }
        });
    });
};

export default checkLangInput;