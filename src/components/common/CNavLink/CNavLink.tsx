import { NavLink, type NavLinkProps } from "react-router-dom";
import clsx from "clsx";
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
