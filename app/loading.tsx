export default function Loading() {
  return (
    <div className="admin-grid">
      <div className="panel animate-pulse p-4">
        <div className="h-3 w-24 rounded-full bg-panel-muted" />
        <div className="mt-3 h-8 w-72 rounded-full bg-panel-muted" />
        <div className="mt-3 h-4 w-full rounded-full bg-panel-muted" />
      </div>
      <div className="grid gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="panel-muted h-28 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
