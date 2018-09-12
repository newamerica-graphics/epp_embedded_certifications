import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import PindropMap from "./charts/PindropMap";

const settings = {
  viz__map: {
    render: map
  }
};

function map(el, data) {
  const tooltipTemplate = d => (
    <div>
      <div className="tooltip__title-container">
        <h1 className="tooltip__title">{d["Institution Name"]}</h1>
      </div>
      <div className="tooltip__category">
        {Object.keys(d)
          .filter(
            key => key !== "Institution Name" && key !== "lat" && key !== "lon"
          )
          .map((key, i) => (
            <div className="tooltip__category__list-item" key={i}>
              <span className="tooltip__category__list-item__label">
                {key}:
              </span>
              <span className="tooltip__category__list-item__value">
                {d[key]}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
  const source = () => (
    <span>
      Student enrollment figures taken from the National Center for Education
      Statistics Integrated Postsecondary Education Data System (IPEDS).
      Accessed through{" "}
      <a href="https://nces.ed.gov/collegenavigator/" target="_blank">
        College Navigator
      </a>
      , September 4, 2018.
    </span>
  );
  ReactDOM.render(
    <PindropMap
      data={data.viz__map}
      geometry="us"
      title="Phase II Interviewees"
      source={source}
      width={1000}
      height={600}
      tooltipTemplate={tooltipTemplate}
    />,
    el
  );
}

window.renderDataViz = function(el) {
  let id = el.getAttribute("id");
  fetch(
    "https://na-data-projects.s3.amazonaws.com/data/epp/embedded_certifications.json"
  )
    .then(response => response.json())
    .then(data => {
      settings[id].render(el, data);
    });
};
