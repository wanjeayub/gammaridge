import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiX,
  FiTrash2,
  FiImage,
} from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  // Toggle row expansion
  const toggleRow = (userId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

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
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        throw new Error(errorData.message || "Failed to delete user.");
      }

      toast.success("User deleted successfully.");
      fetchUsers();
      closeDeleteModal();
      setExpandedRows((prev) => {
        const newState = { ...prev };
        delete newState[userToDelete];
        return newState;
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete user.");
    }
  }, [userToDelete, fetchUsers]);

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
        <div className="space-y-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="border rounded-lg overflow-hidden">
                <div
                  className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
                    expandedRows[user._id] ? "bg-gray-50" : ""
                  }`}
                  onClick={() => toggleRow(user._id)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user.profilePhoto || "https://via.placeholder.com/40"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {user.fullName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.idNumber || "No ID"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserToDelete(user._id);
                        setIsDeleteModalOpen(true);
                      }}
                      aria-label="Delete user"
                    >
                      <FiTrash2 size={16} />
                    </button>
                    {expandedRows[user._id] ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </div>
                </div>

                {expandedRows[user._id] && (
                  <div className="p-3 border-t bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium mb-1">
                          Contact Information
                        </h4>
                        <p className="text-gray-600">
                          Mobile: {user.mobileNumber || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Alt Mobile: {user.alternateMobileNumber || "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Email: {user.email || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">ID Verification</h4>
                        <div className="flex space-x-2">
                          <button
                            className="flex items-center text-blue-500 hover:text-blue-700 text-xs"
                            onClick={() => setSelectedImage(user.idFrontPhoto)}
                          >
                            <FiImage className="mr-1" /> Front
                          </button>
                          <button
                            className="flex items-center text-blue-500 hover:text-blue-700 text-xs"
                            onClick={() => setSelectedImage(user.idBackPhoto)}
                          >
                            <FiImage className="mr-1" /> Back
                          </button>
                        </div>
                        <p className="text-gray-600 mt-1">
                          Created:{" "}
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Additional Details</h4>
                        <p className="text-gray-600">Status: Active</p>
                        {/* Add more fields as needed */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <img
                src="/no-users.svg"
                alt="No users found"
                className="w-24 h-24 mb-3 opacity-70"
              />
              <p className="text-gray-500 text-sm">No users found</p>
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500";
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <FiX size={20} />
            </button>
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
                onClick={() => setIsDeleteModalOpen(false)}
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
