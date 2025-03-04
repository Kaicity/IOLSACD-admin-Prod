import { useState, useEffect } from "react";

export default function useViewportWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Cập nhật khi trang load xong
    setWidth(window.innerWidth);

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
