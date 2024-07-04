import { useEffect, useState } from "react";


function App(){
  const[socket,setSocket]=useState<WebSocket | null>(null);
  const[messages,setMessages]=useState<string[]>([]);
  const[sendMessage,setSendMessage]=useState("");
  useEffect(()=>{
    const newSocket = new WebSocket("ws://localhost:3000");
    newSocket.onopen=()=>{
      console.log("Connection Estabilished");
     
    }
    newSocket.onmessage=(message)=>{
      console.log(message.data);
      setMessages(prevMessages=> [...prevMessages,message.data]);

    }
    setSocket(newSocket);

  },[])

  if(!socket){
    return <div>
      connecting to websocker server ...
    </div>
  }
  return <div>
       
       <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
    <input type="text" placeholder="Send message" onChange={(e)=>{
      setSendMessage(e.target.value);
      
    }}/>
    <button onClick={()=>{
      socket.send(sendMessage);
    }}>Send</button>

  </div>

}

export default App;