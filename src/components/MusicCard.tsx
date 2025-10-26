import React from 'react';

interface MusicCardProps {
    title: string;
    description: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ title, description }) => {
    return (
        <div className="music-card bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer">
            <div className="aspect-square bg-gray-700 mb-4 rounded shadow-lg flex items-center justify-center">
                {/* Placeholder for album art or image */}
            </div>
            <h4 className="font-medium text-white">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );
};

export default MusicCard;