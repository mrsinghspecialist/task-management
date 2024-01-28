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
      <div
        className="body"
        style={{
          minHeight: "90vh",
          overflow: "auto",
          background: "whitesmoke",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <AppContent />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
