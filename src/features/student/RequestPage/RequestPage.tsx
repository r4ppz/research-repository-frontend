import clsx from "clsx";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useUserRequests } from "../hooks/useUserRequests";
import style from "./RequestPage.module.css";
import DocumentRequestTable from "../components/RequestTable/RequestTable";

const RequestPage = () => {
  const { requests, loading, refetch } = useUserRequests();
  let content;

  if (loading) {
    content = <LoadingSpinner message="Loading requests..." />;
  } else {
    content = <DocumentRequestTable data={requests} refreshData={refetch} />;
  }

  return (
    <div className={clsx(style.page)}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>{content}</div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestPage;
