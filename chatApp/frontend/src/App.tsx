import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [sendMessage, setSendMessage] = useState("");
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3000");
    newSocket.onopen = () => {
      console.log("Connection Estabilished");
    };
    newSocket.onmessage = (message) => {
      console.log(message.data);
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
    setSocket(newSocket);
  }, []);

  if (!socket) {
    return <div>connecting to websocker server ...</div>;
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-600">
      <div className="bg-white h-3/6 w-1/4 rounded drop-shadow-lg border-2 border-slate-200 overflow-y-auto">
        <div className="text-xl ">
          {messages.map((msg, index) => (
            <div className="pl-2 bg-slate-300 mb-1" key={index}>{msg}</div>
          ))}
        </div>
      </div>
      <div className="flex pt-2">
          <div>
          <input
            className="h-8 w-72 rounded text-center border-2 border-slate-900"
            type="text"
            placeholder="Send message"
            onChange={(e) => {
              setSendMessage(e.target.value);
            }}
          />
          </div>
          <button
            className="bg-slate-900 text-white rounded h-8 w-12 ml-3"
            onClick={() => {
              socket.send(sendMessage);
             
            }}
          >
            Send
          </button>
        </div>
    </div>
  );
}

export default App;
