import React from 'react';

const PlaylistsSection: React.FC = () => {
    const samplePlaylists = [
        { id: 1, name: 'My Favorites', creator: 'Nguyễn Văn A', tracks: 25, status: 'public', createdAt: '2024-01-20' },
        { id: 2, name: 'Chill Vibes', creator: 'Trần Thị B', tracks: 18, status: 'public', createdAt: '2024-02-01' },
        { id: 3, name: 'Workout Mix', creator: 'Lê Văn C', tracks: 32, status: 'private', createdAt: '2024-02-05' }
    ];

    return (
        <div id="playlists-section" className="section-content">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Quản lý Playlist</h3>
                    <div className="mt-4 flex space-x-4">
                        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                            <option>Tất cả playlist</option>
                            <option>Công khai</option>
                            <option>Riêng tư</option>
                            <option>Nổi bật</option>
                        </select>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Playlist</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người tạo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số bài hát</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {samplePlaylists.map(playlist => (
                                <tr key={playlist.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <i className="fas fa-list-music text-green-600"></i>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{playlist.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{playlist.creator}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{playlist.tracks} bài</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${playlist.status === 'public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {playlist.status === 'public' ? 'Công khai' : 'Riêng tư'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{playlist.createdAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-purple-600 hover:text-purple-900 mr-3">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                                            <i className="fas fa-star"></i>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <i className="fas fa-trash"></i>
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

export default PlaylistsSection;