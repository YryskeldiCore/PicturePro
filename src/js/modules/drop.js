import {postData} from '../services/requests';
const drop = () => {
    // Drag & drop events
    // 1) drag - *(Don't use in this case)
    // 2) dragend - *(Don't use in this case)
    // 3) dragenter - object above dropArea
    // 4) dragexit - *(Don't use in this case)
    // 5) dragleave - object outside of dropArea
    // 6) dragover - object hovers above dropArea
    // 7) dragstart - *(Don't use in this case)
    // 8) drop - object sent to dropArea

    const inputFiles = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(event => {
        inputFiles.forEach(input => {
            input.addEventListener(event, preventDefaults, false);
        });
    });

    function preventDefaults(e){
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item){
        item.closest('.file_upload').style.border = '6px solid red';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0.8)';
    }

    function unhighlight(item){
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.form-select')){
            item.closest('.file_upload').style.backgroundColor = '#fff';
        }
        item.closest('.file_upload').style.backgroundColor = '#ededed';
    }

    ['dragenter', 'dragover'].forEach(event => {
        inputFiles.forEach(input => {
            input.addEventListener(event, () => highlight(input), false);
        });
    }); 

    ['dragleave', 'drop'].forEach(event => {
        inputFiles.forEach(input => {
            input.addEventListener(event, () => unhighlight(input), false);
        });
    }); 

    inputFiles.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...': dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;