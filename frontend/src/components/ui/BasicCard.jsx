function BasicCard({ titulo, parrafo }) {
  return (
    <div className="card-section">
      <div className="card-box">
        <h2 class="card-title-floating">{titulo}</h2>
        <p className="card-text">{parrafo}</p>
      </div>
    </div>
  );
}

export default BasicCard;
