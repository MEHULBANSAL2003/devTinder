import Body from "./components/Body";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const userData = useSelector((store) => store.user);
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/"
              element={!userData ? <Home /> : <Navigate to="/feed" />}
            />
            <Route
              path="/login"
              element={!userData ? <Login /> : <Navigate to="/feed" />}
            />
            <Route
              path="/signup"
              element={!userData ? <Signup /> : <Navigate to="/feed" />}
            />
            <Route
              path="/feed"
              element={userData ? <Feed /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={userData ? <Profile /> : <Navigate to="/login" />}
            />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
