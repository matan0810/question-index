export default function ChapterCell({ ch, color, accent }) {
  return (
    <div>
      <b style={{ color }}>
        פרק {ch.key}׳ — {ch.points} נק׳
      </b>
      <br />
      {ch.description}
      {ch.warning && (
        <>
          <br />
          <span style={{ color: accent, fontSize: 11 }}>⚠️ {ch.warning}</span>
        </>
      )}
    </div>
  );
}
