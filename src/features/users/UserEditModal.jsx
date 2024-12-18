import React, { useState, useEffect } from "react";

const UserEditModal = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedUser);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">CNE</label>
            <input
              type="text"
              name="cne"
              value={editedUser.cne || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">CIN</label>
            <input
              type="text"
              name="cin"
              value={editedUser.cin || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Filiere</label>
            <input
              type="text"
              name="filiere"
              value={editedUser.filiere || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Role</label>
            <input
              type="text"
              name="role"
              value={editedUser.role || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Account Locked</label>
            <select
              name="accountLocked"
              value={editedUser.accountLocked || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
