import Body from "./components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Feed from "./pages/Feed";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<div>signup page</div>} />
            <Route path="/feed" element={<Feed/>}/>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      
    </>
  );
}

export default App;
