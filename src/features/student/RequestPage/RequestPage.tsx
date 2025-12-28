import { useState } from "react";
import clsx from "clsx";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import RequestTable from "@/features/student/components/RequestTable/RequestTable";
import { useMultiFilterRequest } from "@/hooks/useMultiFilterRequest";
import { DocumentRequest } from "@/types/";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [requests] = useState<DocumentRequest[]>([]);

  const filteredRequests = useMultiFilterRequest(requests, {
    searchQuery,
    selectedDepartment,
    selectedDate,
  });

  const handleDownload = (request: DocumentRequest) => {
    // TODO: Implement download logic
    console.log("Downloading:", request.paper.title);
  };

  return (
    <div className={clsx(style.page)}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <h1 className={style.titleHeader}>Manage Research Paper Requests</h1>
          <div className={style.tableSection}>
            <RequestTable requests={filteredRequests} onDownload={handleDownload} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RequestPage;
