import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Route, Routes, useNavigate } from 'react-router-dom';



import HomeSection from './components/HomeSection';
import SearchSection from './components/SearchSection';
import PlaylistsSection from './components/PlaylistsSection';
import EmotionSection from './components/EmotionSection';
import LoginModal from './components/LoginModal';
import ListeningHistory from './components/ListeningHistory';
import FavoriteSongs from './components/FavoriteSongs';


import AdminSidebar from './Admin/components/Sidebar';
import Header from './Admin/components/Header';
import UsersSection from './Admin/components/UsersSection';
import AdminPlaylistsSection from './Admin/components/PlaylistsSection';
import TracksSection from './Admin/components/TracksSection';
import FavoritesSection from './Admin/components/FavoritesSection';
import HistorySection from './Admin/components/HistorySection';
import AnalyticsSection from './Admin/components/AnalyticsSection';
import UserModal from './Admin/components/UserModal';
//import { getRole, getToken } from './services/localStorageService';
import type { User } from "./Admin/types/User";
import {
  getToken,
  removeToken,
  getRole,
  removeRole,
} from "./services/localStorageService";
// interface User {
//   id?: number;  // đổi thành optional
//   name: string;
//   email: string;
//   role: 'USER' | 'ADMIN';
//   status?: string;
//   createdAt?: string;
// }
import api from "./api";

export interface AuthResponse {
  code: number;
  result: {
    token: string;
    authenticated: boolean;
  };
}

// Khi introspect
export interface IntrospectResponse {
  code: number;
  result: {
    valid: boolean;
  };
}
interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
  scope: string; // backend trả về dạng "ROLE_ADMIN CREATE_DATA ..."
}
import { jwtDecode } from "jwt-decode";
import TokenTester from './TokenTester';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const [activeSection, setActiveSection] = useState<string>('users');
  const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [role, setRoleState] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    const userRole = getRole();
    if (!token) {
      setChecking(false);
      return;
    }
    
    api
    .post<IntrospectResponse>("/auth/introspect", { token })
    .then((res) => {
      if (res.data.result.valid) {
        const decoded = jwtDecode<TokenPayload>(token);
        const scopes = decoded.scope.split(" ");
        console.log("Scopes:", scopes);
        //console.log("Decoded scope:", decoded.scope);
        
        let newRole: string | null = null;

          if (scopes.includes("ROLE_ADMIN")) {
            
             newRole = "ROLE_ADMIN";
          } else {
             newRole =  "ROLE_USER";
          }
          
          console.log("Role:", newRole);
          setRoleState(newRole);



        } else {
          logout();
        }
      })
      .catch(() => logout())
      .then(() => setChecking(false));

      const timer = setTimeout(async () => {
      try {
        console.log("[Test] Gọi API sau 25s để check refresh...");
        const res = await api.get("/playlist/test"); // endpoint nào có bảo vệ
        console.log("[Test] API trả về sau refresh:", res.data);
      } catch (err) {
        console.error("[Test] Lỗi khi gọi API:", err);
      }
    }, 25000);

    return () => clearTimeout(timer);



  }, []);


  useEffect(() => {
  if (role) {
    console.log("Role state updated:", role);
  }
}, [role]);

  const logout = () => {
    removeToken();
    removeRole();
    setRoleState(null);
    navigate("/"); // quay lại trang login/user
  };

  const showSection = (section: string) => {
    setActiveSection(section);
  };
  const handleSaveUser = (user: User) => {
    console.log("User saved:", user);
    // TODO: gọi API lưu user
  };
  const openUserModal = () => setUserModalOpen(true);
  const closeUserModal = () => setUserModalOpen(false);

  if (checking) return <div className="text-white p-8">Checking session...</div>;

  if (!getToken()) {
    return <LoginModal onClose={() => { }} onLogin={() => setRoleState(role)} />
  }
  localStorage.getItem("role");
  


  // Nếu login là ADMIN -> render giao diện admin
  if (localStorage.getItem("role")?.includes("ROLE_ADMIN")) {
    return (
      <div className="flex">
        <AdminSidebar showSection={showSection} logout={logout} />
        <div className="ml-64 w-[calc(100%-16rem)] h-screen flex flex-col bg-gray-100">
          <Header title={activeSection} />
          <main className="flex-1 p-4 overflow-hidden">
            {activeSection === "users" && (
              <UsersSection openUserModal={openUserModal} />
            )}
            {activeSection === "playlists" && <AdminPlaylistsSection />}
            {activeSection === "tracks" && <TracksSection />}
            {activeSection === "favorites" && <FavoritesSection />}
            {activeSection === "history" && <HistorySection />}
            {activeSection === "analytics" && <AnalyticsSection />}
          </main>
        </div>
        {isUserModalOpen &&
          <UserModal
            isOpen={isUserModalOpen}
            onClose={closeUserModal}
            onSave={handleSaveUser} />}
      </div>
    );
  }

  

  if (localStorage.getItem("role")?.includes("ROLE_USER")) {

    return (
   
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-900 to-gray-900 p-8">
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/search" element={<SearchSection />} />
            <Route path="/playlists" element={<PlaylistsSection />} />
            <Route path="/emotion" element={<EmotionSection />} />
            
           
            <Route path="/listening-history" element={<ListeningHistory />} />
            <Route path="/favorites" element={<FavoriteSongs />} />
          </Routes>
          {/* <TokenTester /> */}
        </div>

      </div>
  
    );
  }
};

export default App;