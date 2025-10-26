import React, { useEffect, useState } from 'react';
import { getToken } from "../services/localStorageService";
import { useMusicPlayer } from "./MusicPlayerContext";
interface Track {
  trackId: string;
  trackName: string;
  artistName: string;
  albumImageUrl: string | null;
}

interface Playlist {
  id: string;
  name: string;
}

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

const SearchSection: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
    const { playTrack } = useMusicPlayer();
  
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch("http://localhost:8080/playlist/myPlaylist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPlaylists(data.result || []);
        if (data.result?.length > 0) {
          setSelectedPlaylist(data.result[0].id); // mặc định chọn playlist đầu tiên
        }
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    };
    fetchPlaylists();
  }, []);


  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = e.target.value.trim();
    setSearchInput(query);

    if (query.length > 1) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/spotify/search?keyword=${encodeURIComponent(
            query
          )}&limit=10`
        );
        const data = await response.json();
        setSearchResults(data.result || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddToPlaylist = async (trackId: string) => {
    try {
      const token = getToken();
      if (!token || !selectedPlaylist) {
        alert("Please select a playlist first!");
        return;
      }

      const res = await fetch("http://localhost:8080/playlist-track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          playlistId: selectedPlaylist,
          trackId: trackId,
        }),
      });

      if (!res.ok) throw new Error("Failed to add track");

      alert("Track added to playlist!");
    } catch (err) {
      console.error("Error adding track:", err);
      alert("Error adding track!");
    }
  };

  return (
    <div id="search-section" className="pb-10">
      <h2 className="text-3xl font-bold mb-6">Search</h2>
      {/* input search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            id="search-input"
            placeholder="Search for songs, artists, or albums"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="w-full bg-white bg-opacity-10 text-white py-3 px-4 pl-12 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg
            className="w-6 h-6 text-gray-400 absolute left-4 top-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      {/* chọn playlist */}
      {playlists.length > 0 && (
        <div className="mb-6">
          <label className="text-white mr-3">Add songs to: </label>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            {playlists.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.name}
              </option>
            ))}
          </select>
        </div>
      )}


      {loading && <p className="text-gray-400">Loading...</p>}
      {/* kết quả search */}
      {searchResults.length > 0 && (
        <div id="search-results">
          <h3 className="text-xl font-bold mb-4">Results</h3>
          <div className="bg-gray-800 bg-opacity-60 rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {searchResults.map((result, index) => (
                  <tr
                    key={result.trackId}
                    className="hover:bg-gray-700"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      {result.albumImageUrl && (
                        <img
                          src={result.albumImageUrl}
                          alt={result.trackName}
                          className="w-12 h-12 rounded"
                        />
                      )}
                      {result.trackName}
                    </td>
                    <td className="py-3 px-4">{result.artistName}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleAddToPlaylist(result.trackId)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        + Add
                      </button>
                      <button
                        className="text-green-400 hover:text-green-600 mr-3"
                        onClick={() => {
                          playTrack(result.trackId); // phát nhạc
                          addToListeningHistory(result.trackId); // lưu lịch sử
                        }}
                      >
                        ▶ Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


export default SearchSection;