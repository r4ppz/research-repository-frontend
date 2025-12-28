import { Tooltip } from "radix-ui";
import Modal from "@/components/common/Modal/Modal";
import { type Role, type User } from "@/types";
import style from "./ProfileModal.module.css";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  className?: string;
}

const FULL_ROLE_LABEL: Record<Role, string> = {
  STUDENT: "Student",
  TEACHER: "Teacher",
  DEPARTMENT_ADMIN: "Department Admin",
  SUPER_ADMIN: "Super Admin",
};

const ProfileModal = ({ isOpen, onClose, user, className }: ProfileModalProps) => {
  const roleLabel = FULL_ROLE_LABEL[user.role];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <div className={style.profileContainer}>
        <h2 className={style.modalTitle}>Profile Information</h2>

        <Tooltip.Provider>
          <Tooltip.Root delayDuration={1000}>
            <Tooltip.Trigger asChild>
              <div className={style.profilePicture}>
                <span>👤</span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className={style.tooltipContent}>
                You may wonder why your profile is an emoji. Because I suck at making API thats why.
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>

        <div className={style.userInfo}>
          <h3 className={style.name}>{user.fullName}</h3>
          <p className={style.email}>{user.email}</p>
          <span className={style.role}>{roleLabel}</span>
          {user.department && (
            <span className={style.department}>{user.department.departmentName}</span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
