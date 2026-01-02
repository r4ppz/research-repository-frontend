import clsx from "clsx";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

import DocumentRequestTable from "../components/RequestTable/RequestTable";
import { useUserRequests } from "../hooks/useUserRequests";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  const { requests, loading, refetch } = useUserRequests();

  let mainContent;
  if (loading) {
    mainContent = (
      <main className={style.loadingContainer}>
        <LoadingSpinner message="Loading requests..." />
      </main>
    );
  } else {
    mainContent = (
      <main className={style.main}>
        <div className={style.mainContainer}>
          <DocumentRequestTable data={requests} refreshData={refetch} />
        </div>
      </main>
    );
  }

  return (
    <div className={clsx(style.page)}>
      <Header />
      {mainContent}
      <Footer />
    </div>
  );
};

export default RequestPage;
