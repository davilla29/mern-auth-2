import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
// import { ToastContainer, toast } from "react-toastify"
// import { Toaster, toast } from 'sonner';;
// import "react-toastify/dist/ReactToastify.css";
import { clearError } from "../redux/user/userSlice";

const App = () => {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message || "Something went wrong", {
        variant: "error",
      });
      dispatch(clearError());
    }
  }, [error, enqueueSnackbar, dispatch]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message || "An error occurred");
  //     dispatch(clearError());
  //   }
  // }, [error, dispatch]);

  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      {/* <Toaster position="top-right" richColors /> */}
      {/*Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
