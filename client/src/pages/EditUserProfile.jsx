import { useState } from "react";
import app from "../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditUserProfile = ({ user, onSave }) => {
  // Initialize Firebase storage
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
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const storageRef = ref(
          storage,
          `user_photos/${Date.now()}_${file.name}`
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFormData({ ...formData, photoURLFront: downloadURL });
        alert("Photo uploaded successfully!");
      } catch (error) {
        console.error("Error uploading photo:", error);
        alert("Failed to upload photo. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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
      alert("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-800 rounded-lg shadow-lg text-white"
    >
      <h2 className="text-2xl mb-6 font-semibold text-center">Edit Profile</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
          className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Mobile</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Alternate Mobile</label>
        <input
          type="text"
          name="alternatemobile"
          value={formData.alternatemobile}
          onChange={handleChange}
          placeholder="Enter alternate mobile number"
          className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Front ID Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
        />
        {uploading && <p className="mt-2 text-green-400">Uploading photo...</p>}
        {formData.photoURLFront && (
          <img
            src={formData.photoURLFront}
            alt="Uploaded Profile Preview"
            className="mt-4 w-24 h-24 rounded-full object-cover mx-auto"
          />
        )}
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded text-white font-semibold ${
          submitting
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500"
        }`}
        disabled={submitting}
      >
        {submitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditUserProfile;
