import clsx from "clsx";
import { type NavLinkProps, NavLink as ReactRouterNavlink } from "react-router-dom";
import style from "./NavLink.module.css";

export const NavLink = ({ ...props }: NavLinkProps) => {
  return (
    <ReactRouterNavlink
      className={({ isActive }) => clsx(style.navlink, isActive && style.active)}
      {...props}
    />
  );
};
