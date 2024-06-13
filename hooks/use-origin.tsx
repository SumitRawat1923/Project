"use client";
import { useEffect, useState } from "react";

function useOrigin() {
  const [isMounted, setIsMounted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (isMounted) return origin;
  return "";
}

export default useOrigin;