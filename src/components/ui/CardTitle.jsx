export default function CardTitle({ emoji, title, sub }) {
  return (
    <div className="card-title-block">
      <div className="card-title-text">
        {emoji} {title}
      </div>
      {sub && (
        <div className="text-sm text-muted" style={{ marginTop: 3 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
