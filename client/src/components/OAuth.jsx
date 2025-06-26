import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase"; // Adjust the import path as necessary
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      // This will open a popup for the user to sign in with Google
      const auth = getAuth(app);

      // This gives you a Google Access Token. You can use it to access the Google API
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   id_token: result.credential.idToken,
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log("Google login response:", data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to log in with Google");
      }
      // if (!res.ok) {
      //   const error = await res.text();
      //   console.error("Backend error:", error);
      //   return;
      // }
      dispatch(signInSuccess(data));
      navigate("/");

      // localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log("Could not log in with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 cursor-pointer"
    >
      Continue to Google
    </button>
  );
}
