import React from "react";
import { useHistory } from "react-router-dom";

export default function Footer() {
  const history = useHistory();
  
  return (
    <div style={{ backgroundColor: "black" }} className="text-center p-3">
      <small style={{ color: "white" }}>&copy; 2024 Portfolio Generator - All rights reserved</small>
      <br />
      <small>
        <a style={{ color: "white", cursor: "pointer" }} onClick={() => history.push('/')}>
          Back to Home |
        </a>
        <a style={{ color: "white", cursor: "pointer" }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Back to top |
        </a>
        <a style={{ color: "white", cursor: "pointer" }} onClick={() => alert('Privacy policy coming soon!')}>
          Privacy |
        </a>
        <a style={{ color: "white", cursor: "pointer" }} onClick={() => alert('Terms of service coming soon!')}>
          Terms
        </a>
      </small>
    </div>
  );
}
