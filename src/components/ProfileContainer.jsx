import React from "react";
import "../styles/ProfileContainer.css";

const ProfileContainer = ({
  icon,
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
  cardType = "default",
}) => {
  return (
    <div className={`profile-card profile-card--${cardType}`}>
      <div className="profile-card__header">
        {icon && <div className="profile-card__icon">{icon}</div>}
        <h3 className="profile-card__title">{title}</h3>
      </div>
      {subtitle && <h5 className="profile-card__subtitle">{subtitle}</h5>}
      {description && (
        <p className="profile-card__description">{description}</p>
      )}
      {buttonText && (
        <button onClick={onButtonClick} className="profile-card__button">
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ProfileContainer;
