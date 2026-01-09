import clsx from "clsx";
import { NavLink, type NavLinkProps } from "react-router-dom";
import style from "./CNavLink.module.css";

const CNavLink = ({ ...props }: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => clsx(style.navlink, isActive && style.active)}
      {...props}
    />
  );
};

export default CNavLink;
