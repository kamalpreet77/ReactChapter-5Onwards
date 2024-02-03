import {useEffect,useState} from 'react';
function Stopwatch(){
    const [startTime, setStartTime]=useState(null);
    const [running, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    function handleStart(){
        setStartTime(new Date());
        setRunning(true);
        console.log(startTime)

    }
    function handleStop(){
        if(running){
            const now = new Date();
            const elapsed = now - startTime;
            setElapsedTime(elapsedTime + elapsed);
            setRunning(false);
        }
        console.log(elapsedTime)
    }
    function handleReset(){
        setStartTime(null);
        setElapsedTime(0);
        setRunning(false);
    }
    useEffect(() => {
        let timer;
        if (running) {
          timer = setInterval(() => {
            const now = new Date();
            const elapsed = now - startTime;
            setElapsedTime(elapsedTime + elapsed);
          }, 100);
        }
    
        return () => {
          clearInterval(timer);
        };
      }, [running, startTime, elapsedTime]);
    
      const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };

    return (
        <>
        <button onClick={handleStart}>StartButton</button>
        <button onClick={handleStop}>StopButton</button>
        <button onClick={handleReset}>ResetButton</button>
        <div>{formatTime(elapsedTime)}</div>
        </>
    )
    
}
export default Stopwatch;