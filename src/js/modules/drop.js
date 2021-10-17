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

    const inputFiles = document.querySelectorAll('[name="upload"]'); // 1st 1) We got all inputs

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(event => { // We go through all needed events 
        inputFiles.forEach(input => {                                 // and hanging to each input 
            input.addEventListener(event, preventDefaults, false);   // also we send the function preventDefaults , 
        });                                                          // giving to options param = false;
    });

    function preventDefaults(e){ // function which can cancel all standart behavior of browser
        e.preventDefault();
        e.stopPropagation(); // stoping the bubbling events 
    }

    function highlight(item){ // function when we dragging file to above of the input, shows to user that this field can be 
        item.closest('.file_upload').style.border = '6px solid red';    // used to drag & drop
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0.8)';
    }

    function unhighlight(item){ // function reverse to highlight
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.form-select')){
            item.closest('.file_upload').style.backgroundColor = '#fff';
        }
        item.closest('.file_upload').style.backgroundColor = '#ededed';
    }

    ['dragenter', 'dragover'].forEach(event => {    // We calling func highlight when we executing the event in arr
        inputFiles.forEach(input => {
            input.addEventListener(event, () => highlight(input), false);
        });
    }); 

    ['dragleave', 'drop'].forEach(event => {    // The same thing like above 
        inputFiles.forEach(input => {
            input.addEventListener(event, () => unhighlight(input), false);
        });
    }); 

    inputFiles.forEach(input => {               // Here when we drop the file, we show to user than this file is in server FE,
        input.addEventListener('drop', (e) => { // changing the name of value 
            input.files = e.dataTransfer.files; // prop dataTransfer contains all Data about drag & drop
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...': dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;