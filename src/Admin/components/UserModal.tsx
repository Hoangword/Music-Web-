import React, { useEffect, useState } from 'react';
import type { RoleResponse, User } from "../types/User";


interface UserModalProps {
  isOpen: boolean;
  user?: User;
  onClose: () => void;
  onSave: (user: User) => void;
}


const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
    // const [name, setName] = useState(user ? user.name : '');
    // const [email, setEmail] = useState(user ? user.email : '');
    // const [role, setRole] = useState(user ? user.role : 'USER');
    // const [status, setStatus] = useState(user ? user.status : 'active');
    const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<RoleResponse[]>([]);


   useEffect(() => {
    if (user) {
      setUsername(user.username ?? "");
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setEmail(user.email ?? "");
      setRoles(user.roles ?? []);
    } else {
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setRoles([]);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
       id: user?.id ?? "",
    username,
    firstName,
    lastName,
    email,
    roles,
    enabled: user?.enabled ?? true,
    });
    onClose();
  };

  if (!isOpen) return null;



    return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              {user ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
            <select
              value={roles[0]?.name || ""}
              onChange={(e) => setRoles([{ name: e.target.value, description: "" }])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Chọn vai trò --</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default UserModal;