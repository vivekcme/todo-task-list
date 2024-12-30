import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const navLinks = [
    {
      title: "List",
      path: "/",
    },
    {
      title: "Add",
      path: "add",
    },
  ];
  return (
    <>
      <nav className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/" className={"link-underline-opacity-0"}>
          <h3>Todos</h3>
        </Link>
        <div className="d-flex justify-content-end">
          {navLinks.map(({ title, path }) => {
            return (
              <NavLink
                key={title}
                to={path}
                className="nav-link p-3 fs-5 fw-semibold"
              >
                {title}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
