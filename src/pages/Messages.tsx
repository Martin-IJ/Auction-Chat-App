import { useState } from "react";
import { Message, useMessages } from "@ably/chat";

export function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { send } = useMessages({
    listener: (event: { message: Message }) => {
      console.log("received message", event.message);
      setMessages((prev) => [...prev, event.message]);
    },
  });

  const handleSend = async () => {
    try {
      await send({ text: message });
      console.log("sent message", message);
      setMessage("");
    } catch (error) {
      console.error("error sending message", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        minWidth: "400px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="messages-container"
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#f8f9fa",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message"
            style={{
              backgroundColor: "white",
              padding: "10px 15px",
              borderRadius: "12px",
              marginBottom: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              maxWidth: "80%",
            }}
          >
            <div
              style={{ fontSize: "0.8em", color: "#666", marginBottom: "4px" }}
            >
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <div style={{ wordBreak: "break-word", color: "#333" }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div
        className="input-container"
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #e0e0e0",
            fontSize: "16px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
