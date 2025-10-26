import { Message } from '@mui/icons-material';
import React, { useState } from 'react';
import api from "../api";

export interface PlaylistResponse {
  id: string;
  name: string;
  description: string;
  userId: string;
  trackIds: string[];
}
export interface ApiResponse<T> {
  code: number;
  result: T;
}


interface PlaylistFormProps {
  onCancel: () => void; // ✅ thêm prop để đóng form
}

const PlaylistForm: React.FC<PlaylistFormProps>= ({ onCancel }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!playlistName.trim()) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("⚠️ Bạn chưa đăng nhập!");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    // Không cần userId nữa, backend lấy từ token
   const response = await api.post<ApiResponse<PlaylistResponse>>(
  "/playlist",
  { name: playlistName, description: playlistDescription },
  { headers: { Authorization: `Bearer ${token}` } }
);

const playlist = response.data.result;
    setMessage(`✅ Playlist "${playlist.name}" created successfully!`);
    setPlaylistName("");
    setPlaylistDescription("");
  } catch (err: any) {
    console.error(err);
    setMessage("❌ Failed to create playlist.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="playlist-name"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Playlist Name
          </label>
          <input
            type="text"
            id="playlist-name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="playlist-description"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Description (optional)
          </label>
          <textarea
            id="playlist-description"
            rows={3}
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {message && (
          <p className="text-sm mb-2 text-green-400">{message}</p>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-400 hover:text-white mr-4"
            onClick={() => {
              setPlaylistName("");
              setPlaylistDescription("");
              setMessage("");
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );

};

export default PlaylistForm;