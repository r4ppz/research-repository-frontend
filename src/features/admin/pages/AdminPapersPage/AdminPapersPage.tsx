import { Archive, CircleCheck, FilePlus2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { PaperFormModal } from "../../components/PaperFormModal/PaperFormModal";
import { PapersTable } from "../../components/PapersTable/PapersTable";
import { useAuth } from "@/features/auth/context/useAuth";
import style from "./AdminPapersPage.module.css";

export const AdminPapersPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"active" | "archived">("active");
  const [isPaperModalOpen, setPaperModalOpen] = useState(false);

  const openModal = () => {
    setPaperModalOpen(true);
  };

  const closeModal = () => {
    setPaperModalOpen(false);
  };

  const changeTab = (t: "active" | "archived") => {
    setTab(t);
  };

  const isArchived = tab === "archived";
  const showDepartment = user?.role === "SUPER_ADMIN";

  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <div className={style.headerSection}>
            <h1 className={style.titleHeader}>Manage Research Papers</h1>
            <Button onClick={openModal} className={style.createButton}>
              <FilePlus2 className={style.iconTab} />
              Add Paper
            </Button>
          </div>

          <div className={style.tabsContainer}>
            <Button
              variant={tab === "active" ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                changeTab("active");
              }}
            >
              <CircleCheck className={style.iconTab} />
              Active Papers
            </Button>

            <Button
              variant={isArchived ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                changeTab("archived");
              }}
            >
              <Archive className={style.iconTab} />
              Archived Papers
            </Button>
          </div>

          <div className={style.tableSection}>
            <PapersTable archived={isArchived} showDepartment={showDepartment} />
          </div>
        </div>
      </main>

      <PaperFormModal isOpen={isPaperModalOpen} onClose={closeModal} />
      <Footer />
    </div>
  );
};
