import { useState } from 'react'
import './counter.css'


function CounterApp() {

    const [count, setCount] = useState(0)
   function  dicrement(){
        if(count >  0) {
       setCount(count -1 )
        }


        else if(count == 0){
            alert("counter is alrady zero")
        }

    };


    return (
        <div class="counter-container">
        <h1 class="counter-title"> Counter App</h1>
        <div class="counter-display">{count}</div>
        <div class="counter-buttons">
            <button class="btn" onClick={() => setCount(count + 1)}>+</button>
            <button class="btn" onClick={() => dicrement()}>-</button>
        </div>
        <button class="btn btn-reset" onClick={() => setCount(0)}>Reset</button>
    </div>
    )


}

export default CounterApp;