import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  albumImageUrl: string;
  previewUrl: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  playTrack: (trackId: string) => Promise<void>;  // 👈 đổi sang string
}
const MusicPlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const playTrack = async (trackId: string) => {
    try {
      const res = await fetch(`http://localhost:8080/api/spotify/track/${trackId}`);
      if (!res.ok) throw new Error("Failed to fetch track info");
      const data = await res.json();

      // data.result là SpotifyTrackResponse
      const track: Track = {
        id: trackId,
        title: data.result.trackName,
        artist: data.result.artistName,
        albumImageUrl: data.result.albumImageUrl,
        previewUrl: data.result.previewUrl,
      };

      setCurrentTrack(track);
    } catch (err) {
      console.error("Error playing track:", err);
    }
  };
  

  return (
    <MusicPlayerContext.Provider value={{ currentTrack, playTrack }}>
      {children}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <img src={currentTrack.albumImageUrl} alt={currentTrack.title} className="w-12 h-12 rounded" />
            <div>
              <p className="font-medium">{currentTrack.title}</p>
              <p className="text-sm text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>
          <audio
            key={currentTrack.id} // 👈 đảm bảo audio reset khi đổi bài
            src={currentTrack.previewUrl}
            autoPlay
            controls
            className="w-1/2"
          />
        </div>
      )}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return context;
};
