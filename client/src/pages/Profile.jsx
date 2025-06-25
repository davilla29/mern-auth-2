// import { useSelector } from "react-redux";
// import { useRef } from "react";

// const Profile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const fileRef = useRef(null);

//   return (
//     <div className="p-3 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form className="flex flex-col gap-4">
//         <input type="file" ref={fileRef} hidden accept="image/*" />
//         <img
//           src={currentUser.profilePicture}
//           alt="Profile"
//           className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"
//           onClick={() => fileRef.current.click()}
//         />
//         <input
//           defaultValue={currentUser.username}
//           type="text"
//           id="username"
//           placeholder="Username"
//           className="bg-slate-100 rounded-lg p-3"
//         />
//         <input
//           defaultValue={currentUser.email}
//           type="email"
//           id="email"
//           placeholder="Email"
//           className="bg-slate-100 rounded-lg p-3"
//         />
//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           className="bg-slate-100 rounded-lg p-3"
//         />
//         <button className="bg-slate-700 cursor-pointer text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
//           update
//         </button>
//       </form>
//       <div className="flex justify-between mt-5">
//         <span className="text-red-700 cursor-pointer">Delete account</span>
//         <span className="text-red-700 cursor-pointer">Sign out</span>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Camera } from "lucide-react"; // If using lucide-react
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"; // Ensure you have firebase storage set up
import { app } from "../firebase"; // Adjust the import path as necessary
import { set } from "mongoose";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div
          className="relative w-28 h-28 self-center cursor-pointer group"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-slate-200"
          />
          <div className="absolute inset-0 bg-gray-200 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
