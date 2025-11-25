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
        <div className={style.profilePicture}>
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
            />
          ) : (
            <span>👤</span>
          )}
        </div>
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
