import React, { useState, useEffect } from "react";
import { Roles } from "../../shared/constantes/Roles";

const UserEditModal = ({ user, onSave, onClose, errorValidation }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [newPassword, setNewPassword] = useState("");  
  const [isPasswordSend, setIsPasswordSend] = useState(false); // Track if the password has been changed

  useEffect(() => {
    setEditedUser(user);
    setNewPassword("");  // Reset the password each time the user changes
    setIsPasswordSend(false);  // Reset isPasswordSend
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "accountLocked") {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value === "true", 
      }));
    } else {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);  
    if (password.length === 1 && !isPasswordSend) {
      setIsPasswordSend(true); 
    }
  };

  const handleSave = () => {
    const updatedUser = { ...editedUser };
    if (isPasswordSend) {
      updatedUser.password = newPassword;  
    }
    updatedUser.isPasswordSend = isPasswordSend;  
    onSave(updatedUser);
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
            <select
              name="role"
              value={editedUser.role || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value={Roles.ROLE_USER}>User</option>
              <option value={Roles.ROLE_ADMIN}>Admin</option>
              <option value={Roles.ROLE_SUPERADMIN}>Super Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Account Locked</label>
            <select
              name="accountLocked"
              value={editedUser.accountLocked === true || editedUser.accountLocked === false ? editedUser.accountLocked : ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Change Password</label>
            <input
              type="password"
              name="password"
              value={newPassword} 
              onChange={handlePasswordChange}  
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Enter new password" 
            />
          </div>

          {newPassword && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isPasswordSend}
                onChange={() => setIsPasswordSend(!isPasswordSend)}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">Send Password</label>
            </div>
          )}
        </div>

        {errorValidation && (
          <div className="mb-4 text-red-500 text-sm">
            <p>{errorValidation}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
