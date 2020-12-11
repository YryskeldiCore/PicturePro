const scrolling = (arrUp) => {
    const arrowUp = document.querySelector(arrUp);

    window.addEventListener('scroll', () => {
        if(window.document.documentElement.scrollTop > 1650){
            arrowUp.classList.add('animated', 'fadeIn');
            arrowUp.classList.remove('fadeOut');
        } else {
            arrowUp.classList.add('fadeOut');
            arrowUp.classList.remove('fadeIn');
        }
    });
    
    // Scrolling with RequestAnimFrame

    const triggers = document.querySelectorAll('[href^="#"]'),
          speed = 0.5;
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e){
            e.preventDefault();
            let scrollTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            
            requestAnimationFrame(step);

            function step(time){
                if(start === null){
                    start = time;
                }

                let progress = time - start,
                r = (toBlock < 0 ? Math.max(scrollTop - progress/speed, scrollTop + toBlock): Math.min(scrollTop + progress/speed, scrollTop + toBlock));

                document.documentElement.scrollTo(0 , r);

                if(r != scrollTop + toBlock){
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

    // Pure JavaScript scrolling

    // const element = document.documentElement,
    //       body = document.body;

    // const calcScroll = () => {
    //     arrowUp.addEventListener('click', function(e){
    //         let scrollTop = Math.round(element.scrollTop || body.scrollTop);
    //         console.log(scrollTop); // We get length to top of the body or main page FE: 5600px

    //         if(this.hash !== ''){
    //             console.log(this.hash); // We get '#up'
    //             e.preventDefault();
    //             let hashElem = document.querySelector(this.hash),
    //                 hashElemTop = 0;
    //                 console.log(hashElem); // We get HTMLElem <header id="up"></header>

    //             while(hashElem.offsetParent){
    //                 hashElemTop += hashElem.offsetTop;
    //                 hashElem = hashElem.offsetParent;
    //             }

    //             hashElemTop = Math.round(hashElemTop);
    //             smoothScroll(scrollTop, hashElemTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => { // from = scrollTop, to = hashElemTop, hash = this.hash
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;

    //     if(to > from){
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }
    //     console.log(to);
    //     console.log(from);

    //     const move = setInterval(function(){
    //         const scrollTop = Math.round(element.scrollTop || body.scrollTop);

    //         if(prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to)||
    //             (to < from && scrollTop <= to)
    //             ) {
    //                 clearInterval(move);
    //                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash); // $ - it's the end of string
    //                 console.log(history);                                                                           // We change #up to end of string to 
    //                 console.log(history.state);                                                                     // empty string and add hash = this.hash which means => #up
    //                 console.log(document.title);
    //                 console.log(location.href.replace(/#.*$/g, '') + hash);
    //             } else {
    //                 body.scrollTop += speed;
    //                 element.scrollTop += speed;
    //                 prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };
    // calcScroll();
};

export default scrolling;