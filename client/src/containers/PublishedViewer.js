import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";

function PublishedViewer() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/portfolio/view/${slug}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || json.message || "Failed to load portfolio");
        setPortfolio(json.portfolio);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const renderTemplate = () => {
    if (!portfolio) return null;
    const props = { isPreview: false, userData: portfolio.data };
    switch (portfolio.templateId) {
      case "template1":
        return <Template1 {...props} />;
      case "template2":
        return <Template2 {...props} />;
      case "template3":
        return <Template3 {...props} />;
      case "template4":
        return <Template4 {...props} />;
      case "template5":
        return <Template5 {...props} />;
      case "template6":
        return <Template6 {...props} />;
      default:
        return <Template1 {...props} />;
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: 80 }}>
        <div className="text-center">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ paddingTop: 80 }}>
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 60 }}>
      {renderTemplate()}
    </div>
  );
}

export default PublishedViewer;