import {getData} from '../services/requests';

const showCard = (trigger, wrapper) => {
    const btn = document.querySelector(trigger),
          wrap = document.querySelector(wrapper);

    btn.addEventListener('click', function(){
        getData('http://localhost:3000/styles')
        .then(res => createCard(res))
        .catch(error => console.log(error))
        .finally(this.remove());
    });

    function createCard(response){
        response.forEach(({src, title, link}) => {
            const card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt="picture">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>`;
            wrap.appendChild(card);
        });
    }
};

export default showCard;