import React, { useEffect, useState } from 'react';

interface Playlist {
    id: string;
    name: string;
    description: string;
    userId: string;
    trackIds: string[];
}

import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import PlaylistForm from './PlaylistForm';
import { getToken, removeToken, getRole, removeRole } from "../services/localStorageService";
const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showPlaylistForm, setShowPlaylistForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loadingPlaylists, setLoadingPlaylists] = useState(true);
   //  const { setSelectedPlaylist } = usePlaylist();
    useEffect(() => {
        const token = getToken();
        const userRole = getRole();
        if (token) {
            setIsLoggedIn(true);
            setRole(userRole);
        } else {
            setIsLoggedIn(false);
            setRole(null);
        }
    }, []);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const token = getToken();
                if (!token) {
                    setLoadingPlaylists(false);
                    return;
                }

                const res = await fetch("http://localhost:8080/playlist/myPlaylist", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch playlists");

                const data = await res.json();
                console.log("👉 Playlists response:", data);

                setPlaylists(data.result || []);
            } catch (err) {
                console.error("Error fetching playlists:", err);
            } finally {
                setLoadingPlaylists(false);
            }
        };

        if (isLoggedIn) {
            fetchPlaylists();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        removeToken();
        removeRole();
        setIsLoggedIn(false);
        setRole(null);
        navigate("/"); // quay về home sau khi logout
    };

    if (role === "ADMIN") {
        return null;
    }

    return (
        <div className="w-64 bg-black flex-shrink-0 flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-green-500">MusicMood</h1>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <div id="main-nav">
                    <Link to="/" className="sidebar-item flex items-center px-6 py-3 text-gray-300 hover:text-white">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                        </svg>
                        Home
                    </Link>
                    <Link to="/search" className="sidebar-item flex items-center px-6 py-3 text-gray-300 hover:text-white">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                        Search
                    </Link>
                    <Link to="/playlists" className="sidebar-item flex items-center px-6 py-3 text-gray-300 hover:text-white">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                        </svg>
                        Your Playlists
                    </Link>
                    <Link to="/emotion" className="sidebar-item flex items-center px-6 py-3 text-gray-300 hover:text-white">
                        <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.414-1.415 5 5 0 00-7.07 0 1 1 0 000 1.415z" clipRule="evenodd"></path>
                        </svg>
                        Emotion Detection
                    </Link>
                    <Link to="/listening-history" className="sidebar-item flex items-center px-6 py-3 text-gray-300 hover:text-white">
                        Listening History
                    </Link>
                    <Link to="/favorites" className="sidebar-item flex items-center px-6 py-3 text-gray-300 hover:text-white">
                        Favorite Songs
                    </Link>
                </div>

                {/* <div className="mt-8">
                    <h3 className="px-6 py-2 text-xs uppercase tracking-wider text-gray-500">Your Playlists</h3>
                    <div id="playlist-list">
                        <Link to="/playlists/chill" className="sidebar-item flex items-center px-6 py-2 text-sm text-gray-400 hover:text-white">
                            Chill Vibes
                        </Link>
                        <Link to="/playlists/workout" className="sidebar-item flex items-center px-6 py-2 text-sm text-gray-400 hover:text-white">
                            Workout Mix
                        </Link>
                        <Link to="/playlists/focus" className="sidebar-item flex items-center px-6 py-2 text-sm text-gray-400 hover:text-white">
                            Focus Time
                        </Link>
                    </div>
                    <button
                        onClick={() => setShowPlaylistForm(true)}
                        className="w-full text-left flex items-center px-6 py-3 text-gray-300 hover:text-white"
                    >
                        ➕ Create Playlist
                    </button>
                </div> */}
                {isLoggedIn && (
                    <div className="mt-8">
                        <h3 className="px-6 py-2 text-xs uppercase tracking-wider text-gray-500">
                            Your Playlists
                        </h3>
                        <div id="playlist-list">
                            {loadingPlaylists ? (
                                <p className="px-6 text-sm text-gray-400">Loading...</p>
                            ) : playlists.length === 0 ? (
                                <p className="px-6 text-sm text-gray-400">No playlists yet</p>
                            ) : (
                                playlists.map((pl) => (
                                    <div
                                        key={pl.id}
                                        //onClick={() => setSelectedPlaylist(pl)} 
                                        className="sidebar-item flex items-center px-6 py-2 text-sm text-gray-400 hover:text-white"
                                    >
                                        {pl.name}
                                    </div>
                                ))
                            )}
                        </div>
                        <button
                            onClick={() => setShowPlaylistForm(true)}
                            className="w-full text-left flex items-center px-6 py-3 text-gray-300 hover:text-white"
                        >
                            ➕ Create Playlist
                        </button>
                    </div>
                )}

            </nav>



            {/* <div className="p-4 border-t border-gray-800">
                <div id="logged-out-state" className="flex flex-col gap-2">
                    <button
                        onClick={() => setShowLogin(true)}
                        className="bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-200 transition"
                    >
                        Log In
                    </button>
                    <button className="border border-gray-500 text-white font-medium py-2 px-4 rounded-full hover:border-white transition">
                        Sign Up
                    </button>
                </div>
            </div> */}

            {/* Footer */}

            <div className="p-4 border-t border-gray-800">
                {!isLoggedIn ? (
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setShowLogin(true)} className="bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-200 transition">Log In</button>
                        <button className="border border-gray-500 text-white font-medium py-2 px-4 rounded-full hover:border-white transition">Sign Up</button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">U</div>
                        <span className="text-sm font-medium">User</span>
                        <button onClick={handleLogout} className="ml-auto text-sm text-gray-400 hover:text-white">Log out</button>
                    </div>
                )}
            </div>

            {/* {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onLogin={(email, password) => {
                        console.log("Login with:", email, password);
                        setShowLogin(false);
                    }}
                />
            )}

   
            {showPlaylistForm && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="w-96">
                        <PlaylistForm />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => setShowPlaylistForm(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

            {/* LoginModal */}
            {/* {showLogin && (
                <LoginModal
                    onClose={() => {
                        setShowLogin(false);
                        setIsLoggedIn(true); // sau khi login thì chuyển trạng thái
                        setRole(getRole());
                    }}
                    onLogin={(email, password) => {
                        console.log("Login with:", email, password);
                        setShowLogin(false);
                        setIsLoggedIn(true);
                        setRole(getRole());
                    }}
                />
            )} */}

            {showLogin && (
                <LoginModal
                    onClose={() => {
                        setShowLogin(false);
                        setIsLoggedIn(true);
                        setRole(getRole());
                        alert("✅ Đăng nhập thành công! Trang sẽ reload..."); // báo trước
                        setTimeout(() => {
                            console.log("👉 Reloading page after login...");
                            window.location.reload();
                        }, 1500); // delay 1.5s cho dễ nhìn thấy
                    }}
                    onLogin={(email, password) => {
                        console.log("Login with:", email, password);
                        setShowLogin(false);
                        setIsLoggedIn(true);
                        setRole(getRole());
                        alert("✅ Đăng nhập thành công! Trang sẽ reload...");
                        setTimeout(() => {
                            console.log("👉 Reloading page after login...");
                            window.location.reload();
                        }, 1500);
                    }}
                />
            )}



            {/* PlaylistForm */}
            {showPlaylistForm && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="w-96">
                        <PlaylistForm onCancel={() => setShowForm(false)} />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => setShowPlaylistForm(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Sidebar;