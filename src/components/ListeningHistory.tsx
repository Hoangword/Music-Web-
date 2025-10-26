import React, { useState, useEffect } from "react";

interface Song {
  id: number;
  title: string;
  artist: string;
  playedAt: string;
}

const ListeningHistory: React.FC = () => {
  const [history, setHistory] = useState<Song[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/listening-history", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // nếu bạn có JWT
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setHistory(data.result); // do bạn wrap ApiResponse
    })
    .catch((err) => console.error("Error fetching history", err));
  }, []);



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Lịch sử nghe nhạc
      </h3>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Tên bài hát</th>
            <th className="px-6 py-3">Nghệ sĩ</th>
            <th className="px-6 py-3">Thời gian nghe</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4">{item.artist}</td>
              <td className="px-6 py-4">{item.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeningHistory;
