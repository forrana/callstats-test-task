import DataProcessor from 'dataProcessor';

onmessage = function messageHandler(event) {
    if(event.data) {
        let dataProcessor = new DataProcessor(
                                    event.data.array,
                                    event.data.size
                                ),
            processedData = 0,
            progress = 0.05;

        while(!processedData.length) {
            try {
                processedData = dataProcessor.process();
            } catch (error) {
                postMessage({
                  id: '',
                  error: error
                });
            }
            if (progress < processedData){
                progress += 0.05;
                postMessage({
                  id: '',
                  progress: progress + 0.09
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
