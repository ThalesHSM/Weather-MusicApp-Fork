import React, { useEffect } from "react";
import { handleMusic } from "../../config/api/api";
export default function HomeScreen() {
  useEffect(() => {
    async function abc() {
      await handleMusic();
    }
    abc();
  }, []);
  return <div>A</div>;
}
