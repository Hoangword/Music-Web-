import React from 'react';

// const Header: React.FC = () => {
//     return (
//         <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
//             <div className="flex items-center justify-between">
//                 <h2 id="pageTitle" className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
//                 <div className="flex items-center space-x-4">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Tìm kiếm..."
//                             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                         />
//                         <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
//                     </div>
//                     <button className="p-2 text-gray-400 hover:text-gray-600">
//                         <i className="fas fa-bell"></i>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// };
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <i className="fas fa-bell"></i>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;