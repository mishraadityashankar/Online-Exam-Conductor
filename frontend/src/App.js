import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <EditProfile></EditProfile>
      {/* <Home></Home> */}
      {/* <Register></Register> */}
    </div>
  );
}

export default App;
