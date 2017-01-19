import Worker from './web.worker';
import styles from './styles/app.css';

let fileUploader = document.querySelector('#fileUploder'),
    button = document.querySelector('.button'),
    loader = document.querySelector('#loader'),
    resultLink = document.querySelector('#resultLink'),
    uploadedFile,
    interval;

let processFile = () => {
    let fr = new FileReader();
    button.removeEventListener('click', startListener);
    button.innerHTML = '<span id="timer"></span>';

    fr.onload = function(e) {
        let inputArray = e.target.result.split('\n'),
            worker = new Worker,
            startTime;

        inputArray = inputArray.map(value => +value);
        console.info('start processing', new Date().getTime());
        startTime = Date.now();

        interval = setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
        }, 100);

        worker.postMessage({
                                size: 1000,
                                array: inputArray
                            });

        worker.onmessage = function(event) {
            console.info('end processing', new Date().getTime());
            clearInterval(interval);
            loader.style.display = 'none';

            resultLink.download = 'results.csv';
            resultLink.href = window.URL.createObjectURL(event.data.file);

            button.classList.remove('button_start');
            button.classList.add('button_download');
            button.classList.add('pulse');
        }
    };
    fr.readAsText(uploadedFile);
}

let startListener = event => {
    processFile();
    button.classList.remove('button_start');
    button.classList.add('processing');
    loader.style.display = 'block';
}

fileUploder.addEventListener('change', event => {
    button.classList.add('button_start');
    button.innerHTML = 'Start';

    button.addEventListener('click', startListener);

    uploadedFile = event.target.files[0];
})
