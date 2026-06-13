export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="tutorial-step">
      <input
        type="checkbox"
        id={title}
        name={title}
        className="tutorial-check"
      />
      <label htmlFor={title} className="tutorial-label">
        <span className="tutorial-title">{title}</span>
        <div className="tutorial-content">{children}</div>
      </label>
    </li>
  );
}
