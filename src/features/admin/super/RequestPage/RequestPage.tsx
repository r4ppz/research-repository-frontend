import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { useAdminDocumentRequests } from "@/features/admin/hooks/useAdminDocumentRequest";
import RequestTable from "@/features/admin/components/RequestTable/RequestTable";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  const { data, error, loading, pageCount, pagination, setPagination } = useAdminDocumentRequests();

  return (
    <div className={style.page}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <h1 className={style.titleHeader}>Manage Document Requests (Super Admin)</h1>

          <div className={style.tableSection}>
            {loading && <p>Loading...</p>}
            {error && <div className={style.error}>{error}</div>}

            <RequestTable
              data={data}
              pageCount={pageCount}
              pagination={pagination}
              onPaginationChange={setPagination}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestPage;
