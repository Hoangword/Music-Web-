import React from 'react';

const HistorySection: React.FC = () => {
    const sampleHistory = [
        { user: 'Nguyễn Văn A', song: 'Shape of You', artist: 'Ed Sheeran', playedAt: '2024-03-15 14:30', device: 'iPhone' },
        { user: 'Trần Thị B', song: 'Blinding Lights', artist: 'The Weeknd', playedAt: '2024-03-15 15:45', device: 'Web Browser' },
        { user: 'Lê Văn C', song: 'Watermelon Sugar', artist: 'Harry Styles', playedAt: '2024-03-15 16:20', device: 'Android' }
    ];

    return (
        <div id="history-section" className="section-content">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Tổng lượt nghe</p>
                            <p className="text-3xl font-bold">45,892</p>
                        </div>
                        <i className="fas fa-play text-4xl text-blue-200"></i>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-violet-100">Hôm nay</p>
                            <p className="text-3xl font-bold">1,247</p>
                        </div>
                        <i className="fas fa-calendar-day text-4xl text-violet-200"></i>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100">Tuần này</p>
                            <p className="text-3xl font-bold">8,934</p>
                        </div>
                        <i className="fas fa-calendar-week text-4xl text-green-200"></i>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100">Tháng này</p>
                            <p className="text-3xl font-bold">34,567</p>
                        </div>
                        <i className="fas fa-calendar-alt text-4xl text-red-200"></i>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">Lịch sử nghe nhạc</h3>
                        <div className="flex space-x-2">
                            <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" />
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fas fa-trash mr-2"></i>Xóa dữ liệu cũ
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài hát</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nghệ sĩ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian nghe</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thiết bị</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sampleHistory.map((history, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.song}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.artist}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.playedAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.device}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistorySection;