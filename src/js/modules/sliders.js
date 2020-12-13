const sliders = (slides, dir, prevArr, nextArr) => {
    let slideIndex = 1,
        hover = false;
        
    const items = document.querySelectorAll(slides); // We got all slides to go through and add or remove inline styles or class 

    function showSlides(n){ 
        if(n > items.length){ // When the slide = last slide 
            slideIndex = 1;   // Next slide will be first 
        }
        if(n < 1){            // Reverse to condition above 
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.remove('show');
            item.classList.add('animated', 'hide');
        });

        items[slideIndex - 1].classList.remove('hide');
        items[slideIndex - 1].classList.add('show');
    }

    showSlides(slideIndex);

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    try {
        const prev = document.querySelector(prevArr),
            next = document.querySelector(nextArr);

        prev.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });

        next.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
    } catch(e){}

    function autoSlider(){
        if(dir === 'vertical'){
            hover = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 4000);
        } else {
            hover = setInterval(() => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 4000);
        }
    }
    autoSlider();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(hover);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        autoSlider();
    });
};

export default sliders;