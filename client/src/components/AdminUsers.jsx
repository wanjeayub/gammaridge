import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://tester-server.vercel.app/api/admin/users",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users.");
      setUsers([]); // Reset users state on error
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, []);

  // Call fetchUsers on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
    if (!userToDelete) {
      toast.error("No user selected for deletion.");
      return;
    }

    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/users/delete/${userToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Log the error response
        console.error("Delete error:", errorData);
        throw new Error(errorData.message || "Failed to delete user.");
      }

      toast.success("User deleted successfully.");
      fetchUsers(); // Refresh users after deletion
      closeDeleteModal();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete user.");
    }
  }, [userToDelete, fetchUsers]);

  // Filter users by search query
  const filterUsersBySearch = useCallback((users, query) => {
    if (!query) return users; // Return all users if search query is empty

    return users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        user.idNumber?.toString().includes(query) ||
        user.mobileNumber?.toString().includes(query) ||
        user.alternateMobileNumber?.toString().includes(query)
    );
  }, []);

  // Apply filters
  const filteredUsers = useMemo(() => {
    return filterUsersBySearch(users, searchQuery);
  }, [users, searchQuery, filterUsersBySearch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {/* Search Input with Clear Button */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-0 top-0 mt-2 mr-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Profile</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">ID Number</th>
                  <th className="px-4 py-2 text-left">Mobile Number</th>
                  <th className="px-4 py-2 text-left">
                    Alternate Mobile Number
                  </th>
                  <th className="px-4 py-2 text-left">ID Photo Front</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2">
                        <img
                          src={
                            user.profilePhoto ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Profile"
                          className="w-12 h-12 rounded-full cursor-pointer"
                          onClick={() => openImageModal(user.profilePhoto)}
                        />
                      </td>
                      <td className="px-4 py-2">{user.fullName || "N/A"}</td>
                      <td className="px-4 py-2">{user.idNumber || "N/A"}</td>
                      <td className="px-4 py-2">
                        {user.mobileNumber || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {user.alternateMobileNumber || "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={
                            user.idFrontPhoto ||
                            "https://via.placeholder.com/150"
                          }
                          alt="ID Front"
                          className="w-12 h-12 rounded-full cursor-pointer"
                          onClick={() => openImageModal(user.idFrontPhoto)}
                        />
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => openDeleteModal(user._id)}
                          aria-label="Delete user"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 text-center">
                      {/* No Users Found State */}
                      <div className="flex flex-col items-center justify-center py-8">
                        <img
                          src="/no-users.svg" // Add a relevant illustration
                          alt="No users found"
                          className="w-32 h-32 mb-4"
                        />
                        <p className="text-gray-600">No users found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={closeImageModal}
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="w-96 h-auto rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150"; // Fallback image
              }}
            />
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
              aria-label="Close image modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
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
