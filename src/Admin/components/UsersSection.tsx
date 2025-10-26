import React, { useEffect, useState } from "react";
import UserModal from "./UserModal";
import { getToken } from "../../services/localStorageService";
import type { User } from "../types/User";
import UserDetailModal from "./UserDetailModal";

interface UsersSectionProps {
  openUserModal?: () => void; // optional vì bạn có thể không truyền
}

const UsersSection: React.FC<UsersSectionProps> = ({ openUserModal }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Bộ lọc tìm kiếm
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Tất cả roles");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("username");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [searchKeyword, setSearchKeyword] = useState("");
  // Lấy danh sách user từ backend

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) throw new Error("Bạn chưa đăng nhập");

      const res = await fetch(
        `http://localhost:8080/users/admin/user?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Không thể lấy danh sách người dùng");
      const data = await res.json();
      const result = data.result;

      setUsers(result.content || []);
      setTotalPages(result.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size, sortBy, direction]);


  const handleSort = (field: string) => {
    if (sortBy === field) {
      // Đảo chiều sort nếu click lại cột
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setDirection("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  // Hàm lọc người dùng theo bộ lọc
  useEffect(() => {
    let filtered = users;

    if (searchUsername.trim() !== "")
      filtered = filtered.filter((u) =>
        u.username.toLowerCase().includes(searchUsername.toLowerCase())
      );

    if (searchEmail.trim() !== "")
      filtered = filtered.filter((u) =>
        u.email.toLowerCase().includes(searchEmail.toLowerCase())
      );

    if (selectedRole !== "Tất cả roles")
      filtered = filtered.filter((u) =>
        u.roles.some((r) => r.name === selectedRole.toUpperCase())
      );

    setFilteredUsers(filtered);
  }, [searchUsername, searchEmail, selectedRole, selectedStatus, users]);



  const handleDeleteUser = (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const saveUser = (user: User) => {
    if (editingUser && editingUser.id) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...user, id: editingUser.id }
            : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        { ...user, id: Math.random().toString(), createdAt: new Date().toISOString() },
      ]);
    }
    closeUserModal();
  };

  

  const handleSearch = async () => {
  console.log("🔍 Searching:", { searchUsername, searchEmail, selectedRole });
  try {
    setLoading(true);
    const token = getToken();
    if (!token) return;

    const queryParams = new URLSearchParams({
      keyword: searchUsername || "",
      role: selectedRole !== "Tất cả roles" ? selectedRole : "",
      email: searchEmail || "",
    });

    const res = await fetch(
      `http://localhost:8080/users/admin/search?${queryParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    console.log("📥 Search result:", data);
    setUsers(data.result.content || []);
    setTotalPages(1);
    setPage(0);
  } catch (err: any) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  


  return (
    <div className="flex flex-col flex-1 h-full bg-gray-50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800">Quản lý người dùng</h3>
        <button
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Thêm User
        </button>
      </div>

      {/* Bộ lọc */}
    <div className="bg-gray-100 px-8 py-4 border-b border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-4">
  
  <input
    type="text"
    placeholder="Tìm theo username..."
    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
    value={searchUsername}
    onChange={(e) => setSearchUsername(e.target.value)}
  />
  <input
    type="text"
    placeholder="Tìm theo email..."
    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
    value={searchEmail}
    onChange={(e) => setSearchEmail(e.target.value)}
  />
  <select
    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
    value={selectedRole}
    onChange={(e) => setSelectedRole(e.target.value)}
  >
    <option>Tất cả roles</option>
    <option>ADMIN</option>
    <option>USER</option>
  </select>

  <button
    onClick={handleSearch}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
  >
    🔍 Tìm kiếm
  </button>

  <button
    onClick={fetchUsers}
    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
  >
    🔄 Làm mới
  </button>
  </div>



      {/* Danh sách */}
      <div className="flex-1 p-6 overflow-auto">
        {loading ? (
          <p className="text-gray-500 text-sm">Đang tải...</p>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    onClick={() => handleSort("username")}
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs cursor-pointer hover:text-blue-600"
                  >
                    Username {sortBy === "username" && (direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() => handleSort("email")}
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs cursor-pointer hover:text-blue-600"
                  >
                    Email {sortBy === "email" && (direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-3 font-medium text-gray-800">{u.username}</td>
                    <td className="px-6 py-3 text-gray-600">{u.email ?? "—"}</td>
                    <td className="px-6 py-3">
                      {u.roles.map((r) => (
                        <span
                          key={r.name}
                          className={`px-2 py-1 text-xs rounded-full mr-1 ${r.name === "ADMIN"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                            }`}
                        >
                          {r.name}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setViewingUser(u)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() => handleOpenModal(u)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => alert("Chức năng khóa chưa kích hoạt")}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Khóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>





            {/* Phân trang */}
            <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-t">
              <div className="text-sm text-gray-600">
                Trang {page + 1} / {totalPages}
              </div>
              <div className="space-x-2">
                <button
                  disabled={page === 0}
                  onClick={() => handlePageChange(page - 1)}
                  className={`px-3 py-1 rounded ${page === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  Trước
                </button>
                <button
                  disabled={page + 1 >= totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-1 rounded ${page + 1 >= totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  Sau
                </button>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* Modal thêm/sửa */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          user={editingUser || undefined}
          onClose={closeUserModal}
          onSave={saveUser}
        />
      )}

      {/* Modal xem chi tiết */}
      {viewingUser && (
        <UserDetailModal
          user={viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}
    </div>
  );
};

export default UsersSection;
