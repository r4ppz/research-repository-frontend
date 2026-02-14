import { RequestsTable } from "../../components/RequestTable/RequestTable";
import style from "./AdminRequestsPage.module.css";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { useAuth } from "@/features/auth/context/useAuth";

export const AdminRequestsPage = () => {
  const { user } = useAuth();
  const showDepartment = user?.role === "SUPER_ADMIN";

  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section className={style.tableSection}>
            <RequestsTable showDepartment={showDepartment} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
