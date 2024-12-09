import { useState } from "react";
import app from "../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditUserProfile = ({ user, onSave }) => {
  // initialize firebase
  const storage = getStorage(app);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    mobile: user?.mobile || "",
    alternatemobile: user?.alternatemobile || "",
    photoURLFront: user?.photoURLFront || "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const storageRef = ref(storage, `user_photos/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFormData({ ...formData, photoURLFront: downloadURL });
        alert("Photo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("Failed to upload photo.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://gammaridge-server.vercel.app/api/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        onSave(data); // Update parent component with new user data
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-700 rounded text-white"
    >
      <h2 className="text-xl mb-4">Edit Profile</h2>
      <div className="mb-3">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border bg-gray-600 text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border bg-gray-600 text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border bg-gray-600 text-white"
        />
        <small className="text-red-400">
          Leave blank to keep current password
        </small>
      </div>
      <div className="mb-3">
        <label className="block mb-1">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border bg-gray-600 text-white"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Alternate Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.alternatemobile}
          onChange={handleChange}
          className="w-full p-2 border bg-gray-600 text-white"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Front ID Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full p-2 border bg-gray-600 text-white"
        />
        {uploading && <p className="text-gray-400">Uploading photo...</p>}
        {formData.photoURLFront && (
          <img
            src={formData.photoURLFront}
            alt="Profile Preview"
            className="mt-2 w-20 h-20 rounded-full"
          />
        )}
      </div>
      <button
        type="submit"
        className="bg-green-600 px-4 py-2 text-white rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditUserProfile;
