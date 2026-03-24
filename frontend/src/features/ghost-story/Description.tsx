function Description() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="border-l-4 border-brand pl-4">
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-1">Summary</div>
        <p className="text-base-content/80 leading-relaxed">
          The Tuesday Quiz Show is a recurring anomalous event first documented in 1987. It manifests as a
          television broadcast on non-operational sets, airing every Tuesday at 23:00 local time regardless
          of location or power availability.
        </p>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-base-content/40 mb-3">Observations</div>
        <div className="space-y-3 text-base-content/70 leading-relaxed">
          <p>
            The broadcast features an unnamed host presenting trivia questions to an unseen studio audience.
            Questions are tailored to the individual viewer, drawing from personal memories and knowledge
            inaccessible through conventional means.
          </p>
          <p>
            Viewers who answer incorrectly report a persistent feeling of being watched for the following
            72 hours. No physical harm has been recorded to date.
          </p>
        </div>
      </div>

      <div className="bg-base-200 border-l-2 border-base-content/20 px-4 py-3 text-sm text-base-content/50 italic">
        Last updated by Field Agent #112 — 2024-08-14
      </div>
    </div>
  );
}

export default Description;
