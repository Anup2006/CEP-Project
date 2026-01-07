import React from "react";

export const UserTable = ({ users, onDelete, onUpdateRole }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="border text-center bg-gray-200 ">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) && users.map(user => (
          <tr key={user._id} className="border-b h-15">
            <td className="border text-center">{user._id}</td>
            <td className="border text-center">{user.fullname}</td>
            <td className="border text-center">{user.email}</td>
            <td className="border text-center">{user.role}</td>
            <td className="flex gap-2 mt-3 items-center justify-center">
              {user.role !== "admin" && (
                <>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() =>
                      onUpdateRole(user._id, user.role === "student" ? "mentor" : "student")
                    }
                  >
                    Make {user.role === "student" ? "Mentor" : "Student"}
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
