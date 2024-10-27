"use client";
import { ActiveLink } from "./ActiveLink";
import Link from "next/link";
import { cherry } from "@/app/layout";
import { useState } from "react";
import "./Navbar.css";
export default function Navbar() {
  const [dropdownClass, setDropdownClass] = useState("false");

  function dropFunction() {
    setDropdownClass(!dropdownClass);
  }
  return (
    <>
      <div className={`navbar ${cherry.className}`}>
        <ActiveLink href="/">Homepage</ActiveLink>
        <ActiveLink href="/mainfeed">Main Feed</ActiveLink>
        <ActiveLink href="/userprofile">User Profile</ActiveLink>
      </div>
      <div className="dropdown">
        <i className="fa fa-bars" id="dropbtn" onClick={dropFunction}></i>
        <div
          className={
            dropdownClass ? "dropdown-content" : "show dropdown-content"
          }
          id="myDropdown"
        >
          <ActiveLink href="/">Homepage</ActiveLink>
          <ActiveLink href="/mainfeed">Main Feed</ActiveLink>
          <ActiveLink href="/userprofile">User Profile</ActiveLink>
        </div>
      </div>
    </>
  );
}
