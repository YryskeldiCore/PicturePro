import {postData} from '../services/requests';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name=upload]'),
          textArea = document.querySelectorAll('textarea');

    const messages = {
        loading: 'Loading...',
        success: 'Success',
        fail: 'Fail',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        failure: 'assets/img/fail.png'
    };

    const path = {
        question: 'assets/question.php',
        upload: 'assets/server.php'
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    
    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        });

        upload.forEach(item => {
            item.previousElementSibling.textContent = 'No file selected';
        });

        textArea.forEach(textItem => {
            textItem.value = '';
        });
    };



    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', messages.spinner);
            statusImg.classList.add('animated','fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = messages.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'picture'){
                for(let key in state){
                    formData.append(key, state[key]);
                }
            }

            let api;
            item.closest('.popup-design') || item.classList.contains('calc-form')? api = path.upload : api = path.question;
            console.log(api);

            postData(api, formData)
                .then((res) => {
                    console.log(res);
                    statusImg.setAttribute('src', messages.ok);
                    textMessage.textContent = messages.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', messages.failure);
                    textMessage.textContent = messages.fail;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 4000);
                });
        });
    });
};

export default forms;