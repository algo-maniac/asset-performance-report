import React, { Suspense } from "react";
import ReportsPage from "./ReportsPage";
const LazyLoadedReportsPage = React.lazy(() => import("./ReportsPage"));

const index = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoadedReportsPage />
    </Suspense>
  );
};

export default index;
