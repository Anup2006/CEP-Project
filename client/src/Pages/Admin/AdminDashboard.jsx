import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, deleteUser, updateUserRole, fetchAdminStats } from "../../redux/adminSlice";
import { UserTable } from "./UserTable.jsx";
import { StatsCard } from "./StatsCard.jsx";

export default function AdminDashboard(){
  const dispatch = useDispatch();
  const { users, stats, loading } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure?")) dispatch(deleteUser(userId));
  };

  const handleUpdateRole = (userId, role) => {
    dispatch(updateUserRole({ userId, role }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Users" count={stats.totalUsers} />
        <StatsCard title="Students" count={stats.students} />
        <StatsCard title="Mentors" count={stats.mentors} />
      </div>

      <UserTable users={users} onDelete={handleDelete} onUpdateRole={handleUpdateRole} />
    </div>
  );
};
