import React from "react";
import PageLoader from "../../components/Common/PageLoader";

function Card({title, value}){
    return(
        <div className = "card" role = "region" aria-label = {title || "card"}>
            <h4>{title || "N/A"}</h4>
            <h2>{value ?? 0}</h2>
        </div>
    );
}

export default Card;