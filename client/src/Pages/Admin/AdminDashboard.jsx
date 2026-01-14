// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllUsers, deleteUser, updateUserRole, fetchAdminStats } from "../../redux/adminSlice";
// import { UserTable } from "./UserTable.jsx";
// import { StatsCard } from "./StatsCard.jsx";

// export default function AdminDashboard(){
//   const dispatch = useDispatch();
//   const { users, stats, loading } = useSelector(state => state.admin);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//     dispatch(fetchAdminStats());
//   }, [dispatch]);

//   const handleDelete = (userId) => {
//     if (window.confirm("Are you sure?")) dispatch(deleteUser(userId));
//   };

//   const handleUpdateRole = (userId, role) => {
//     dispatch(updateUserRole({ userId, role }));
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <StatsCard title="Total Users" count={stats.totalUsers} />
//         <StatsCard title="Students" count={stats.students} />
//         <StatsCard title="Mentors" count={stats.mentors} />
//       </div>

//       <UserTable users={users} onDelete={handleDelete} onUpdateRole={handleUpdateRole} />
//     </div>
//   );
// };

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, deleteUser, updateUserRole, fetchAdminStats } from "../../redux/adminSlice";
import { UserTable } from "./UserTable.jsx";
import { StatsCard } from "./StatsCard.jsx";
import { Trash2, Edit, Users } from "lucide-react";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { users, stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleUpdateRole = (userId, role) => {
    dispatch(updateUserRole({ userId, role }));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Manage users, roles, and track overall statistics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            count={stats.totalUsers}
            icon={<Users className="text-white w-6 h-6" />}
            bg="bg-blue-500"
          />
          <StatsCard
            title="Students"
            count={stats.students}
            icon={<Users className="text-white w-6 h-6" />}
            bg="bg-green-500"
          />
          <StatsCard
            title="Mentors"
            count={stats.mentors}
            icon={<Users className="text-white w-6 h-6" />}
            bg="bg-purple-500"
          />
          {/* <StatsCard
            title="Admins"
            count={stats.admins}
            icon={<Users className="text-white w-6 h-6" />}
            bg="bg-cyan-500"
          /> */}
        </div>

        {/* Users Table */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Users</h2>
          </div>

          {users?.length ? (
            <UserTable
              users={users}
              onDelete={handleDelete}
              onUpdateRole={handleUpdateRole}
            />
          ) : (
            <p className="text-gray-500 text-center py-10">No users found.</p>
          )}
        </section>
      </div>
    </div>
  );
}

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchAllUsers, deleteUser, updateUserRole, fetchAdminStats } from "../../redux/adminSlice";
// import { Trash2, Edit, Users } from "lucide-react";

// export default function AdminDashboard() {
//   const dispatch = useDispatch();
//   const { users, stats, loading } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchAllUsers());
//     dispatch(fetchAdminStats());
//   }, [dispatch]);

//   const handleDelete = (userId) => {
//     if (window.confirm("Are you sure?")) dispatch(deleteUser(userId));
//   };

//   const handleUpdateRole = (userId, role) => {
//     dispatch(updateUserRole({ userId, role }));
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
//       <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
//         {/* LEFT: Summary Stats */}
//         <div className="w-full lg:w-1/3 flex flex-col gap-6">
//           <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
//             <div className="flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full mx-auto text-white text-4xl font-black mb-4">
//               <Users className="w-12 h-12" />
//             </div>
//             <h2 className="text-xl font-bold text-slate-800">Total Users</h2>
//             <p className="text-blue-600 text-2xl font-bold mt-2">{stats.totalUsers || 0}</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
//             <h3 className="text-lg font-bold text-slate-800 mb-2">Students</h3>
//             <p className="text-green-600 text-2xl font-bold">{stats.students || 0}</p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
//             <h3 className="text-lg font-bold text-slate-800 mb-2">Mentors</h3>
//             <p className="text-purple-600 text-2xl font-bold">{stats.mentors || 0}</p>
//           </div>
//         </div>

//         {/* RIGHT: Users Table */}
//         <div className="w-full lg:w-2/3 space-y-6">
//           <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-slate-800">Users</h2>
//               <button
//                 onClick={() => window.alert("Add User feature coming soon!")}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//               >
//                 + Add User
//               </button>
//             </div>

//             {users?.length ? (
//               <table className="min-w-full text-left">
//                 <thead className="border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-2">Name</th>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2">Role</th>
//                     <th className="px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id} className="border-b border-gray-100">
//                       <td className="px-4 py-2">{user.name}</td>
//                       <td className="px-4 py-2">{user.email}</td>
//                       <td className="px-4 py-2">
//                         <select
//                           value={user.role}
//                           onChange={(e) => handleUpdateRole(user._id, e.target.value)}
//                           className="border rounded px-2 py-1"
//                         >
//                           <option value="student">Student</option>
//                           <option value="mentor">Mentor</option>
//                           <option value="admin">Admin</option>
//                         </select>
//                       </td>
//                       <td className="px-4 py-2 flex gap-2">
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-gray-500 text-center py-10">No users found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
