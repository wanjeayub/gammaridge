import { useState, useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

const Users = ({ users, fetchUsers }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Open image modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Close image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Open delete modal
  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle delete request
  const handleConfirmDelete = useCallback(async () => {
    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/delete/${userToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        toast.success("User deleted successfully.");
        fetchUsers(); // Refresh users
        closeDeleteModal();
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    }
  }, [userToDelete, fetchUsers]);

  // Filter users by search query
  const filterUsersBySearch = useCallback((users, query) => {
    return users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        user.idNumber?.toString().includes(query) ||
        user.mobileNumber?.toString().includes(query) ||
        user.alternateMobileNumber?.toString().includes(query) ||
        user.idNumber?.toString().includes(query)
    );
  }, []);

  // Apply filters
  const filteredUsers = useMemo(() => {
    return filterUsersBySearch(users, searchQuery);
  }, [users, searchQuery, filterUsersBySearch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/2 px-3 py-2 border rounded-lg mb-4"
      />

      {/* User Table */}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Profile</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">ID Number</th>
            <th className="px-4 py-2 text-left">Mobile Number</th>
            <th className="px-4 py-2 text-left">Alternate Mobile Number</th>
            <th className="px-4 py-2 text-left">ID Photo Front</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2">
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-12 h-12 rounded-full cursor-pointer"
                  onClick={() => openImageModal(user.profilePhoto)}
                />
              </td>
              <td className="px-4 py-2">{user.fullName}</td>
              <td className="px-4 py-2">{user.idNumber}</td>
              <td className="px-4 py-2">{user.mobileNumber}</td>
              <td className="px-4 py-2">{user.alternateMobileNumber}</td>
              <td className="px-4 py-2">
                <img
                  src={user.idFrontPhoto}
                  alt="ID Front"
                  className="w-12 h-12 rounded-full cursor-pointer"
                  onClick={() => openImageModal(user.idFrontPhoto)}
                />
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  onClick={() => openDeleteModal(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="w-96 h-auto rounded-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Confirm Deletion</h3>
            <p className="mt-2">Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
