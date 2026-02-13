import style from "./StudentRequestPage.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { StudentRequestTable } from "@/features/student/components/StudentRequestTable/StudentRequestTable";

export const StudentRequestPage = () => {
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section className={style.tableSection}>
            <StudentRequestTable />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
