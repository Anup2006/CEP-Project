import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, deleteUser, updateUserRole, fetchAdminStats } from "../../redux/adminSlice";
import { UserTable } from "./UserTable.jsx";
import { StatsCard } from "./StatsCard.jsx";
import { Trash2, Edit, Users, MailCheck } from "lucide-react";
import { fetchUnreadMessages, markMessageAsRead } from "../../redux/contactSlice.js";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { users, stats, loading } = useSelector((state) => state.admin);
  const { unreadMessages, loading: contactLoading } = useSelector((state) => state.contact);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAdminStats());
    dispatch(fetchUnreadMessages(token));
  }, [dispatch, token]);

  const handleMarkAsRead = (id) => {
    dispatch(markMessageAsRead({ messageId: id }));
  };

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-[1400px] mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Manage users, roles, and track overall statistics.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatsCard
            title="Total Users"
            count={stats.totalUsers}
            icon={<Users className="text-white w-5 h-5 sm:w-6 sm:h-6" />}
            bg="bg-blue-500"
          />
          <StatsCard
            title="Students"
            count={stats.students}
            icon={<Users className="text-white w-5 h-5 sm:w-6 sm:h-6" />}
            bg="bg-green-500"
          />
          <StatsCard
            title="Mentors"
            count={stats.mentors}
            icon={<Users className="text-white w-5 h-5 sm:w-6 sm:h-6" />}
            bg="bg-purple-500"
          />
        </div>

        {/* Users Table */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Users</h2>
          </div>

          {users?.length ? (
            <div className="overflow-x-auto">
              <UserTable
                users={users}
                onDelete={handleDelete}
                onUpdateRole={handleUpdateRole}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No users found.</p>
          )}
        </section>

        {/* Unread Contact Messages */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <MailCheck className="w-4 h-4 sm:w-5 sm:h-5" /> Unread Messages
            </h2>
          </div>

          {contactLoading ? (
            <p className="text-center py-6">Loading messages...</p>
          ) : unreadMessages?.length ? (
            <div className="space-y-4">
              {unreadMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="border rounded-xl p-3 sm:p-4 flex flex-col gap-2"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{msg.subject || "No Subject"}</h3>
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="text-sm sm:text-base text-green-600 hover:underline"
                    >
                      Mark as read
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600">
                    <b>From:</b> {msg.name} ({msg.email})
                  </p>

                  <p className="text-gray-700 text-sm sm:text-base">{msg.message}</p>

                  <p className="text-xs sm:text-sm text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No unread messages 🎉
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
