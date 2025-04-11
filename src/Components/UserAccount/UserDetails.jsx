import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Log-in/AuthProvider';
import { User, MapPin, Phone, Mail, Pencil } from 'lucide-react';

const UserDetails = () => {
    const { userData, token } = useContext(AuthContext);
    const [editModal, setEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // State for holding user details
    const [formData, setFormData] = useState({
        name: userData.name || "",
        Address: userData.Address || "", // Ensure "Address" matches API
        number: userData.number || "",
    });

    // Open Edit Modal & Update Input Fields with Latest User Data
    const handleEditClick = () => {
        setFormData({
            name: userData.name || "",
            Address: userData.Address || "", // Keep "Address" capitalized
            number: userData.number || "",
        });
        setEditModal(true);
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/users`, 
                {
                    token: token,
                    userId: userData._id,
                    name: formData.name,
                    address: formData.Address, // Use "Address" to match API
                    number: formData.number,
                }
            );
            console.log(response.data);

            // Update userData after successful update
            userData.name = formData.name;
            userData.Address = formData.Address; // Keep uppercase "A"
            userData.number = formData.number;

            setEditModal(false);
        } catch (error) {
            console.error("Error editing user data:", error.response?.data || error);
            alert("Failed to update details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full justify-center ">
            <div className="w-full lg:w-80 bg-transparent  transition-all duration-500 cursor-pointer rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">User Details</h2>
                <div className="space-y-2">
                    <div className="flex  hover:scale-105 text-xs  transition-all duration-200 items-center space-x-3">
                        <User className="mx-1 text-second-secondary h-10  " />NAME:
                        <span className="text-gray-700  text-sm font-medium">{userData.name}</span>
                    </div>
                    <div className="flex  hover:scale-105 text-xs transition-all duration-200 items-center space-x-3">
                        <MapPin className="mx-1 text-second-secondary h-10  " />ADDRESS:
                        <span className="text-gray-700 text-sm font-medium">{userData.Address.slice(0,15)+"..."}</span> 
                        {/* Use "Address" here */}
                    </div>
                    <div className="flex  hover:scale-105 text-xs transition-all duration-200 items-center space-x-3">
                        <Phone className="mx-1 text-second-secondary h-10  " />PHONE:
                        <span className="text-gray-700 text-sm font-medium">{userData.number}</span>
                    </div>
                    <div className="flex  hover:scale-105 text-xs transition-all duration-200 items-center space-x-3">
                        <Mail className="mx-1 text-second-secondary h-10  " />EMAIL: 
                        <span className="text-gray-700 text-sm font-medium">{userData.email.slice(0,15)+"..."}</span>
                    </div>
                    <button 
                        
                        className="mt-4 px-4 py-2 w-full  text-purple-500 text-sm rounded-lg flex items-center justify-end text-center space-x-2  transition">
                        <Pencil onClick={handleEditClick}  className="w-4 h-4" /> <span onClick={handleEditClick} className='hover:underline' >Click here to Edit</span>
                    </button>
                </div>
            </div>

            {editModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit User Details</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                className="w-full p-2 border rounded" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Name"
                            />
                            <input 
                                className="w-full p-2 border rounded" 
                                name="Address" // Capitalized to match API
                                value={formData.Address} 
                                onChange={handleChange} 
                                placeholder="Address"
                            />
                            <input 
                                className="w-full p-2 border rounded" 
                                name="number" 
                                value={formData.number} 
                                onChange={handleChange} 
                                placeholder="Phone Number"
                            />
                            <div className="flex space-x-4">
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setEditModal(false)} 
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
