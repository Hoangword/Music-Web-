import React, { useState } from 'react';

const EmotionSection: React.FC = () => {
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null);
    const [emotionConfidence, setEmotionConfidence] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<any[]>([]);

    const startDetection = async () => {
        // Logic to start emotion detection
        setIsDetecting(true);
        // Simulate emotion detection
        const randomEmotion = simulateEmotionDetection();
        setDetectedEmotion(randomEmotion.name);
        setEmotionConfidence(randomEmotion.confidence);
        setRecommendations(getRecommendationsForEmotion(randomEmotion.name.toLowerCase()));
    };

    const stopDetection = () => {
        setIsDetecting(false);
        setDetectedEmotion(null);
        setEmotionConfidence(null);
        setRecommendations([]);
    };

    const simulateEmotionDetection = () => {
        const emotions = [
            { name: 'Happy', confidence: '87%' },
            { name: 'Sad', confidence: '92%' },
            { name: 'Angry', confidence: '78%' },
            { name: 'Neutral', confidence: '95%' }
        ];
        return emotions[Math.floor(Math.random() * emotions.length)];
    };

    const getRecommendationsForEmotion = (emotion: string) => {
        const recommendations: { [key: string]: { title: string; artist: string }[] } = {
            happy: [
                { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
                { title: "Happy", artist: "Pharrell Williams" },
                { title: "Good Vibrations", artist: "Beach Boys" }
            ],
            sad: [
                { title: "Someone Like You", artist: "Adele" },
                { title: "Fix You", artist: "Coldplay" },
                { title: "Hurt", artist: "Johnny Cash" }
            ],
            angry: [
                { title: "Break Stuff", artist: "Limp Bizkit" },
                { title: "Killing In The Name", artist: "Rage Against The Machine" },
                { title: "Given Up", artist: "Linkin Park" }
            ],
            neutral: [
                { title: "Weightless", artist: "Marconi Union" },
                { title: "Intro", artist: "The xx" },
                { title: "Porcelain", artist: "Moby" }
            ]
        };
        return recommendations[emotion] || recommendations.neutral;
    };

    return (
        <div className="emotion-section">
            <h2 className="text-3xl font-bold mb-6">Emotion Detection</h2>
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
                <p className="mb-4">Let us detect your mood through your facial expression and recommend music that matches how you feel.</p>
                <button onClick={startDetection} className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition">
                    Start Detection
                </button>
                <button onClick={stopDetection} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition ml-4">
                    Stop Detection
                </button>
            </div>
            {detectedEmotion && (
                <div>
                    <h3 className="text-xl font-bold mb-4">Detected Emotion: {detectedEmotion}</h3>
                    <p>Confidence: {emotionConfidence}</p>
                    <h4 className="text-lg font-semibold mt-4">Recommendations:</h4>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index} className="text-gray-400">{rec.title} by {rec.artist}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EmotionSection;