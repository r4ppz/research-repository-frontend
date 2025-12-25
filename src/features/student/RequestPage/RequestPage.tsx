import clsx from "clsx";
import { useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { FilterConfig } from "@/components/layout/DynamicFilter/FilterTypes";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import SearchAndFilter from "@/components/layout/SearchAndFilter/SearchAndFilter";
import RequestTable from "@/features/student/components/RequestTable/RequestTable";
import { useLoadingDelay } from "@/hooks/useLoadingDelay";
import { useMultiFilterRequest } from "@/hooks/useMultiFilterRequest";
import { DocumentRequest } from "@/types/";
import { getRequestDepartmentOptions, getRequestDateOptions } from "@/util/requestFilterUtils";
import style from "./RequestPage.module.css";

const RequestPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [requests] = useState<DocumentRequest[]>([]);

  const loading = useLoadingDelay();

  const filteredRequests = useMultiFilterRequest(requests, {
    searchQuery,
    selectedDepartment,
    selectedDate,
  });

  const handleDownload = (request: DocumentRequest) => {
    // TODO: Implement download logic
    console.log("Downloading:", request.paper.title);
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <LoadingSpinner message="Loading your requests..." />
      </div>
    );
  }

  // Generate filter options based on user's requests
  const departmentOptions = getRequestDepartmentOptions(requests);
  const dateOptions = getRequestDateOptions(requests);

  const filters: FilterConfig[] = [
    {
      type: "department",
      label: "Department",
      options: departmentOptions,
      value: selectedDepartment,
      onChange: setSelectedDepartment,
    },
    {
      type: "date",
      label: "Date",
      options: dateOptions,
      value: selectedDate,
      onChange: setSelectedDate,
    },
  ];

  return (
    <div className={clsx(style.page)}>
      <Header />
      <main className={style.main}>
        <div className={style.mainContainer}>
          <h1 className={style.titleHeader}>Manage Research Paper Requests</h1>

          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            searchPlaceholder="Search paper title"
          />

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
