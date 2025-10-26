import { useEffect } from "react";
import api from "./api"; // axios instance của bạn

const TokenTester: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("[Test] Gọi API /playlist/test");
        const res = await api.get("/playlist/"); // endpoint nào cần token
        console.log("[Test] API OK:", res.data);
      } catch (err) {
        console.error("[Test] API lỗi:", err);
      }
    }, 5000); // gọi API mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return null; // component này không hiển thị gì, chỉ test trong console
};

export default TokenTester;
