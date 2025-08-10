import React from "react";
import { useHistory } from "react-router-dom";

export default function Footer() {
  const history = useHistory();
  
  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;
  
  const buttonStyle = {
    color: "white",
    cursor: "pointer", 
    background: "none",
    border: "none",
    textDecoration: "underline",
    padding: isMobile ? "8px 12px" : "4px 8px",
    margin: isMobile ? "4px 2px" : "0 4px",
    minHeight: isMobile ? "44px" : "auto",
    minWidth: isMobile ? "auto" : "auto",
    fontSize: isSmallMobile ? "12px" : isMobile ? "13px" : "14px",
    touchAction: "manipulation",
    borderRadius: "4px",
    transition: "background-color 0.2s ease"
  };
  
  const containerStyle = {
    backgroundColor: "black",
    padding: isSmallMobile ? "1rem 0.5rem" : isMobile ? "1.5rem 1rem" : "1rem",
    textAlign: "center"
  };
  
  const copyrightStyle = {
    color: "white",
    fontSize: isSmallMobile ? "11px" : isMobile ? "12px" : "13px",
    marginBottom: isMobile ? "0.75rem" : "0.5rem",
    display: "block"
  };
  
  return (
    <div style={containerStyle}>
      <small style={copyrightStyle}>
        &copy; 2024 Portfolio Generator - All rights reserved
      </small>
      
      {/* Mobile: Stack buttons vertically, Desktop: Keep horizontal */}
      <div style={{
        display: isMobile ? "flex" : "inline-block",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? "0.25rem" : "0"
      }}>
        <button 
          style={{
            ...buttonStyle,
            ":hover": { backgroundColor: "rgba(255,255,255,0.1)" }
          }}
          onClick={() => history.push('/')}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          {isMobile ? "🏠 Back to Home" : "Back to Home"}
        </button>
        {!isMobile && <span style={{color: "white", margin: "0 4px"}}>|</span>}
        
        <button 
          style={buttonStyle}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          {isMobile ? "⬆️ Back to top" : "Back to top"}
        </button>
        {!isMobile && <span style={{color: "white", margin: "0 4px"}}>|</span>}
        
        <button 
          style={buttonStyle}
          onClick={() => alert('Privacy policy coming soon!')}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          {isMobile ? "🔒 Privacy" : "Privacy"}
        </button>
        {!isMobile && <span style={{color: "white", margin: "0 4px"}}>|</span>}
        
        <button 
          style={buttonStyle}
          onClick={() => alert('Terms of service coming soon!')}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
        >
          {isMobile ? "📋 Terms" : "Terms"}
        </button>
      </div>
    </div>
  );
}
