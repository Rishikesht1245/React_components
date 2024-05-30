import React, { useState } from 'react'
import randomQuotes  from "random-quotes";
import { useEffect } from 'react';


const RandomQutoes = () => {

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const _randomQuotes = randomQuotes();
        console.log(_randomQuotes, "===randomquotes")
        setQuotes(_randomQuotes)
    },[])
  return (
    <div style={{textAlign:"center", marginTop: "5px"}}>{quotes?.body}</div>
  )
}

export default RandomQutoes