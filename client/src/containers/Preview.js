import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Navbar, Nav, Button, Card } from "react-bootstrap";
import { images } from "../components/images";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";

function Preview() {
  const history = useHistory();
  const { templateId } = useParams();

  const templateData = {
    template1: {
      name: "Modern Developer",
      image: images.portfolio1,
      description: "Sleek, modern design perfect for full-stack developers",
      features: ["Gradient Design", "Smooth Animations", "Skills Showcase", "Project Portfolio"]
    },
    template2: {
      name: "Creative Designer",
      image: images.portfolio2,
      description: "Vibrant, artistic layout ideal for creative professionals",
      features: ["Colorful Gradients", "Floating Elements", "Creative Animations", "Portfolio Gallery"]
    },
    template3: {
      name: "Business Professional",
      image: images.portfolio3,
      description: "Clean, corporate design for business consultants",
      features: ["Professional Layout", "Progress Bars", "Case Studies", "Statistics Display"]
    },
    template4: {
      name: "Minimalist Clean",
      image: images.portfolio4,
      description: "Ultra-clean, minimal design focusing on typography",
      features: ["Minimal Design", "Clean Typography", "Geometric Elements", "Elegant Layout"]
    },
    template5: {
      name: "Developer Terminal",
      image: images.portfolio2,
      description: "Dark theme terminal-style design for software engineers",
      features: ["Dark Theme", "Code Syntax", "Terminal Style", "GitHub Integration"]
    },
    template6: {
      name: "Marketing Pro",
      image: images.portfolio1,
      description: "Dynamic, results-focused design for marketing professionals",
      features: ["Gradient Animations", "Stats Display", "Campaign Showcase", "ROI Focus"]
    }
  };

  const template = templateData[templateId] || templateData.template1;

  const renderTemplate = () => {
    switch(templateId) {
      case 'template1':
        return <Template1 isPreview={true} />;
      case 'template2':
        return <Template2 isPreview={true} />;
      case 'template3':
        return <Template3 isPreview={true} />;
      case 'template4':
        return <Template4 isPreview={true} />;
      case 'template5':
        return <Template5 isPreview={true} />;
      case 'template6':
        return <Template6 isPreview={true} />;
      default:
        return <Template1 isPreview={true} />;
    }
  };

  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  return (
    <div>
      {/* Preview Controls */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.95)',
        color: 'white',
        padding: isMobile ? '8px 0' : '10px 0',
        zIndex: 10000,
        textAlign: 'center'
      }}>
        <div className="container" style={{
          padding: isMobile ? '0 10px' : undefined
        }}>
          <div className={`row align-items-center ${isMobile ? 'text-center' : ''}`}>
            <div className={isMobile ? "col-12 mb-2" : "col-md-4"}>
              <Button 
                variant="outline-light" 
                size={isSmallMobile ? "sm" : "sm"}
                onClick={() => history.push('/templates')}
                style={{
                  fontSize: isSmallMobile ? '0.8rem' : '0.9rem',
                  padding: isSmallMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                  minHeight: isMobile ? '36px' : 'auto',
                  width: isMobile ? '100%' : 'auto',
                  maxWidth: isMobile ? '280px' : 'none'
                }}
              >
                ← Back to Templates
              </Button>
            </div>
            <div className={isMobile ? "col-12 mb-2" : "col-md-4"}>
              <strong style={{
                fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.1rem',
                display: 'block',
                whiteSpace: isMobile ? 'nowrap' : 'normal',
                overflow: isMobile ? 'hidden' : 'visible',
                textOverflow: isMobile ? 'ellipsis' : 'clip'
              }}>
                Preview: {template.name}
              </strong>
            </div>
            <div className={isMobile ? "col-12" : "col-md-4"}>
              <Button 
                variant="success" 
                size={isSmallMobile ? "sm" : "sm"}
                onClick={() => history.push(`/builder?template=${templateId}`)}
                style={{
                  fontSize: isSmallMobile ? '0.8rem' : '0.9rem',
                  padding: isSmallMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
                  minHeight: isMobile ? '36px' : 'auto',
                  width: isMobile ? '100%' : 'auto',
                  maxWidth: isMobile ? '280px' : 'none'
                }}
              >
                Use This Template →
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Preview */}
      <div style={{ 
        paddingTop: isMobile ? '120px' : '60px' // More space needed on mobile due to stacked buttons
      }}>
        {renderTemplate()}
      </div>
    </div>
  );
}

export default Preview;