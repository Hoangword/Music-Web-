import React from 'react';
import { Link } from 'react-router-dom';


interface AdminSidebarProps {
  showSection: (section: string) => void;
  logout: () => void;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ showSection, logout }) => {
    
    return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white z-50 hidden lg:block">
      <div className="p-6 border-b border-purple-700">
        <div className="flex items-center space-x-3">
          <i className="fas fa-music text-2xl text-purple-300"></i>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
      </div>
      <nav className="mt-6">
        <div className="px-4 mb-4">
          <p className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Quản lý</p>
        </div>
        <button onClick={() => showSection("users")} className="w-full text-left flex items-center px-6 py-3 hover:bg-purple-800">
          <i className="fas fa-users w-5"></i>
          <span className="ml-3">Người dùng</span>
        </button>
        <button onClick={() => showSection("playlists")} className="w-full text-left flex items-center px-6 py-3 hover:bg-purple-800">
          <i className="fas fa-list-music w-5"></i>
          <span className="ml-3">Playlist</span>
        </button>
        <button onClick={() => showSection("tracks")} className="w-full text-left flex items-center px-6 py-3 hover:bg-purple-800">
          <i className="fas fa-music w-5"></i>
          <span className="ml-3">Tracks trong Playlist</span>
        </button>
        <button onClick={() => showSection("favorites")} className="w-full text-left flex items-center px-6 py-3 hover:bg-purple-800">
          <i className="fas fa-heart w-5"></i>
          <span className="ml-3">Bài hát yêu thích</span>
        </button>
        <button onClick={() => showSection("history")} className="w-full text-left flex items-center px-6 py-3 hover:bg-purple-800">
          <i className="fas fa-history w-5"></i>
          <span className="ml-3">Lịch sử nghe</span>
        </button>
        <div className="px-4 mt-8 mb-4">
          <p className="text-purple-300 text-sm font-semibold uppercase tracking-wide">Thống kê</p>
        </div>
        <button onClick={() => showSection("analytics")} className="w-full text-left flex items-center px-6 py-3 hover:bg-purple-800">
          <i className="fas fa-chart-bar w-5"></i>
          <span className="ml-3">Báo cáo</span>
        </button>
      </nav>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-3 p-3 bg-purple-800 rounded-lg">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <i className="fas fa-user-shield text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-purple-300">admin@music.com</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-4 w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;