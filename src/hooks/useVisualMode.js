import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log(history)
  function transition(newMode, replace = false) {
    console.log("transition", newMode, replace)
    setMode(newMode) 
    if(replace){
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
    else {
    setHistory([...history, newMode])
    }
  }

  function back() {
    console.log("back", history)
    if (history.length === 1) {
      return;
    } else {
      setMode(history[history.length -2]);
      setHistory(history.slice(0, -1));
    }
  }
  return { mode, transition, back };
  }



  

