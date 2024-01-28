import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { AppContent } from "./components/AppContent/AppContent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="body">
        <AppContent />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
