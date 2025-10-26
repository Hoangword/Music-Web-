import React from 'react';

const NowPlayingBar: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-3 flex items-center">
            <div className="flex items-center flex-1">
                <div className="w-12 h-12 bg-gray-800 rounded mr-3 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"></path>
                    </svg>
                </div>
                <div>
                    <div className="text-sm font-medium">Select a song to play</div>
                    <div className="text-xs text-gray-400">Artist</div>
                </div>
            </div>

            <div className="flex-1 max-w-xl">
                <div className="flex items-center justify-center space-x-4">
                    <button className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"></path>
                        </svg>
                    </button>
                    <button className="bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition">
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-400">0:00</span>
                    <div className="mx-2 flex-1 bg-gray-600 h-1 rounded-full">
                        <div className="bg-gray-400 w-0 h-1 rounded-full hover:bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-400">0:00</span>
                </div>
            </div>

            <div className="flex items-center justify-end flex-1">
                <button className="text-gray-400 hover:text-white mr-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className="w-24 flex items-center">
                    <input type="range" className="w-full" min="0" max="100" value="50" />
                </div>
            </div>
        </div>
    );
};

export default NowPlayingBar;