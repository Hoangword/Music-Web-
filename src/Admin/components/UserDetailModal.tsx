import React, { useEffect, useState } from "react";
import { getToken } from "../../services/localStorageService";

interface Role {
  name: string;
}

interface PlaylistTrack {
  id: string;
  trackName: string;
  artistName: string;
  albumName?: string;
  albumImageUrl?: string;
  previewUrl?: string;
}

interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks?: PlaylistTrack[];
}

interface Pageable {
  pageNumber: number;
  totalPages: number;
  totalElements: number;
  size: number;
}

interface UserDetail {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  roles: Role[];
}

interface Props {
  user: UserDetail;
  onClose: () => void;
}

const UserDetailModal: React.FC<Props> = ({ user, onClose }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [pageable, setPageable] = useState<Pageable | null>(null);
  const [tracks, setTracks] = useState<PlaylistTrack[]>([]);
  const [trackPage, setTrackPage] = useState(0);
  const [totalTrackPages, setTotalTrackPages] = useState(1);
   const [trackPageable, setTrackPageable] = useState<Pageable | null>(null);
  // --- State cho audio ---
   const [loadingTracks, setLoadingTracks] = useState(false);
  
  // useEffect(() => {
  //   const fetchPlaylists = async () => {
  //     try {
  //       const token = getToken();
  //       const res = await fetch(`http://localhost:8080/playlist/admin/user/${user.id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       if (!res.ok) throw new Error("Không thể tải playlist");
  //       const data = await res.json();
  //       setPlaylists(data.result || []);
  //     } catch (err) {
  //       console.error("Lỗi khi tải playlist:", err);
  //     }
  //   };

  //   fetchPlaylists();
  // }, []);

  const fetchPlaylists = async (page = 0) => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await fetch(
        `http://localhost:8080/playlist/admin/user/paged/${user.id}?page=${page}&size=3&sortBy=${sortBy}&direction=${direction}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Không thể tải playlist");
      const data = await res.json();
      const result = data.result;
      setPlaylists(result.content || []);
      setPageable({
        pageNumber: result.number,
        totalPages: result.totalPages,
        totalElements: result.totalElements,
        size: result.size,
      });
    } catch (err) {
      console.error("Lỗi khi tải playlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists(0);
  }, [sortBy, direction]);

  // const handleSelectPlaylist = async (playlist: Playlist) => {
  //   try {
  //     const token = getToken();
  //     const res = await fetch(`http://localhost:8080/playlist-track/${playlist.id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await res.json();
  //     setSelectedPlaylist({ ...playlist, tracks: data.result || [] });
  //   } catch (err) {
  //     console.error("Lỗi khi tải track:", err);
  //   }
  // };

   const fetchTracks = async (playlistId: string, page = 0) => {
    try {
      setLoadingTracks(true);
      const token = getToken();
      const res = await fetch(
        `http://localhost:8080/playlist-track/admin/${playlistId}?page=${page}&size=3`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Không thể tải bài hát");
      const data = await res.json();
      const result = data.result;
      setTracks(result.content || []);
      setTrackPageable({
        pageNumber: result.number,
        totalPages: result.totalPages,
        totalElements: result.totalElements,
        size: result.size,
      });
    } catch (err) {
      console.error("Lỗi khi tải bài hát:", err);
    } finally {
      setLoadingTracks(false);
    }
  };

  // Khi chọn 1 playlist
  const handleSelectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    fetchTracks(playlist.id, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Chi tiết User</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin cá nhân */}
          <div>
            <h4 className="font-semibold mb-4">Thông tin cá nhân</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Username:</span>
                <span>{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{user.email ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Họ tên:</span>
                <span>{`${user.firstName ?? ""} ${user.lastName ?? ""}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ngày sinh:</span>
                <span>{user.dob ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Role:</span>
                <div>
                  {user.roles.map((r) => (
                    <span
                      key={r.name}
                      className={`px-2 py-1 ml-1 rounded text-xs ${
                        r.name === "ADMIN" ? "bg-green-600" : "bg-blue-600"
                      }`}
                    >
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
          <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded">Chỉnh sửa</button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Reset Password</button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Khóa tài khoản</button>
        </div>
          </div>
                  
          {/* Playlists */}
          {/* <div>
            <h4 className="font-semibold mb-4">Playlists ({playlists.length})</h4>
            <div className="space-y-2">
              {playlists.length > 0 ? (
                playlists.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPlaylist(p)}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-gray-400 text-xs">{p.description || "Không có mô tả"}</p>
                    </div>
                    <span className="text-gray-300 text-xs">Xem chi tiết</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Không có playlist nào.</p>
              )}
            </div>
          </div> */}
          <div>
            <h4 className="font-semibold mb-4 flex justify-between items-center">
              <span>Playlists ({pageable?.totalElements ?? 0})</span>

              <select
                className="bg-gray-700 rounded px-2 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Tên</option>
                <option value="description">Mô tả</option>
              </select>

              <button
                className="ml-2 text-xs px-2 py-1 bg-gray-600 rounded"
                onClick={() => setDirection(direction === "asc" ? "desc" : "asc")}
              >
                {direction === "asc" ? "↑ ASC" : "↓ DESC"}
              </button>
            </h4>

            {loading ? (
              <p className="text-gray-400">Đang tải...</p>
            ) : (
              <div className="space-y-2">
                {playlists.length > 0 ? (
                  playlists.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectPlaylist(p)}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
                    >
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-gray-400 text-xs">{p.description || "Không có mô tả"}</p>
                      </div>
                      <span className="text-gray-300 text-xs">Xem</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Không có playlist nào.</p>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            {pageable && pageable.totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={pageable.pageNumber === 0}
                  onClick={() => fetchPlaylists(pageable.pageNumber - 1)}
                  className={`px-3 py-1 rounded ${
                    pageable.pageNumber === 0
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  ← Trước
                </button>

                <span className="text-sm text-gray-300">
                  Trang {pageable.pageNumber + 1} / {pageable.totalPages}
                </span>

                <button
                  disabled={pageable.pageNumber + 1 >= pageable.totalPages}
                  onClick={() => fetchPlaylists(pageable.pageNumber + 1)}
                  className={`px-3 py-1 rounded ${
                    pageable.pageNumber + 1 >= pageable.totalPages
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Sau →
                </button>
              </div>
            )}
          </div>
        </div>

        

       
        {/* ===== Danh sách bài hát ===== */}
        {/* Danh sách bài hát */}
        {selectedPlaylist && (
          <div className="mt-8">
            <h4 className="font-semibold mb-3">
              Bài hát trong playlist: {selectedPlaylist.name}
            </h4>

            {loadingTracks ? (
              <p className="text-gray-400">Đang tải bài hát...</p>
            ) : tracks.length > 0 ? (
              <>
                <ul className="space-y-2">
                  {tracks.map((t) => (
                    <li
                      key={t.id}
                      className="p-3 bg-gray-700 rounded flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-3">
                        {t.albumImageUrl && (
                          <img
                            src={t.albumImageUrl}
                            alt={t.trackName}
                            className="w-10 h-10 rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium">{t.trackName}</p>
                          <p className="text-gray-400 text-xs">{t.artistName}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Pagination bài hát */}
                {trackPageable && trackPageable.totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <button
                      disabled={trackPageable.pageNumber === 0}
                      onClick={() => fetchTracks(selectedPlaylist.id, trackPageable.pageNumber - 1)}
                      className={`px-3 py-1 rounded ${
                        trackPageable.pageNumber === 0
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      ← Trước
                    </button>
                    <span className="text-sm text-gray-300">
                      Trang {trackPageable.pageNumber + 1} / {trackPageable.totalPages}
                    </span>
                    <button
                      disabled={trackPageable.pageNumber + 1 >= trackPageable.totalPages}
                      onClick={() => fetchTracks(selectedPlaylist.id, trackPageable.pageNumber + 1)}
                      className={`px-3 py-1 rounded ${
                        trackPageable.pageNumber + 1 >= trackPageable.totalPages
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Sau →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-400">Không có bài hát nào trong playlist này.</p>
            )}
          </div>
        )}
          


        {/* Nút hành động */}
        
      </div>
    </div>
  );
};

export default UserDetailModal;