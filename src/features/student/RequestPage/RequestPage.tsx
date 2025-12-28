import clsx from "clsx";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  return (
    <div className={clsx(style.page)}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <h1 className={style.titleHeader}>Manage Research Paper Requests</h1>
          <div className={style.tableSection}></div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestPage;
