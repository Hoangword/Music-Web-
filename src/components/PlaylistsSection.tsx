import React, { useEffect, useState } from "react";
import PlaylistForm from "./PlaylistForm";
import { getToken } from "../services/localStorageService";
import { useMusicPlayer } from "./MusicPlayerContext";

// ======================== INTERFACES ========================
interface Playlist {
  id: string;
  name: string;
  description: string;
  userId: string;
  trackIds: string[];
}

interface Track {
  id: string;
  playlistId: string;
  trackId: string;
  trackName?: string | null;
  artistName?: string | null;
  albumImageUrl?: string | null;
}

// ======================== ADD TO HISTORY ========================
export const addToListeningHistory = async (spotifyTrackId: string) => {
  try {
    const token = getToken();
    if (!token) return;

    const res = await fetch("http://localhost:8080/listening-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ spotifyTrackId }),
    });

    if (!res.ok) throw new Error("Failed to add listening history");
    return await res.json();
  } catch (err) {
    console.error("Error adding listening history:", err);
  }
};

// ======================== COMPONENT ========================
const PlaylistsSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(false);

  const { playTrack } = useMusicPlayer();

  // ======================== FETCH PLAYLISTS ========================
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await fetch("http://localhost:8080/playlist/myPlaylist", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch playlists");

        const data = await response.json();
        setPlaylists(data.result || []);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  // ======================== FETCH TRACKS ========================
  const handleSelectPlaylist = async (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setLoadingTracks(true);

    try {
      const token = getToken();
      if (!token) return;

      const res = await fetch(`http://localhost:8080/playlist-track/${playlist.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tracks");
      const data = await res.json();
      setTracks(data.result || []);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    } finally {
      setLoadingTracks(false);
    }
  };

  // ======================== RENDER ========================
  return (
    <div id="playlists-section" className="pb-10">
      <h2 className="text-3xl font-bold mb-6">Your Playlists</h2>

      {/* ---- Danh sách playlist ---- */}
      {loading ? (
        <p className="text-gray-400">Loading playlists...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="music-card bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              onClick={() => handleSelectPlaylist(playlist)}
            >
              <div className="aspect-square bg-gray-700 mb-4 rounded shadow-lg flex items-center justify-center">
                🎵
              </div>
              <h4 className="font-medium text-white">{playlist.name}</h4>
              <p className="text-sm text-gray-400">
                {playlist.trackIds ? playlist.trackIds.length : 0} songs
              </p>
            </div>
          ))}

          {/* ---- Tạo playlist mới ---- */}
          <div
            id="create-playlist-card"
            className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-80 transition aspect-square"
            onClick={() => setShowForm(true)}
          >
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 4v12m6-6H4" />
            </svg>
            <p className="text-gray-400 font-medium">Create New Playlist</p>
          </div>
        </div>
      )}

      {showForm && <PlaylistForm onCancel={() => setShowForm(false)} />}

      {/* ---- Danh sách bài hát ---- */}
      {selectedPlaylist && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">
            Songs in "{selectedPlaylist.name}"
          </h3>

          {loadingTracks ? (
            <p className="text-gray-400">Loading tracks...</p>
          ) : tracks.length === 0 ? (
            <p className="text-gray-400">No songs in this playlist.</p>
          ) : (
            <ul className="space-y-3">
              {tracks.map((track) => (
                <li
                  key={track.id}
                  className="bg-gray-700 p-3 rounded flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    {track.albumImageUrl ? (
                      <img
                        src={track.albumImageUrl}
                        alt={track.trackName || track.trackId}
                        className="w-12 h-12 rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                        🎵
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">
                        {track.trackName || track.trackId}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {track.artistName || "Unknown Artist"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Xóa bài hát */}
                    <button
                      onClick={async () => {
                        if (
                          window.confirm("Bạn có chắc muốn xóa bài hát này khỏi playlist?")
                        ) {
                          try {
                            const token = getToken();
                            await fetch(`http://localhost:8080/playlist-track/${track.id}`, {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            setTracks(tracks.filter((t) => t.id !== track.id));
                          } catch (err) {
                            console.error("Error deleting track:", err);
                          }
                        }
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      Remove
                    </button>

                    {/* Thêm vào yêu thích */}
                    <button
                      className="text-pink-400 hover:text-pink-600"
                      onClick={async () => {
                        try {
                          const token = getToken();
                          await fetch("http://localhost:8080/favorite-songs", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ spotifyTrackId: track.trackId }),
                          });
                          alert("Đã thêm vào danh sách yêu thích!");
                        } catch (err) {
                          console.error("Error adding favorite:", err);
                        }
                      }}
                    >
                      ❤️
                    </button>

                    {/* Phát nhạc & thêm lịch sử */}
                    <button
                      onClick={() => {
                        playTrack(track.trackId);
                        addToListeningHistory(track.trackId);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                    >
                      ▶ Play
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistsSection;
