"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 ${isActive ? "text-orange-400" : "text-blue-600"}`}
    >
      {children}
    </Link>
  );
}
