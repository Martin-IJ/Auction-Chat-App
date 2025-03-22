import { Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import AllArtwork from "./pages/AllArtwork";
import ArtworkDetails from "./pages/ArtworkDetails";
import * as Ably from "ably";
import { ChatClient, ChatClientProvider, ChatRoomProvider } from "@ably/chat";
import { Messages } from "./pages/Messages";

const ablyApiKey = import.meta.env.VITE_ABLY_API_KEY;

const ablyClient = new Ably.Realtime({
  clientId: "ably-chat",
  key: ablyApiKey,
});

const chatClient = new ChatClient(ablyClient, {});

const customRoomOptions = {
  params: {
    rewind: "1m",
  },
};

const MessagesWithChatRoom = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider id={`artwork-${id}`} options={customRoomOptions}>
        <Messages />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-artwork" element={<AllArtwork />} />
        <Route path="/artwork/:id" element={<ArtworkDetails />} />
        <Route path="/messages/:id" element={<MessagesWithChatRoom />} />
      </Routes>
    </>
  );
}

export default App;