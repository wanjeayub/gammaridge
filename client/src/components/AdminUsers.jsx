import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiSearch, FiX, FiTrash2, FiImage } from "react-icons/fi";
import profile from "../assets/img/profile.jpg";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);

  // Fetch current admin ID on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentAdminId(payload.userId);
      } catch (error) {
        console.error("Failed to parse token:", error);
      }
    }
  }, []);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
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
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle delete request
  const handleConfirmDelete = useCallback(async () => {
    if (!userToDelete) {
      toast.error("No user selected for deletion.");
      return;
    }

    // Prevent admin from deleting themselves
    if (userToDelete === currentAdminId) {
      toast.error("You cannot delete your own admin account.");
      setIsDeleteModalOpen(false);
      return;
    }

    try {
      const response = await fetch(
        `https://tester-server.vercel.app/api/admin/users/delete/${userToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user.");
      }

      // Update the UI immediately by filtering out the deleted user
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userToDelete)
      );

      toast.success(data.message || "User deleted successfully.");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete user.");
    }
  }, [userToDelete, currentAdminId]);

  // Filter users by search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.idNumber?.toString().includes(searchQuery) ||
        user.mobileNumber?.toString().includes(searchQuery) ||
        user.alternateMobileNumber?.toString().includes(searchQuery)
    );
  }, [users, searchQuery]);

  // Close image modal when clicking outside or pressing Escape
  const handleImageModalClick = useCallback((e) => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      setSelectedImage(null);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle delete button click
  const handleDeleteClick = useCallback((userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">User Management</h2>
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-8 py-2 w-full border rounded-lg text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alt Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Front
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Back
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full cursor-pointer"
                          src={user.profilePhoto || profile}
                          alt="Profile"
                          onClick={() => setSelectedImage(user.profilePhoto)}
                          onError={(e) => {
                            e.target.src = profile;
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.fullName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.mobileNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.alternateMobileNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.idNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.idFrontPhoto ? (
                        <button
                          onClick={() => setSelectedImage(user.idFrontPhoto)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiImage size={20} />
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.idBackPhoto ? (
                        <button
                          onClick={() => setSelectedImage(user.idBackPhoto)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FiImage size={20} />
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDeleteClick(user._id)}
                        className={`${
                          user._id === currentAdminId
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-500 hover:text-red-700"
                        }`}
                        disabled={user._id === currentAdminId}
                        title={
                          user._id === currentAdminId
                            ? "Cannot delete your own account"
                            : ""
                        }
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {users.length === 0
                      ? "No users available"
                      : "No users match your search"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={handleImageModalClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
            >
              <FiX size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[80vh] object-contain"
              onError={(e) => {
                e.target.src = profile;
              }}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full">
            <h3 className="font-bold text-lg mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
