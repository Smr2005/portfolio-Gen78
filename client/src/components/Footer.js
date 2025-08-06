import React from "react";
import { useHistory } from "react-router-dom";

export default function Footer() {
  const history = useHistory();
  
  return (
    <div style={{ backgroundColor: "black" }} className="text-center p-3">
      <small style={{ color: "white" }}>&copy; 2024 Portfolio Generator - All rights reserved</small>
      <br />
      <small>
        <button 
          style={{ color: "white", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" }} 
          onClick={() => history.push('/')}
        >
          Back to Home |
        </button>
        <button 
          style={{ color: "white", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" }} 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          Back to top |
        </button>
        <button 
          style={{ color: "white", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" }} 
          onClick={() => alert('Privacy policy coming soon!')}
        >
          Privacy |
        </button>
        <button 
          style={{ color: "white", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" }} 
          onClick={() => alert('Terms of service coming soon!')}
        >
          Terms
        </button>
      </small>
    </div>
  );
}
