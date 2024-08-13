import React from "react";
import { useGetProfileQuery } from "../../context/api/userApi";

const Header = () => {
  const { data, isError, error, isSuccess } = useGetProfileQuery();

  return (
    <header className="bg-blue-900 flex justify-between items-center py-3 px-6 shadow-md">
      <form className="flex-1 max-w-xs">
        <input
          type="text"
          className="w-full py-2 px-4 rounded-lg outline-none"
          placeholder="Search..."
        />
      </form>
      <div className="flex items-center gap-4 text-xl text-white font-semibold">
        <h3>{data?.payload?.fname}</h3>
        <h3>{data?.payload?.lname}</h3>
      </div>
    </header>
  );
};

export default Header;
