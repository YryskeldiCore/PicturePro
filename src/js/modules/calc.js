import {getData} from '../services/requests';

const calc = (size, material, options, promocode, result, state, prop = result) => {

    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

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
                if(options.innerHTML === 'undefined'){
                    options.outerHTML = '';
                }
            }
            if(item.getAttribute('data-select') === 'material'){
                options.setAttribute('value', value);
                options.innerHTML = `${material}`;
                if(options.innerHTML === 'undefined'){
                    options.outerHTML = '';
                }
            }
            if(item.getAttribute('data-select') === 'options'){
                options.setAttribute('value', value);
                options.setAttribute('title', title);
                options.innerHTML = `${option}`;
                if(options.innerHTML === 'undefined'){
                    options.outerHTML = '';
                }
            }
            item.appendChild(options);
        });
    }

    const calc = () => {
        const sizeValue = document.querySelector('select#size'),
              materialValue = document.querySelector('select#material'),
              optionsValue = document.querySelector('select#options');
              
        sum = Math.round((+sizeValue.value) * (+materialValue.value) + (+optionsValue.value));

        if(sizeValue.value == '' || isNaN(materialValue.value) || isNaN(optionsValue.value)){
            resultBlock.textContent = 'Пожалуйста выберите размер и материал';
        } else if (promocodeBlock.value === 'IWANTPOPART'){
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
        state[prop] = sum;

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

        checkState('change', sizeValue, size);
        checkState('change', materialValue, material);
        checkState('change', optionsValue, options);
        checkState('input', promocodeBlock, promocode);
    };

    const form = document.querySelector('.form.form-select');

    form.addEventListener('change', (e) => {
        let target = e.target;
        if(target && target.matches('select')){
            calc();
        }
    });

    promocodeBlock.addEventListener('input', calc);
};
export default calc;