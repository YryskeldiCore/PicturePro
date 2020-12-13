const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = document.querySelectorAll('li'),
          contentAll = document.querySelectorAll('.portfolio-block.all'),
          noPortfolio = document.querySelector('.portfolio-no');

    function Filter (currentTarget, contents){
        contents.forEach(content => {
            let isCurrentTarget = !content.classList.contains(currentTarget);
            // isCurTarget don't contains currentTarget , I mean isCurTarget = false;
            if(currentTarget === ''){ // if currentTarget's data-attribute === empty str,
                noPortfolio.style.display = 'block'; // we put no-portfolio to display: block
                noPortfolio.classList.add('animated', 'fadeIn'); // and call the animation of fadeIn
            } else {
                noPortfolio.style.display = 'none'; // if no empty doing reverse operation
                noPortfolio.classList.remove('animated', 'fadeIn');
            }

            if(isCurrentTarget){ // if isCurTarget = false 
                content.style.display = 'none'; // we executing this code
                content.classList.remove('animated', 'fadeIn');
            } else {
                content.style.display = 'block'; // if isCurTarget = true 
                content.classList.add('animated', 'fadeIn'); // we execute this code
            }
        });
    }

    menu.addEventListener('click', (e) => {
        let target = e.target;
        if(target && target.matches('li')){
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
            let data = target.dataset.filter; // We got an elem from data-attribute = "filter"
            Filter(data, contentAll); // and send the param to func Filter 
        }
    });
};

export default filter;