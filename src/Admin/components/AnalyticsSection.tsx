import React from 'react';

const AnalyticsSection: React.FC = () => {
    return (
        <div id="analytics-section" className="section-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 10 bài hát được nghe nhiều nhất</h3>
                    <div className="space-y-3" id="topTracks">
                        {/* Top tracks will be populated by JavaScript */}
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Người dùng hoạt động nhất</h3>
                    <div className="space-y-3" id="topUsers">
                        {/* Top users will be populated by JavaScript */}
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê theo thời gian</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Biểu đồ thống kê sẽ được hiển thị ở đây</p>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;