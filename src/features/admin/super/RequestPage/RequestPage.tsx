import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import RequestTable from "@/features/admin/components/RequestTable/RequestTable";

import style from "./RequestPage.module.css";

const RequestPage = () => {
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <section className={style.tableSection}>
            <RequestTable />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestPage;
