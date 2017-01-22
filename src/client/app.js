import StateMachine from 'stateMachine';
import styles from './styles/app.css';

/**
 * async function - Represents the main app's cycle. The app's bootstrap point.
 *
 */
(async function(){
    let result;

    do {
        let stateMachine = new StateMachine();

        result = await stateMachine.start();
    }
    while(result);
})()
