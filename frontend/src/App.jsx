import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
const Login = lazy(() => import("./pages/Login"));
const Feed = lazy(() => import("./pages/Feed"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Body = lazy(() => import("./components/Body"));
const Signup = lazy(() => import("./pages/Signup"));
const EditProfile=lazy(()=>import("./pages/EditProfile"));

function App() {
  const userData = useSelector((store) => store.user);

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

   setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Suspense fallback={<Loader />}>
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
              <Route
                path="/profile/edit"
                element={userData ? <EditProfile /> : <Navigate to="/login" />}
              />
            </Route>
            
            <Route
              path="*"
              element={<Navigate to={userData ? "/feed" : "/"} />}
            />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
