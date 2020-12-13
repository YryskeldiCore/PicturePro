const maskNum = (selector) => {
    const inputs = document.querySelectorAll(selector);
    
    function mask(event){
        let matrix = '+7 (___) ___ __ __', // 1) We creating matrix I mean musk example 
            i = 0,                         // iteration letter
            def = matrix.replace(/\D/g, ''), // def replacing no-digit symbols from musk to ''
            val = this.value.replace(/\D/g, ''); // We got value from input here and also replacing
                                                 // no-digit to ''
        if(def.length >= val.length){ // if def.length(18) >= val.length
            val = def;                 // We assign def to val 
        }

        this.value = matrix.replace(/./ig, function(a){ // In this code we have input(this.value) we replace all letters to func.value
            return /[_\d]/.test(a) && i <= val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });  // a - param which take every value from this.value 
             // and a will pass through func and return right value 
             // /[_\d]/ - range from 0 - 9 exception str. 
             // test() - method which test regExp above and return true or false 
             // charAt() - returns a new string consisting of the single UTF-16 code unit located at the specified offset into the string. 
        if(event.type === 'blur'){ // When we hovering out of input executing event = blur 
            if(this.value.length == 2){
                this.value = '';
                this.style.border = '1px solid red';
                const showValid = document.createElement('div');
                showValid.style.display = 'block';
                showValid.textContent = 'Вы не ввели номер';
                showValid.style.textAlign = 'center';
                showValid.style.color = 'red';
                showValid.style.width = '100%';
                this.insertAdjacentElement('afterend', showValid);
                setTimeout(() => {
                    showValid.remove();
                }, 3000);
            }
        } else {
            setCursorPosition(this.value.length, this);
            this.style.border = 'none';
        }
    }
    
    function setCursorPosition(pos, elem){
        elem.focus(); // We are focusing to start of input
        if (elem.setSelectionRange){ // if we have set selectionRange we set the pos which comes from "this.value.length"
            elem.setSelectionRange(pos, pos); // this condition executes when type of input is "PhoneMusk"
        } else if (elem.createTextRange){ // if not we need to createTextRange (this condition for input type= name, comment etc)
            let range = elem.createTextRange(); 
            range.collapse(true); // collapsing from end of input to start 
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    inputs.forEach(input => {
        input.addEventListener('mouseup', mask, (e) => {
            e.preventDefault();
            input.setSelectionRange(4); // At this code I solve this problem with event 'mouseup' 
        });                             // when we hover the cursor its automatically put after musk
        input.addEventListener('keyup', mask, (e) => { // if we move cursor with key its back to 4 pos 
            if(e.code === 'ArrowLeft'){
                e.preventDefault();
                input.setSelectionRange(4);
            }
        });
        input.addEventListener('input', mask);
        input.addEventListener('focus', mask);
        input.addEventListener('blur', mask);
    });
};

export default maskNum;

// 2nd type of MuskNum

// function maskNum(selector, masked = '+7 (___) ___-__-__') {
// 	const elems = document.querySelectorAll(selector);

// 	function mask(event) {
// 		const keyCode = event.keyCode;
// 		const template = masked,
// 			def = template.replace(/\D/g, ""),
// 			val = this.value.replace(/\D/g, "");
// 		console.log(template);
// 		let i = 0,
// 			newValue = template.replace(/[_\d]/g, function (a) {
// 				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
// 			});
// 		i = newValue.indexOf("_");
// 		if (i !== -1) {
// 			newValue = newValue.slice(0, i);
// 		}
// 		let reg = template.substr(0, this.value.length).replace(/_+/g,
// 			function (a) {
// 				return "\\d{1," + a.length + "}";
// 			}).replace(/[+()]/g, "\\$&");
// 		reg = new RegExp("^" + reg + "$");
// 		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
// 			this.value = newValue;
// 		}
// 		if (event.type === "blur" && this.value.length < 5) {
// 			this.value = "";
// 		}

// 	}

// 	for (const elem of elems) {
// 		elem.addEventListener("input", mask);
// 		elem.addEventListener("focus", mask);
// 		elem.addEventListener("blur", mask);
// 	}	
// }

// export default maskNum;