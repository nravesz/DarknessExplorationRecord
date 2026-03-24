import Description from "./Description";
import FileSummary from "./FileSummary";

function Overview() {
  return (
    <div className="space-y-8">
      <FileSummary />
      <Description />
    </div>
  );
}

export default Overview;
