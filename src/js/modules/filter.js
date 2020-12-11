const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = document.querySelectorAll('li'),
          contentAll = document.querySelectorAll('.portfolio-block.all'),
          noPortfolio = document.querySelector('.portfolio-no');

    function Filter (currentTarget, contents){
        contents.forEach(content => {
            let isCurrentTarget = !content.classList.contains(currentTarget);

            if(currentTarget === ''){
                noPortfolio.style.display = 'block';
                noPortfolio.classList.add('animated', 'fadeIn');
            } else {
                noPortfolio.style.display = 'none';
                noPortfolio.classList.remove('animated', 'fadeIn');
            }

            if(isCurrentTarget){
                content.style.display = 'none';
                content.classList.remove('animated', 'fadeIn');
            } else {
                content.style.display = 'block';
                content.classList.add('animated', 'fadeIn');
            }
        });
    }

    menu.addEventListener('click', (e) => {
        let target = e.target;
        if(target && target.matches('li')){
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
            let data = target.dataset.filter;
            console.log(data);
            Filter(data, contentAll);
        }
    });
};

export default filter;