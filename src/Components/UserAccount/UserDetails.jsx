import React, { useContext, useState } from 'react';
import { AuthContext } from '../Log-in/AuthProvider';
import { User, MapPin, Phone, Mail, Pencil } from 'lucide-react';

const UserDetails = () => {
    const { userData } = useContext(AuthContext);
    const [editModal, setEditModal] = useState(false);
    const [formData, setFormData] = useState({ ...userData });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditModal(false);
        // Handle update logic here
    };

    return (
        <div className="flex justify-center items-center min-h-full bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">User Details</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <User className="text-blue-500 text-lg" />
                        <span className="text-gray-700 font-medium">{userData.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MapPin className="text-red-500 text-lg" />
                        <span className="text-gray-700 font-medium">{userData.Address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="text-green-500 text-lg" />
                        <span className="text-gray-700 font-medium">{userData.number}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="text-yellow-500 text-lg" />
                        <span className="text-gray-700 font-medium">{userData.email}</span>
                    </div>
                    <button onClick={() => setEditModal(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2">
                        <Pencil className="w-4 h-4" /> <span>Edit</span>
                    </button>
                </div>
            </div>
            {editModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit User Details</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input className="w-full p-2 border rounded" name="name" value={formData.name} onChange={handleChange} />
                            <input className="w-full p-2 border rounded" name="Address" value={formData.Address} onChange={handleChange} />
                            <input className="w-full p-2 border rounded" name="number" value={formData.number} onChange={handleChange} />
                            <div className="flex space-x-4">
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">Save</button>
                                <button onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
