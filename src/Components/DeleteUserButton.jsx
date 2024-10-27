"use client";
import "./DeleteUserButton.css";

import { useClerk } from "@clerk/nextjs";
export default function DeleteUserButton({ clerk_id, handleDelete }) {
  const { signOut } = useClerk();
  return (
    <>
      <div id="delete-container">
        <button
          className="deleteButton"
          onClick={() => {
            handleDelete(clerk_id);

            signOut({ redirectUrl: "/" });
          }}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </>
  );
}
