import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <h1 className={style.titleHeader}>Manage Document Requests (Department Admin) </h1>
          <div className={style.loadingContainer}>
            <section className={style.tableSection}></section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestPage;
