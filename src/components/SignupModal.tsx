import React from 'react';

const SignupModal: React.FC = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        alert(`Signed up with Name: ${name}, Email: ${email}`);
    };

    return (
        <div id="signup-modal" className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Sign Up</h2>
                    <button className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="signup-name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                        <input type="text" id="signup-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input type="password" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-700 text-white py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500" required />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-full font-medium hover:bg-green-600 transition">Sign Up</button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-400">
                    <p>Already have an account? <button className="text-green-500 hover:underline">Log In</button></p>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;