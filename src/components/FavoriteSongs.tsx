import React, { useState, useEffect } from "react";
import { getToken, getUserId } from "../services/localStorageService";
import { useMusicPlayer } from "./MusicPlayerContext";
interface Song {
  id: string;
  spotifyTrackId: string;
  title: string;
  artist: string;
  albumImageUrl: string;
  previewUrl: string;
}

// src/services/listeningHistoryService.ts


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

    if (!res.ok) {
      throw new Error("Failed to add listening history");
    }

    return await res.json();
  } catch (err) {
    console.error("Error adding listening history:", err);
  }
};


const FavoriteSongs: React.FC = () => {
  const [favorites, setFavorites] = useState<Song[]>([]);
  const userId = getUserId();
  const token = getToken();
  const [loading, setLoading] = useState(true);
  const { playTrack } = useMusicPlayer();
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = getToken();
        const res = await fetch("http://localhost:8080/favorite-songs", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFavorites(data.result || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xoá bài hát này khỏi danh sách yêu thích?")) return;

    try {
      const token = getToken();
      await fetch(`http://localhost:8080/favorite-songs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((song) => song.id !== id));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Bài hát yêu thích
      </h3>
      {loading ? (
        <p className="text-gray-400">Đang tải...</p>
      ) : favorites.length === 0 ? (
        <p className="text-gray-400">Chưa có bài hát yêu thích nào.</p>
      ) : (

        <ul className="divide-y divide-gray-200">
          {favorites.map((song) => (
            <li
              key={song.id}
              className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {song.albumImageUrl && (
                  <img
                    src={song.albumImageUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {song.title || song.spotifyTrackId}
                  </p>
                  <p className="text-xs text-gray-500">{song.artist}</p>
                </div>
              </div>
              <button
                onClick={() => removeFavorite(song.id)}
                className="text-red-500 hover:text-red-700"
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                className="text-green-500 hover:underline text-sm"
                onClick={() => {
                  playTrack(song.spotifyTrackId)
                  addToListeningHistory(song.spotifyTrackId)
                }}
              >
                ▶ Play
              </button>
              

            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default FavoriteSongs;
