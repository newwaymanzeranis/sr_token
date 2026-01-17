// app/welcome/welcome.tsx
import WalletInfo from "./wallet-info";
import Navbar from "../components/Navbar"; // ✅ ADD

export function Welcome() {
  return (
    <div>
      <h1>Welcome Page</h1>
      <Navbar /> 
      <WalletInfo />  
    </div>
  );
}
