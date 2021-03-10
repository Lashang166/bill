import React from "react";
// import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="hero is-danger is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">404 Page Not Found</h1>
          <h2 className="subtitle">The page you requested was not found</h2>
        </div>
      </div>
    </section>
  );
}
