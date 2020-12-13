const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector); // 1) We got all accordion-btns
    // Accordion JS

    let activeBtn; // Create var for checking is this Btn is active or not?
    btns.forEach(btn => { // This loop go through all btns 
        btn.addEventListener('click', function(){  // and hangs event handler 
            this.classList.toggle('active-style'); // "this" is btn which we can click & we toggle 'active-style'
            this.nextElementSibling.classList.toggle('active-content'); // Doing same thing with 'active-content'

            if(activeBtn){ // activeBtn = true 
                activeBtn.classList.remove('active-style'); // Doing this code 
                activeBtn.nextElementSibling.classList.remove('active-content');
                activeBtn.nextElementSibling.style.maxHeight = '0px';
            }

            activeBtn = (activeBtn === this) ? 0 : this; // Set the activeBtn when we loop again this check is work 
            
            if(this.classList.contains('active-style')){ // We're manipulate with css using scrollHeight to drop down
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px'; // if not we put 0 to prop "maxHeight"
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