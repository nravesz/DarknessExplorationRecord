function Pagination({ page, totalPages, onPrev, onNext }: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      <button className="btn btn-sm" onClick={onPrev} disabled={page === 0}>Previous</button>
      <span className="text-sm text-base-content/60">{page + 1} / {totalPages}</span>
      <button className="btn btn-sm" onClick={onNext} disabled={page === totalPages - 1}>Next</button>
    </div>
  );
}

export default Pagination;
