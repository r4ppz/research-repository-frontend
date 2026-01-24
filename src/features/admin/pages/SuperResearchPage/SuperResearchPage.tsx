import { Archive, FilePlus2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { PaperFormModal } from "../../components/PaperFormModal/PaperFormModal";
import { PapersTable } from "../../components/PapersTable/PapersTable";
import style from "./SuperResearchPage.module.css";

export const SuperResearchPage = () => {
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <div className={style.headerSection}>
            <h1 className={style.titleHeader}>Manage All Research Papers (Super Admin)</h1>
            <Button onClick={handleCreate} className={style.createButton}>
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
              <Archive className={style.iconTab} />
              Active Papers
            </Button>
            <Button
              variant={activeTab === "archived" ? "primary" : "secondary"}
              className={style.tabButton}
              onClick={() => {
                setActiveTab("archived");
              }}
            >
              <RotateCcw className={style.iconTab} />
              Archived Papers
            </Button>
          </div>

          <div className={style.tableSection}>
            <PapersTable archived={activeTab === "archived"} showDepartment={true} />
          </div>
        </div>
      </main>

      <PaperFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <Footer />
    </div>
  );
};
