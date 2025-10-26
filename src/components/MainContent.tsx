import React from 'react';
import HomeSection from './HomeSection';
import SearchSection from './SearchSection';
import PlaylistsSection from './PlaylistsSection';
import EmotionSection from './EmotionSection';

const MainContent: React.FC = () => {
    const [activeSection, setActiveSection] = React.useState<string>('home');

    const renderSection = () => {
        switch (activeSection) {
            case 'home':
                return <HomeSection />;
            case 'search':
                return <SearchSection />;
            case 'playlists':
                return <PlaylistsSection />;
            case 'emotion':
                return <EmotionSection />;
            default:
                return <HomeSection />;
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-purple-900 to-gray-900 p-8">
            {renderSection()}
        </div>
    );
};

export default MainContent;