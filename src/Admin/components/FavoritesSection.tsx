import React from 'react';

const FavoritesSection: React.FC = () => {
    const totalFavorites = 12847; // Sample data
    const mostFavoriteSong = "Shape of You"; // Sample data
    const activeUsers = 2341; // Sample data

    const favoritesData = [
        { user: 'Nguyễn Văn A', song: 'Shape of You', artist: 'Ed Sheeran', favoriteAt: '2024-01-20' },
        { user: 'Trần Thị B', song: 'Blinding Lights', artist: 'The Weeknd', favoriteAt: '2024-01-22' },
        { user: 'Lê Văn C', song: 'Watermelon Sugar', artist: 'Harry Styles', favoriteAt: '2024-01-25' }
    ];

    return (
        <div id="favorites-section" className="section-content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-pink-100">Tổng lượt yêu thích</p>
                            <p className="text-3xl font-bold">{totalFavorites}</p>
                        </div>
                        <i className="fas fa-heart text-4xl text-pink-200"></i>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100">Bài hát được yêu thích nhất</p>
                            <p className="text-lg font-semibold">{mostFavoriteSong}</p>
                        </div>
                        <i className="fas fa-star text-4xl text-orange-200"></i>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100">Người dùng hoạt động</p>
                            <p className="text-3xl font-bold">{activeUsers}</p>
                        </div>
                        <i className="fas fa-users text-4xl text-emerald-200"></i>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Bài hát yêu thích theo người dùng</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài hát</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nghệ sĩ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày yêu thích</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {favoritesData.map((fav, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fav.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fav.song}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fav.artist}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fav.favoriteAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900">
                                            <i className="fas fa-heart-broken"></i> Xóa yêu thích
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

export default FavoritesSection;