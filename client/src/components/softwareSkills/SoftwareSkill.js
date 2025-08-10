import React from "react";
import "./SoftwareSkill.css";
import { skillsSection } from "../../portfolio";

export default function SoftwareSkill() {
  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;
  
  return (
    <div>
      <div className="software-skills-main-div">
        <ul 
          className="dev-icons"
          style={{
            justifyContent: isMobile ? 'center' : 'flex-start',
            gap: isSmallMobile ? '0.5rem' : isMobile ? '0.75rem' : '1rem',
            padding: isMobile ? '0 1rem' : '0'
          }}
        >
          {skillsSection.softwareSkills.map((skills, index) => {
            return (
              <li 
                key={index}
                className="software-skill-inline" 
                name={skills.skillName}
                style={{
                  margin: isSmallMobile ? '0.25rem' : isMobile ? '0.5rem' : undefined,
                  minWidth: isSmallMobile ? '60px' : isMobile ? '70px' : '80px'
                }}
              >
                <i 
                  className={skills.fontAwesomeClassname}
                  style={{
                    fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.75rem' : '2rem',
                    marginBottom: isSmallMobile ? '0.25rem' : '0.5rem'
                  }}
                />
                <p style={{
                  fontSize: isSmallMobile ? '8px' : isMobile ? '9px' : '10px',
                  margin: 0,
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  lineHeight: '1.2'
                }}>
                  {skills.skillName}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}