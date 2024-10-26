import React, { Suspense } from "react";
import { Spinner } from "components";
import { HomePage } from "pages";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePage />
    </Suspense>
  );
};

export default App;
