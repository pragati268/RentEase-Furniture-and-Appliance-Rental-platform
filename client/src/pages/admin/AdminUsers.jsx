import { useState, useEffect } from "react";
import { Eye, Trash2, X } from "lucide-react";
import API from "../../services/api.js";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"?`)) return;
    try {
      await API.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      setSelectedUser(null);
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-[#1f312a] mb-5">Users</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#45685A] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user.fullname?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#1f312a] truncate">{user.fullname}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                }`}>
                  {user.role}
                </span>
                <span className="text-gray-500">{user.bookingCount || 0} bookings</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-2 text-[#345246] hover:bg-[#345246]/10 rounded-lg transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleDelete(user._id, user.fullname)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-400 py-12">No users found</p>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1f312a]">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-sm font-medium text-[#1f312a]">{selectedUser.fullname}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-[#1f312a]">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium text-[#1f312a] capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Bookings</p>
                <p className="text-sm font-medium text-[#1f312a]">{selectedUser.bookingCount || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-medium text-[#1f312a]">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
