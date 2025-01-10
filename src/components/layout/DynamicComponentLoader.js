import React, { useState, useEffect } from "react";
import ErrorPage from "../error/ErrorPage";

const DynamicComponentLoader = ({ srcPath, menuId, onRefresh }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false); // Reset error state on srcPath change
  }, [srcPath]);

  if (!srcPath) {
    console.error("srcPath is undefined");
    return <div>Invalid path</div>;
  }

  const adjustedSrcPath = srcPath.replace(/^\//, ''); // 경로 조정

  const Component = React.lazy(() =>
    import(`../../${adjustedSrcPath}`).catch((error) => {
      console.error(`Error loading component at path: ${adjustedSrcPath}`, error);
      setHasError(true);
      return { default: () => <ErrorPage /> };
    })
  );

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {hasError ? <ErrorPage /> : <Component menuId={menuId} onRefresh={onRefresh} />}
    </React.Suspense>
  );
};

export default DynamicComponentLoader;