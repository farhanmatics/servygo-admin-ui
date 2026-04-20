export function Pagination() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel px-3 py-2 text-[12px] shadow-sm">
      <div className="text-stone">
        Showing <span className="font-semibold text-ink">1-25</span> of{" "}
        <span className="font-semibold text-ink">324</span>
      </div>
      <div className="flex items-center gap-1">
        {["Prev", "1", "2", "3", "Next"].map((label, index) => (
          <button
            className={[
              "rounded-lg px-2.5 py-1.5 transition",
              index === 1 ? "bg-panel-muted font-semibold text-ink" : "text-stone hover:text-ink",
            ].join(" ")}
            key={label}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
