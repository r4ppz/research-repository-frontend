import clsx from "clsx";
import { User as UserIcon } from "lucide-react";
import { useState } from "react";

import Button from "@/components/common/Button/Button";
import ProfileModal from "@/components/layout/ProfileModal/ProfileModal";
import { type Role, type User } from "@/types";

import style from "./ProfileButton.module.css";

interface ProfileButtonProps {
  user: User;
  className?: string;
  isMobile?: boolean;
}

const ROLE_LABEL: Record<Role, string> = {
  STUDENT: "Student",
  TEACHER: "Teacher",
  DEPARTMENT_ADMIN: "D Admin",
  SUPER_ADMIN: "S Admin",
};

const ProfileButton = ({ user }: ProfileButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roleLabel = ROLE_LABEL[user.role];
  const firstName = user.fullName.split(" ")[0];

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button className={clsx(style.profileButton)} variant="secondary" onClick={openModal}>
        <UserIcon className={style.iconUser} />
        <div className={style.profileContainer}>
          <h3 className={style.userName}>{firstName}</h3>
          <p className={style.userRole}>{roleLabel}</p>
        </div>
      </Button>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        user={user}
      />
    </>
  );
};

export default ProfileButton;
