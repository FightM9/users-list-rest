import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <hgroup>
        <h1>Error</h1>
        <p>Page not found</p>
      </hgroup>

      <Link role='button' style={{ width: "100%" }} to='/'>
        Home
      </Link>
    </div>
  );
}
