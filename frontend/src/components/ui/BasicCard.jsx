function BasicCard({ titulo, parrafo }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{parrafo}</p>
      </div>
    </div>
  );
}

export default BasicCard;
