import React from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { skillsSection } from "../../portfolio";
import {Fade} from "react-reveal";

export default function Skills() {
  const isMobile = window.innerWidth < 768;
  
  return (
    <div className="main" id="skills">
      <div className="skills-main-div">
        <Fade left={!isMobile} duration={isMobile ? 0 : 1000}>
        <div className="skills-image-div">
          <img 
            alt="Saad Working" 
            src={require("../../images/developerActivity.png")}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: isMobile ? '200px' : 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
        </Fade>
        <Fade right={!isMobile} duration={isMobile ? 0 : 1000}>
        <div className="skills-text-div">
          <h1 
            className="skills-heading"
            style={{
              fontSize: window.innerWidth < 480 ? '2rem' : window.innerWidth < 768 ? '2.5rem' : undefined,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            {skillsSection.title}
          </h1>
          <p 
            className="subTitle skills-text-subtitle"
            style={{
              fontSize: window.innerWidth < 480 ? '14px' : window.innerWidth < 768 ? '15px' : undefined,
              textAlign: isMobile ? 'center' : 'left',
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            {skillsSection.subTitle}
          </p>
          <SoftwareSkill />
          <div style={{
            textAlign: isMobile ? 'center' : 'left'
          }}>
            {skillsSection.skills.map((skills, index) => {
              return <p 
                key={index}
                className="subTitle skills-text"
                style={{
                  fontSize: window.innerWidth < 480 ? '14px' : window.innerWidth < 768 ? '15px' : undefined,
                  textAlign: isMobile ? 'center' : 'left',
                  padding: isMobile ? '0 1rem' : '0'
                }}
              >
                {skills}
              </p>;
            })}
          </div>
        </div>
        </Fade>
      </div>
    </div>
  );
}