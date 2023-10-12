import CardContainer from "./component/card_container";
import Header from "./component/header";
import "./App.css";
import Footer from "./component/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Cards-Matching-Game</h1>
      <CardContainer />
      <div className="footer-section">
        <Footer />
      </div>
    </div>
  );
}

export default App;
