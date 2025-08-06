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

  return (
    <div>
      {/* Preview Controls */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '10px 0',
        zIndex: 10000,
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => history.push('/templates')}
              >
                ← Back to Templates
              </Button>
            </div>
            <div className="col-md-4">
              <strong>Preview: {template.name}</strong>
            </div>
            <div className="col-md-4">
              <Button 
                variant="success" 
                size="sm"
                onClick={() => history.push(`/builder?template=${templateId}`)}
              >
                Use This Template →
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Template Preview */}
      <div style={{ paddingTop: '60px' }}>
        {renderTemplate()}
      </div>
    </div>
  );
}

export default Preview;