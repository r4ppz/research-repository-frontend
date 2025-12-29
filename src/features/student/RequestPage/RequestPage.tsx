import clsx from "clsx";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useUserRequests } from "../hooks/useUserRequests";
import style from "./RequestPage.module.css";
import DocumentRequestTable from "../components/RequestTable/RequestTable";

const RequestPage = () => {
  const { requests, loading } = useUserRequests();

  return (
    <div className={clsx(style.page)}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          {/* <h1 className={style.titleHeader}>Manage Research Paper Requests</h1> */}
          {loading ? (
            <div className={style.loadingContainer}>
              <LoadingSpinner message="Loading requests..." />
            </div>
          ) : (
            <DocumentRequestTable data={requests} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestPage;
