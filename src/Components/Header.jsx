import { cherry } from "@/app/layout";
import Navbar from "./Navbar";
export default function Header() {
  return (
    <>
      <div className="relative top-2 ">
        <h1 className={` text-lg ${cherry.className}`}>YAP!</h1>
      </div>
      <Navbar />
    </>
  );
}
