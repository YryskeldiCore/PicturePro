const maskNum = (selector) => {

    function setCursorPosition(pos, elem){
        elem.focus();
        if (elem.setSelectionRange){
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange){
            let range = elem.createTextRange();
        
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    
    function mask(event){
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
        
        if(def.length >= val.length){
            val = def;
        }

        this.value = matrix.replace(/./ig, function(a){
            return /[_\d]/.test(a) && i <= val.length ? val.charAt(i++) : i >= val.length ? '' : a; 
        });

        if(event.type === 'blur'){
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

    const inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('mouseup', mask, (e) => {
            e.preventDefault();
            input.setSelectionRange(4);
        });
        input.addEventListener('keyup', mask, (e) => {
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