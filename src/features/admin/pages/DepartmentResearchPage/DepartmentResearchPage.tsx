import { Archive, FilePlus2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { AdminPaperFormModal } from "../../components/AdminPaperFormModal/AdminPaperFormModal";
import { PapersTable } from "../../components/PapersTable/PapersTable";
import style from "./DepartmentResearchPage.module.css";

export const DepartmentResearchPage = () => {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <div className={style.headerSection}>
            <h1 className={style.titleHeader}>Manage Research Papers (Department Admin)</h1>
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={style.createButton}
            >
              <FilePlus2 className={style.iconTab} />
              Add Paper
            </Button>
          </div>

          <div className={style.tabsContainer}>
            <Button
              variant={activeTab === "active" ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                setActiveTab("active");
              }}
            >
              <RotateCcw className={style.iconTab} />
              Active Papers
            </Button>
            <Button
              variant={activeTab === "archived" ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                setActiveTab("archived");
              }}
            >
              <Archive className={style.iconTab} />
              Archived Papers
            </Button>
          </div>

          <div className={style.tableSection}>
            <PapersTable archived={activeTab === "archived"} showDepartment={false} />
          </div>
        </div>
      </main>
      <AdminPaperFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <Footer />
    </div>
  );
};
