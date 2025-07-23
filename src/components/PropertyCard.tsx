import React from "react";

export interface PropertyCardProps {
  title: string;
  imgs: string[];
  price: string;
  bedrooms: string;
  full_bathrooms: string;
  address: string;
  total_sqft?: string;
  status?: string;
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  padding: 16,
  maxWidth: 320,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 6,
  background: "#f5f5f5",
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  margin: 0,
};

const infoRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  fontSize: 14,
  color: "#555",
};

const addressStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#888",
  margin: 0,
};

const statusStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#1976d2",
  fontWeight: 500,
  marginTop: 4,
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  imgs,
  price,
  bedrooms,
  full_bathrooms,
  address,
  total_sqft,
  status,
}) => {
  return (
    <div style={cardStyle}>
      <img
        src={imgs && imgs.length > 0 ? imgs[0] : "/public/file.svg"}
        alt={title}
        style={imgStyle}
      />
      <h2 style={titleStyle}>{title}</h2>
      <div style={infoRowStyle}>
        <span>{bedrooms} Bed</span>
        <span>{full_bathrooms} Bath</span>
        {total_sqft && <span>{total_sqft} sqft</span>}
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, color: "#2e7d32" }}>{price}</div>
      <p style={addressStyle}>{address}</p>
      {status && <div style={statusStyle}>{status}</div>}
    </div>
  );
};

export default PropertyCard; 