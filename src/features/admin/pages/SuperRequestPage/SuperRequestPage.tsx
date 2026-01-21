import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { RequestsTable } from "@/features/admin/components/RequestTable/RequestTable";
import style from "./SuperRequestPage.module.css";

export const SuperRequestPage = () => {
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section className={style.tableSection}>
            <RequestsTable showDepartment={true} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
