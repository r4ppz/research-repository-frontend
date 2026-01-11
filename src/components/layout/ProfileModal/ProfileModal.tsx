import * as Tooltip from "@radix-ui/react-tooltip";
import { Dialog, DialogContent, DialogTitle } from "@/components/common/Dialog/Dialog";
import type { Role, User } from "@/types";
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

          <Tooltip.Provider>
            <Tooltip.Root delayDuration={1000}>
              <Tooltip.Trigger asChild={true}>
                <div className={style.profilePicture}>
                  <span>👤</span>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className={style.tooltipContent}>
                  Theres no API for this... I forgor :(
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
      </DialogContent>
    </Dialog>
  );
};
