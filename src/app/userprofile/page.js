import Header from "@/Components/Header";
import { cherry } from "../layout";
export default function UserProfile() {
  return (
    <>
      <Header />
      <h1
        className={`relative mt-12 mb-7 text-5xl text-yellow-500 ${cherry.className}`}
      >
        User Profile
      </h1>
    </>
  );
}
