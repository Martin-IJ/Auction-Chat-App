import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Message, useMessages } from "@ably/chat";
import { artworks } from "@/db/artworks";

export function Messages() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const artwork = id ? artworks[parseInt(id, 10)] : undefined;

  // Load messages from localStorage when component mounts
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages-artwork-${id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [id]);

  const { send } = useMessages({
    roomId: `artwork-${id}`,
    listener: (event: { message: Message }) => {
      console.log("Received message:", event.message);

      setMessages((prev) => {
        const updatedMessages = [...prev, event.message];
        localStorage.setItem(
          `messages-artwork-${id}`,
          JSON.stringify(updatedMessages)
        );
        return updatedMessages;
      });
    },
  });

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const newMessage = { text: message, timestamp: Date.now() };

      await send(newMessage);
      console.log("Sent message:", message);
      setMessage(""); // Clear input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        minWidth: "400px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {artwork && (
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          {artwork.title} Chat Room
        </h1>
      )}
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
              {msg.timestamp
                ? new Date(msg.timestamp).toLocaleTimeString()
                : "Unknown time"}
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
