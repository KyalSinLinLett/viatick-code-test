import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Map } from "./pages/Map";
import { Upload } from "./pages/Upload";

function App() {
    return (
        <div className="App">
            <Header />
            <main className="main-section">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/map/:id" element={<Map />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
