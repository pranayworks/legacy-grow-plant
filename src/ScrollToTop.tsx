import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

 
    useEffect(() => {
  console.log("Navigated to:", pathname);
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [pathname]);

 

  return null;
}
