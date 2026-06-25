import React from "react";

function PageLoader(){
  return(
  <div className = "page-loader">
    <div className = "loader-spinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
    
    <h3>Loading...</h3>
    
    <p>Please wait</p>
  </div>
  );
}

export default PageLoader;