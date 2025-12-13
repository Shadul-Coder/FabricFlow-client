import { useState, useEffect } from "react";
import useSecure from "../../../hooks/useSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaEdit, FaBan, FaCheck, FaSearch, FaFilter } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";
import { useNavigate } from "react-router";

const ManageUsers = () => {
  const axios = useSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/admin/users", {
          params: { adminEmail: user?.email },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to fetch users",
        });
        // If unauthorized, redirect to dashboard
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUsers();
    }
  }, [axios, user?.email, navigate]);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle role update
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Update",
        text: `Change user role to ${newRole}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const response = await axios.patch(`/admin/users/${userId}/role`, {
          role: newRole,
          adminEmail: user?.email,
        });

        if (response.data.modifiedCount > 0) {
          // Update local state
          setUsers(
            users.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
          );

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User role updated successfully",
          });
        }
      }
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update role",
      });
    }
  };

  // Handle status update (approve)
  const handleApproveUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Approval",
        text: "Approve this user?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, approve",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const response = await axios.patch(`/admin/users/${userId}/status`, {
          status: "active",
          adminEmail: user?.email,
        });

        if (response.data.modifiedCount > 0) {
          setUsers(
            users.map((u) =>
              u._id === userId ? { ...u, status: "active" } : u
            )
          );

          Swal.fire({
            icon: "success",
            title: "Approved",
            text: "User has been approved",
          });
        }
      }
    } catch (error) {
      console.error("Error approving user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to approve user",
      });
    }
  };

  // Open suspend modal
  const openSuspendModal = (userData) => {
    setSelectedUser(userData);
    setSuspendReason("");
    setShowSuspendModal(true);
  };

  // Handle suspend user
  const handleSuspendUser = async () => {
    if (!suspendReason.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please provide a suspend reason",
      });
      return;
    }

    try {
      const response = await axios.patch(
        `/admin/users/${selectedUser._id}/status`,
        {
          status: "suspended",
          suspendReason: suspendReason,
          adminEmail: user?.email,
        }
      );

      if (response.data.modifiedCount > 0) {
        setUsers(
          users.map((u) =>
            u._id === selectedUser._id
              ? {
                  ...u,
                  status: "suspended",
                  suspendReason: suspendReason,
                }
              : u
          )
        );

        setShowSuspendModal(false);
        Swal.fire({
          icon: "success",
          title: "Suspended",
          text: "User has been suspended",
        });
      }
    } catch (error) {
      console.error("Error suspending user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to suspend user",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-(--color-heading) mb-6">
        Manage Users
      </h1>

      {/* Filters and Search */}
      <div className="bg-base-100 p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="label">
              <span className="label-text">Search Users</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="label">
              <span className="label-text">Filter by Role</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="label">
              <span className="label-text">Filter by Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {currentUsers.length} of {filteredUsers.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-base-100 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    No users found
                  </td>
                </tr>
              ) : (
                currentUsers.map((userItem) => (
                  <tr key={userItem._id} className="hover:bg-base-200">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full">
                            {userItem.photoURL ? (
                              <img
                                src={userItem.photoURL}
                                alt={userItem.name}
                                crossOrigin="anonymous"
                              />
                            ) : (
                              <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center rounded-full">
                                {userItem.name?.charAt(0) || "U"}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{userItem.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{userItem.email}</td>
                    <td>
                      <select
                        className="select select-bordered select-sm"
                        value={userItem.role}
                        onChange={(e) =>
                          handleRoleUpdate(userItem._id, e.target.value)
                        }
                      >
                        <option value="buyer">Buyer</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          userItem.status === "active"
                            ? "badge-success"
                            : userItem.status === "pending"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {userItem.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {userItem.status === "pending" && (
                          <button
                            onClick={() => handleApproveUser(userItem._id)}
                            className="btn btn-success btn-sm"
                            title="Approve User"
                          >
                            <FaCheck />
                          </button>
                        )}

                        {userItem.status !== "suspended" ? (
                          <button
                            onClick={() => openSuspendModal(userItem)}
                            className="btn btn-error btn-sm"
                            title="Suspend User"
                          >
                            <FaBan />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproveUser(userItem._id)}
                            className="btn btn-success btn-sm"
                            title="Re-activate User"
                          >
                            <FaCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4 border-t">
            <div className="join">
              <button
                className="join-item btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                «
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`join-item btn ${
                    currentPage === i + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Suspend User</h3>
            <p className="py-2">
              Are you sure you want to suspend{" "}
              <strong>{selectedUser?.name}</strong> ({selectedUser?.email})?
            </p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Suspend Reason</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Enter reason for suspension..."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                rows="3"
              />
            </div>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowSuspendModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleSuspendUser}>
                Suspend User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
