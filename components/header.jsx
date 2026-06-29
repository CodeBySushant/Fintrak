import React from "react";
import { checkUser } from "@/lib/checkUser";
import Navbar from "@/components/navbar";

// Server component: runs checkUser() to provision the user row on first load,
// then renders the client navbar (which needs scroll + Clerk client UI).
const Header = async () => {
  await checkUser();
  return <Navbar />;
};

export default Header;