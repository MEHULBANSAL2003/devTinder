import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import { addUser } from "./redux/userSlice";
import axios from "axios";

const Login = lazy(() => import("./pages/Login"));
const Feed = lazy(() => import("./pages/Feed"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Body = lazy(() => import("./components/Body"));
const Signup = lazy(() => import("./pages/Signup"));
const EditProfile = lazy(() => import("./pages/EditProfile"));

function App() {
  const userData = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user data from backend
  const fetchUser = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/profile/view`;

    try {
      const response = await axios({
        method: "get",
        url: url,
        withCredentials: true,
      });

      dispatch(addUser(response.data.data));
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      setIsUserFetched(true);
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      dispatch(addUser(JSON.parse(storedUser)));
      setIsUserFetched(true);
    } else {
      fetchUser();
    }

    setIsLoading(false);
  }, []);

  if (isLoading || !isUserFetched) {
    return <Loader />;
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </>
  );
}

export default App;
