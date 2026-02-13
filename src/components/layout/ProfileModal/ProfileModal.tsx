import style from "./ProfileModal.module.css";
import { Avatar } from "@/components/common/Avatar/Avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import type { Role, User } from "@/types";

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

export const ProfileModal = ({ isOpen, onClose, user, className }: ProfileModalProps) => {
  const roleLabel = FULL_ROLE_LABEL[user.role];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={className} aria-describedby={undefined}>
        <div className={style.profileContainer}>
          <DialogTitle className={style.modalTitle}>Profile Information</DialogTitle>

          <Avatar
            src={user.profilePictureUrl}
            alt={`${user.fullName}'s profile picture`}
            fallbackName={user.fullName}
            size="lg"
            className={style.profilePicture}
          />

          <div className={style.userInfo}>
            <h3 className={style.name}>{user.fullName}</h3>
            <p className={style.email}>{user.email}</p>
            <span className={style.role}>{roleLabel}</span>

            {user.department && (
              <span className={style.department}>{user.department.departmentName}</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
