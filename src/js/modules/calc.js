import {getData} from '../services/requests';

const calc = (size, material, options, promocode, result, state, prop = result) => {

    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    const checkState = (event, elem, prop) => {
            elem.addEventListener(event , () => {
                switch(elem.nodeName){
                    case 'INPUT':
                        state[prop] = elem.value;
                        break;
                    case 'SELECT':
                        state[prop] = elem.value;
                        break;
                }
            console.log(state);   
            });  
    };

    const arr = [sizeBlock, materialBlock, optionsBlock];
    const url = ['http://localhost:3000/sizes', 'http://localhost:3000/materials', 'http://localhost:3000/options'];

    for(let i = 0; i < url.length; i++){
        for(let j = 0; j < arr.length; j++){
            getData(url[i])
            .then(res => createSelect(res, arr[j]))
            .catch(error => console.log(error));
        }
    }

    function createSelect(response, item){
        response.forEach(({value, size, title, option, material}) => {
            const options = document.createElement('option');
            if(item.getAttribute('data-select') === 'size'){
                options.setAttribute('value', value);
                options.innerHTML = `${size}`;
                let text = options.textContent;
                if(text === 'undefined'){
                    text.parentNode.remove();
                }
            }
            if(item.getAttribute('data-select') === 'material'){
                options.setAttribute('value', value);
                options.innerHTML = `${option}`;
                let text = options.textContent;
                if(text === 'undefined'){
                    text.parentNode.remove();
                }
            }
            if(item.getAttribute('data-select') === 'options'){
                options.setAttribute('value', value);
                options.setAttribute('title', title);
                options.innerHTML = `${material}`;
                let text = options.textContent;
                if(text === 'undefined'){
                    text.parentNode.remove();
                }
            }
            item.appendChild(options);
        });
    }

    function calc(){
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if(sizeBlock.value == '' || materialBlock.value == ''){
            resultBlock.textContent = 'Пожалуйста выберите размер и материал';
        } else if (promocodeBlock.value === 'IWANTPOPART'){
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
        state[prop] = sum;
    }

    sizeBlock.addEventListener('change', calc);
    materialBlock.addEventListener('change', calc);
    optionsBlock.addEventListener('change', calc);
    promocodeBlock.addEventListener('input', calc);
    checkState('change', sizeBlock, size);
    checkState('change', materialBlock, material);
    checkState('change', optionsBlock, options);
    checkState('input', promocodeBlock, promocode);
};

export default calc;