import React from "react";

function AlbumCard(props) {
  return (
    // <div className="col mb-4 mt-5">
    //   <div className="card h-100 border-dark">
        
    //   </div>
    // </div>
    <React.Fragment>
      <div className="card-deck justify-content-center">
        <div className="card mb-3" style={{maxWidth: "640px"}}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={props.image} className="card-img" alt="imageThumb"/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.year}</p>
                <p className="card-text">{props.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AlbumCard;