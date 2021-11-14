import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import CreateExam from "./components/CreateExam";
import CreateQuestion from "./components/CreateQuestion";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      {/* <CreateQuestion></CreateQuestion> */}
      {/* <CreateExam></CreateExam> */}
      {/* <EditProfile></EditProfile> */}

      {/* <Home></Home> */}
      {/* <Register></Register> */}
      <MainLayout></MainLayout>
    </div>
  );
}

export default App;
