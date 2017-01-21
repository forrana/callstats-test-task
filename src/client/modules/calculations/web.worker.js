import DataProcessor from 'dataProcessor';

onmessage = function messageHandler(event) {
    if(event.data) {
        let dataProcessor = new DataProcessor(
                                    event.data.array,
                                    event.data.size
                                ),
            processedData = 0,
            progress = 5;

        while(!processedData.length) {
            processedData = dataProcessor.process();
            if (progress < processedData){
                progress += 5;
                postMessage({
                  id: '',
                  progress: progress + 9
                });
            }
        }

        let blob = new Blob([processedData.join('\r\n')], {type: 'text/csv'});

        postMessage({
          id: '',
          file: blob
        });

        close();
    } else {
        postMessage('error');
    }
};
