import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen bg-gray-900 text-white flex flex-col justify-between p-6 fixed left-0 top-0 w-72">
      <ul className="space-y-4">
        <li>
          <NavLink
            to="createBlog"
            className="text-lg font-medium hover:text-yellow-500"
          >
            Create Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="adminBlog"
            className="text-lg font-medium hover:text-yellow-500"
          >
            Manage Blog
          </NavLink>
        </li>
      </ul>
      <button className="text-red-500 font-bold">Log out</button>
    </aside>
  );
};

export default Sidebar;
