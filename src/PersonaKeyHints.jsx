export default function PersonaKeyHints({
  mounted,
  rootClass,
  rowClass,
  keyClass,
  rows,
  mountedClass = "mounted",
}) {
  return (
    <div className={`${rootClass}${mounted ? ` ${mountedClass}` : ""}`}>
      {rows.map((row) => (
        <div className={rowClass} key={`${row.keyLabel}-${row.label}`}>
          <span className={keyClass}>{row.keyLabel}</span>
          <span>{row.label}</span>
        </div>
      ))}
    </div>
  );
}
