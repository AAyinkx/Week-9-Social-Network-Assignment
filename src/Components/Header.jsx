import { cherry } from "@/app/layout";
import Navbar from "./Navbar";
import "./Header.css";
export default function Header() {
  return (
    <div className="header">
      <h1 className={`yap ${cherry.className}`}>YAP!</h1>
      <Navbar />
    </div>
  );
}
