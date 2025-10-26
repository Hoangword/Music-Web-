import React, { useState } from 'react';

const TracksSection: React.FC = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');

    const sampleTracks = [
        { id: 1, name: 'Shape of You', artist: 'Ed Sheeran', album: '÷ (Divide)', duration: '3:53', addedAt: '2024-01-20' },
        { id: 2, name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', addedAt: '2024-01-22' },
        { id: 3, name: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', duration: '2:54', addedAt: '2024-01-25' }
    ];

    const handlePlaylistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlaylist(event.target.value);
    };

    return (
        <div id="tracks-section" className="section-content">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Tracks trong Playlist</h3>
                    <div className="mt-4">
                        <select
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                            value={selectedPlaylist}
                            onChange={handlePlaylistChange}
                        >
                            <option value="">Chọn playlist</option>
                            <option value="My Favorites">My Favorites - Nguyễn Văn A</option>
                            <option value="Chill Vibes">Chill Vibes - Trần Thị B</option>
                            <option value="Workout Mix">Workout Mix - Lê Văn C</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài hát</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nghệ sĩ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Album</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời lượng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày thêm</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sampleTracks.map(track => (
                                <tr key={track.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-music text-blue-600"></i>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{track.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.artist}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.album}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.addedAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900">
                                            <i className="fas fa-times"></i> Xóa khỏi playlist
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TracksSection;