import React from 'react';
import MusicCard from './MusicCard';

const HomeSection: React.FC = () => {
    return (
        <div id="home-section" className="pb-10">
            <h2 className="text-3xl font-bold mb-6">Welcome to MusicMood</h2>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Popular Playlists</h3>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">See all</a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <MusicCard title="Happy Hits" description="Upbeat songs to boost your mood" />
                    <MusicCard title="Chill Lounge" description="Relaxing beats for your evening" />
                    <MusicCard title="Focus Flow" description="Concentration-enhancing tracks" />
                    <MusicCard title="Melancholy Mix" description="For your reflective moments" />
                    <MusicCard title="Energy Boost" description="High-tempo tracks to energize" />
                </div>
            </div>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">New Releases</h3>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">See all</a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <MusicCard title="Midnight Dreams" description="Luna Nova" />
                    <MusicCard title="Electric Soul" description="" />
                    <MusicCard title="" description="" />
                    <MusicCard title="" description="" />
                    <MusicCard title="" description="" />
                </div>
            </div>
        </div>
    );
};

export default HomeSection;