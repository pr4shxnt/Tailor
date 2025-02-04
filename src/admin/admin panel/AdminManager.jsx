import React, { useState, useEffect } from "react";
import axios from "axios";
import { EyeIcon, PenBox, Trash2, XCircle } from "lucide-react";

const AdminHandling = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [editAdmin, setEditAdmin] = useState({ id: "", username: "", email: "", password: "", oldPassword: "" });
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins`)
      .then((response) => setAdmins(response.data))
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/admins`, newAdmin)
      .then((response) => {
        setAdmins([...admins, response.data]);
        setNewAdmin({ username: "", email: "", password: "", confirmPassword: "" });
      })
      .catch((error) => console.error("Error adding admin:", error));
  };

  const handleEditAdmin = (e) => {
    e.preventDefault();
    if (!editAdmin.oldPassword) {
      alert("Please enter the old password.");
      return;
    }
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/admins/${editAdmin.id}`, editAdmin)
      .then((response) => {
        setAdmins(
          admins.map((admin) => (admin._id === editAdmin.id ? response.data : admin))
        );
        setShowModal(false);
        setEditAdmin({ id: "", username: "", email: "", password: "", oldPassword: "" });
      })
      .catch((error) => {
        console.error("Error updating admin:", error);
        alert("Failed to update admin. Please try again.");
      });
  };

  const handleDeleteAdmin = (id) => {
    setDeleteAdminId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (!deletePassword) {
      alert("Please enter the password.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/admins/validatePassword/${deleteAdminId}`, { password: deletePassword })
      .then((response) => {
        if (response.data.isValid) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/admins/${deleteAdminId}`)
            .then(() => {
              setAdmins(admins.filter((admin) => admin._id !== deleteAdminId));
              setShowModal(false);
              setDeletePassword("");
            })
            .catch((error) => console.error("Error deleting admin:", error));
        } else {
          alert("Incorrect password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error validating password:", error);
        alert("Failed to validate password. Please try again.");
      });
  };

  // Handle opening the update password modal
  const handleUpdatePassword = (id) => {
    setShowPasswordModal(true);
    setEditAdmin({ ...editAdmin, id });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }
    if (!oldPassword) {
      alert("Please enter your old password.");
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      alert("Please enter a new password and confirm it.");
      return;
    }

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/admins/updatePassword/${editAdmin.id}`, {
        oldPassword,
        newPassword
      })
      .then((response) => {
        alert("Password updated successfully!");
        setShowPasswordModal(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      });
  };

  return (
    <div className="md:p-8 w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Admin Management</h1>

      <form onSubmit={handleAddAdmin} className="mb-8 flex flex-col w-full ">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newAdmin.username}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          value={newAdmin.confirmPassword}
          onChange={handleInputChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Admin
        </button>
      </form>

      <ul className="gap-3 w-full grid grid-rows md:grid-cols-2 ">
        {admins.map((admin) => (
          <li key={admin._id} className="flex w-full gap-10 justify-between items-center bg-gray-100 p-4 rounded-md">
            <div className="flex flex-col">
              <span>username:  {admin.username}</span>
              <span>email: {admin.email}</span>
            </div>
            <div className="flex  flex-col gap-2">
              <button
                onClick={() => handleUpdatePassword(admin._id)}
                className="bg-yellow-500 text-white p-2 rounded-md"
              >
                <PenBox />
              </button>
              <button
                onClick={() => handleDeleteAdmin(admin._id)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <Trash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showPasswordModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Password</h2>
              <button onClick={() => setShowPasswordModal(false)}>
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <input
              type="password"
              placeholder="Enter your old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <div className="flex justify-between">
              <button
                onClick={handlePasswordChange}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete Admin</h2>
            <input
              type="password"
              placeholder="Enter password to confirm"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
            />
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHandling;
