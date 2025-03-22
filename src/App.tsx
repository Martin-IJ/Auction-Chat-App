import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import AllArtwork from "./pages/AllArtwork";
import ArtworkDetails from "./pages/ArtworkDetails";
import * as Ably from "ably";
import { ChatClient, ChatClientProvider, ChatRoomProvider } from "@ably/chat";
import { Messages } from "./pages/Messages";

const ablyClient = new Ably.Realtime({
  clientId: "ably-chat",
  key: "c_rswQ.Bh5qPg:QQ9E8sGbWfbmxr3ysRaa8_KKNLc-IkwFpylTmvK-b1k",
});

const chatClient = new ChatClient(ablyClient, {});

const customRoomOptions = {
  params: {
    rewind: "1m",
  },
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-artwork" element={<AllArtwork />} />
        <Route path="/artwork/:id" element={<ArtworkDetails />} />
        <Route
          path="/messages"
          element={
            <ChatClientProvider client={chatClient}>
              <ChatRoomProvider
                id="getting-started"
                options={customRoomOptions}
              >
                <Messages />
              </ChatRoomProvider>
            </ChatClientProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
