import {postData} from '../services/requests';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name=upload]'),
          textArea = document.querySelectorAll('textarea'),
          input = document.querySelector('.autoSend');

    const messages = { // When we writing a form func we need to create obj to keep in process of executing event
        loading: 'Loading...', // FE : LOADING WE SHOW TO USER WHEN THE INTERNET CONNECTION OS SLOW ETC.
        success: 'Success',
        fail: 'Fail',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        failure: 'assets/img/fail.png'
    };

    const path = { // When we interact with Back-End we need to choose it's file or it's just form with text
        question: 'assets/question.php',
        upload: 'assets/server.php'
    };

    upload.forEach(item => { // We go through every upload item and when we choose the file 
        item.addEventListener('input', () => { // we notify user that file is in upload and we put the name 
            let dots;                           // of the file to input 
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    const clearInputs = () => { // clearing allInputs after sending the Data
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

    input.addEventListener('drop', (e) => { // I'm proud of this code)) And the tasks that I'm not sure how to do
        const form = document.querySelector('form'); // give me more confidence and power to move forward 
        input.files = e.dataTransfer.files; // it gives me feeling than I can solve any problem
        const formData = new FormData(form);
        formData.append('file', input.files[0]); // In this code when we drop the img 
                                                // 1) We create a form to give an argument to obj FormData
        postData(path.upload, formData)         // 2) We got all information about drag&drop in prop dataTransfer 
            .then((res) => {                    // 3) We need to show in console what obj we send to back use formData.append()
                console.log(res);               // first param = 'file' it's name of the data and the second one 1st input file
                showThanksModal(input.parentNode, messages.ok, messages.success);
            })
            .catch(() => {
                showThanksModal(input.parentNode, messages.failure, messages.fail);
            })
            .finally(() => {
                clearInputs();
            });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === 'picture'){ // We got the calc here 
                for(let key in state){
                    formData.append(key, state[key]); // same thing like code above 
                }
            }

            let api; // creating api var to keep url to send data 
            item.closest('.popup-design') || item.classList.contains('calc-form')? api = path.upload : api = path.question;
            // In code above we check the closest elem to set the way of the sending to Back-End 
            postData(api, formData)
                .then(() => {
                    showThanksModal(item, messages.ok, messages.success); 
                })
                .catch(() => {
                    showThanksModal(item, messages.failure, messages.fail);
                })
                .finally(() => {
                    clearInputs();
                });
        });
    });

    function showThanksModal(item, messageImg, messageText){ // It's the beauty of Front-End 
        let statusMessage = document.createElement('div'); // We notify the user that data is send or not
        statusMessage.classList.add('status');
        item.parentNode.appendChild(statusMessage); // We creating main HTML-code statusMessage to show block of notification

        item.classList.add('animated', 'fadeOutUp'); // Animation when we will show the Message 
        setTimeout(() => {
            item.style.display = 'none';
        }, 400);

        let statusImg = document.createElement('img'); // Img inside of statusMessage
        statusImg.setAttribute('src', messages.spinner); // We give url of spinner to attribute src which build dynamic code
        statusImg.classList.add('animated','fadeInUp'); // Add animation to Img
        statusMessage.appendChild(statusImg);   //Append this to statusMessage We will show it oneModalWindow

        let textMessage = document.createElement('div'); // same thing with text like code above 
        textMessage.textContent = messages.loading; // The 1st stage it's LOADING of the elem
        statusMessage.appendChild(textMessage);

        statusImg.setAttribute('src', messageImg); // the 2nd stage is success
        textMessage.textContent = messageText; // we put the img and text to modalThanks

        setTimeout(() => { // After 4 seconds we remove statusMessage and back all changes to old version 
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInUp');
        }, 4000);
    }
};

export default forms;