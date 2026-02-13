function FileSummary() {
  return (
    <div className="card bg-base-100 max-w-lg shadow-sm">
      <div className="card-body">
        <div className="text-xs uppercase tracking-widest text-base-content/50">Ghost Story ID</div>

        <div className="text-3xl font-semibold mt-1">Qterw-D-43</div>

        <div className="mt-1">
          <div className="flex justify-between">
            <span className="text-base-content/60">Darkness Class</span>
            <div className="badge badge-outline badge-primary">D</div>
          </div>

          <div className="divider my-1"></div>

          <div className="flex justify-between">
            <span className="text-base-content/60">Procedure Manual</span>
            <span className="text-success font-medium">Yes</span>
          </div>

          <div className="divider my-1"></div>

          <div className="flex justify-between">
            <span className="text-base-content/60">Procedure Manual</span>
            <div className="badge badge-outline badge-primary">Level 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileSummary;
