import style from "./TeacherRequestPage.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { StudentRequestTable } from "@/features/student/components/StudentRequestTable/StudentRequestTable";

export const TeacherRequestPage = () => {
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section className={style.tableSection}>
            {/* Just reuse the student table cause I am lazy as shit */}
            <StudentRequestTable />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
