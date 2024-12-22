import React, { useEffect, useState } from "react";
import { getUsers, downloadStudentsCsv, uploadStudentsCsv, editUser } from "../../repositories/users.repository.js";
import { BiEditAlt, BiLock, BiLockAlt } from "react-icons/bi";
import { FaFileCsv, FaLock, FaUnlock } from "react-icons/fa";
import ErrorMessage from "../../shared/components/utili/ErrorComponent.jsx";
import noFindImage from "../../assets/not-items-found.png";
import { Roles } from "../../shared/constantes/Roles.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserEditModal from './UserEditModal'; 
import { getClubs_v2 } from "../../repositories/clubs.repository.js";
import { useNavigate } from "react-router-dom";

const UsersListing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState("username");
  const [roleFilter, setRoleFilter] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [errorValidation, setErrorValidation] = useState("");
  const [clubs, setClubs] = useState([]); 
  const [selectedClub, setSelectedClub] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUsers({
            page: page,
            size: 10, 
            userName: filterValue && filterType !== "cin" && filterType !== "cne" ? filterValue : "", 
            role: roleFilter, 
            cin: filterType === "cin" ? filterValue : "",
            cne: filterType === "cne" ? filterValue : "", 
            uuidClub: selectedClub,
         });
        setUsers(data.data);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, filterValue, filterType, roleFilter, selectedClub]);

    useEffect(() => {
      const fetchClubs = async () => {
        try {
          const clubList = await getClubs_v2();
          console.log(clubList)

          setClubs(clubList); 
        } catch (error) {
          console.error("Error fetching clubs:", error);
        }
      };
  
      fetchClubs();
    }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setPage(0);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setFilterValue(""); 
    setPage(0);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setPage(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setFile(file);
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid CSV file.");
      setSelectedFile(null);
    }
  };

  const handleUploadCsv = async () => {
    if (file) {
      try {
        await uploadStudentsCsv(file);
        toast.success("CSV uploaded successfully!");
        setFile(null);
        setSelectedFile(null);
      } catch (err) {
        toast.error(err.message || "An error occurred during upload.");
      }
    } else {
      toast.warn("Please select a file to upload.");
    }
  };

  const handleDownloadCsv = async () => {
    try {
      console.log("selectedClub", selectedClub); 
      const csvData = await downloadStudentsCsv({ uuidClub: selectedClub });
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      const selectedClubData = clubs.find(club => club.uuid === selectedClub);
      const fileName = selectedClub && selectedClub !== "" ? `students_${selectedClubData.nom}.csv` : "students.csv";
      link.download = fileName;
      link.click();

      toast.success("CSV downloaded successfully!");
    } catch (err) {
      toast.error(err.message || "An error occurred during download.");
    }
  };

  const handleProfileClick = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setEditingUser(user);
    }
  };
  const handleSaveUser = async (updatedUser) => {
    try {
      const savedUser = await editUser(updatedUser.id, updatedUser); 
      console.log("savedUser",savedUser)
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === savedUser.id ? savedUser : user))
      );
      toast.success("User updated successfully!");
      setEditingUser(null);
      setFilterValue(""); 
      setErrorValidation("");
    } catch (error) {
      setErrorValidation(error.message || "An error occurred during the update.");
    }
  };
  const handleClubChange = (e) => {
    const selectedValue = e.target.value; 

    setSelectedClub(selectedValue);  
  };
  const handleShowProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  
  if (error) {
    return <ErrorMessage title="Error" description={error} />;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        {(roleFilter ==="" || roleFilter === Roles.ROLE_USER) && (<div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleDownloadCsv}
            className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow transition-all duration-200"
          >
            <FaFileCsv className="mr-2" /> Export CSV
          </button>
          <div className="relative flex items-center">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-sm shadow transition-all duration-200">
              Select CSV File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            {selectedFile && (
              <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">
                {selectedFile.name}
              </span>
            )}
          </div>
          <button
            onClick={handleUploadCsv}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-all duration-200"
          >
            Upload CSV
          </button>
        </div>)}
      </div>

    <div className="flex flex-wrap justify-between gap-4 mb-4">
      
    <div className="flex flex-col w-full sm:w-auto">
    <label htmlFor="roleFilter" className="mb-1 text-sm font-medium text-gray-700">Role</label>
    <select
      id="roleFilter"
      value={roleFilter}
      onChange={handleRoleChange}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
    >
      <option value="">Select Role</option>
      <option value={Roles.ROLE_USER}>User</option>
      <option value={Roles.ROLE_ADMIN}>Admin</option>
      <option value={Roles.ROLE_SUPERADMIN}>Super Admin</option>
    </select>
  </div>
   {(roleFilter ==="" || roleFilter === Roles.ROLE_USER) && (<div className="flex flex-col w-full sm:w-auto">
    <label htmlFor="filterType" className="mb-1 text-sm font-medium text-gray-700">Filter by</label>
    <select
      id="filterType"
      value={filterType}
      onChange={handleFilterTypeChange}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
    >
      <option value="username">Search by Name</option>
      <option value="cin">Search by CIN</option>
      <option value="cne">Search by CNE</option>
    </select>
  </div>)}

  {(roleFilter ==="" || roleFilter === Roles.ROLE_USER) && (<div className="flex flex-col w-full sm:w-auto">
    <label htmlFor="filterValue" className="mb-1 text-sm font-medium text-gray-700">Search</label>
    <input
      id="filterValue"
      type="text"
      placeholder={`Search by ${filterType}`}
      value={filterValue}
      onChange={handleFilterChange}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
    />
  </div>)}

  {(roleFilter ==="" || roleFilter === Roles.ROLE_USER) && (<div className="flex flex-col w-full sm:w-auto">
    <label htmlFor="selectedClub" className="mb-1 text-sm font-medium text-gray-700">Club</label>
    <select
      id="selectedClub"
      value={selectedClub}
      onChange={handleClubChange}
      className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
    >
      <option value="">Tous les clubs</option>
      {clubs.map((club) => (
        <option key={club.uuid} value={club.uuid}>
          {club.nom}
        </option>
      ))}
    </select>
  </div>)}

</div>


      {users.length === 0 ? (
        <div className="flex flex-col items-center">
          <img src={noFindImage} alt="No results found" className="w-44 h-auto" />
          <span className="mt-4 text-xl font-semibold">No users found</span>
        </div>
      ) : (
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">CNE</th>
              <th className="px-4 py-2 border">CIN</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Account Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-150"}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td 
                    className="px-4 py-2 border cursor-pointer hover:bg-blue-200 hover:text-blue-700 transition-all duration-200"
                    onClick={() => handleShowProfile(user.id)}
                >
                    {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2 border">{user.cne || "No CNE"}</td>
                <td className="px-4 py-2 border">{user.cin || "No CIN"}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border text-center">
                  <div className="flex justify-center items-center">
                    {user.accountLocked ? (
                      <FaLock className="text-red-500" title="Account Locked" size={24} />
                    ) : (
                      <FaUnlock className="text-green-500" title="Account Unlocked" size={24} />
                    )}
                  </div>
                </td>

                <td className="px-4 py-2 border text-center">
                  <button onClick={() => handleProfileClick(user.id)} className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                    <BiEditAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Prev
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      
      {editingUser && (
        <UserEditModal 
          user={editingUser} 
          onSave={handleSaveUser} 
          onClose={() => { setEditingUser(null); setFilterValue(""); setErrorValidation("");
            
           }} 
           errorValidation ={errorValidation}
        />
      )}
      
    </div>
  );
};

export default UsersListing;
