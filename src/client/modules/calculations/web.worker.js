import DataProcessor from 'dataProcessor';

onmessage = function messageHandler(event) {
    if(event.data) {
        let dataProcessor = new DataProcessor(
                                    event.data.array,
                                    event.data.size
                                ),
            processedData = 0,
            progress = 2.5;

        while(!Array.isArray(processedData)) {
            processedData = dataProcessor.process();
            if (progress < processedData){
                progress += 2.5;
                postMessage({
                  id: '',
                  progress: progress + 10
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
