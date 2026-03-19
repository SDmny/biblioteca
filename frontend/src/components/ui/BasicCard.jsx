function BasicCard({ titulo, children }) {
  return (
    <div className="card-section">
      <div className="card-box">
        <h2 className="card-title-floating">{titulo}</h2>
        <div className="card-text">{children}</div>
      </div>
    </div>
  );
}

export default BasicCard;