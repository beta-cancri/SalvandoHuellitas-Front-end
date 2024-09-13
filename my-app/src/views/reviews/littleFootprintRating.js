import React from "react";
import "../reviews/littlefootprint.styles.css"; // Si tienes estilos CSS específicos para las estrellas
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const littleFootprintRating = ({ rating }) => {
  const paws = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? "paw filled" : "paw"}>
      <FontAwesomeIcon icon={faPaw} />
    </span>
  ));

  return <div className="little-footprint-rating">{paws}</div>;
};

export default littleFootprintRating;
