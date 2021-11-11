import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Register></Register>
    </div>
  );
}

export default App;
