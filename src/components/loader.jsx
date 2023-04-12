import React from "react";
import { useLoading, Audio } from "@agney/react-loading";
import "../assets/styles/loader.css"

export default function Loader() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />
  });

  return (
    <div className="loader">
      <section {...containerProps}>
        {indicatorEl} {/* renders only while loading */}
      </section>
    </div>
  );
}
