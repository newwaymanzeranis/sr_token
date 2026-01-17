import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // browser confirm
  }, []);

  return (
    <nav className="flex justify-end p-4 border-b">
      {mounted && <ConnectButton />}
    </nav>
  );
}
