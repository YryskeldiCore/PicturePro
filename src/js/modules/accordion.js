const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);
    // Accordion JS

    let activeBtn;
    btns.forEach(btn => {
        btn.addEventListener('click', function(){ 
            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');

            if(activeBtn){
                activeBtn.classList.remove('active-style');
                activeBtn.nextElementSibling.classList.remove('active-content');
                activeBtn.nextElementSibling.style.maxHeight = '0px';
            }

            activeBtn = (activeBtn === this) ? 0 : this;
            
            if(this.classList.contains('active-style')){
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });

    //Accordion with Css      

    // contents.forEach(content  => {
    //     content.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function(){
    //         if(!this.classList.contains('active')){
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });
};

export default accordion;