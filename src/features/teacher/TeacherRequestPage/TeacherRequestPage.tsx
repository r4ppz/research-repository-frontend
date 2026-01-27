import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { StudentRequestTable } from "@/features/student/components/StudentRequestTable/StudentRequestTable";
import style from "./TeacherRequestPage.module.css";

export const TeacherRequestPage = () => {
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
