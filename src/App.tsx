import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Header from "./components/Header/Header"
import AllArtwork from "./pages/AllArtwork"
import ArtworkDetails from "./pages/ArtworkDetails"

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-artwork" element={<AllArtwork />} />
        <Route path="/artwork/:id" element={<ArtworkDetails />} />
      </Routes>
    </>
  )
}

export default App
