import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div></div>
  );
}
