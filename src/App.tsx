import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./layout/Nav";
import Footer from "./layout/Footer";
import Router from "./router/Router";

function App() {
 

  return (
    <BrowserRouter>
      <Nav/>
      <div className="mt-20">
        <Router/>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
