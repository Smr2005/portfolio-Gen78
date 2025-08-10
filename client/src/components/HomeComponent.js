import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Templates from "../containers/Templates";
import Header from "./Header";

class Home extends Component {
  componentDidMount() {
    // Check if a template was selected
    const urlParams = new URLSearchParams(this.props.location.search);
    const templateId = urlParams.get('template');
    
    if (templateId) {
      // Redirect to builder with the selected template
      this.props.history.push(`/builder?template=${templateId}`);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid pt-3">
          <div className="row" style={{ backgroundColor: "rgb(32,32,32)" }}>
            <div className={`col-12 col-md-6 ${window.innerWidth < 768 ? 'p-3 pt-4' : 'p-md-5 pt-5 p-3'}`}>
              <h1 style={{ 
                color: "white", 
                fontSize: window.innerWidth < 480 ? "4vh" : window.innerWidth < 768 ? "5vh" : "8vh",
                lineHeight: "1.2",
                textAlign: window.innerWidth < 768 ? "center" : "left"
              }}>
                Pick your
                <br /> starting point.
              </h1>
            </div>
            <div className={`col-12 col-md-6 ${window.innerWidth < 768 ? 'p-3' : 'p-md-5 p-3'} align-self-center`}>
              <h5 style={{ 
                color: "whitesmoke",
                fontSize: window.innerWidth < 480 ? "14px" : window.innerWidth < 768 ? "16px" : undefined,
                lineHeight: window.innerWidth < 768 ? "1.5" : "1.4",
                textAlign: window.innerWidth < 768 ? "center" : "left",
                padding: window.innerWidth < 768 ? "0 1rem" : "0"
              }}>
                Get started with any of our best-in-class website templates and
                customize it to fit your needs, whether it's contact forms or
                color palettes. Making a beautiful website has never been
                faster.
              </h5>
            </div>
          </div>
        </div>
        <Templates />
      </div>
    );
  }
}

export default withRouter(Home);
