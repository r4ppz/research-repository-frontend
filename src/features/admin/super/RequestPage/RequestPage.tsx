import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { useAdminRequests } from "@/features/admin/hooks/useAdminDocumentRequest";
import RequestTable from "../../components/RequestTable/RequestTable";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  const { requests, error } = useAdminRequests();

  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <h1 className={style.titleHeader}>Manage Document Requests (Super Admin)</h1>

          <div className={style.tableSection}>
            {error && <div className={style.error}>{error}</div>}
            <RequestTable data={requests} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestPage;
