import { roundIfNumber } from "@/lib/utils";

type Props = {
  value: number | string | null;
  label: string;
};

const MetricCard = ({ value, label }: Props) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{roundIfNumber(value )}</p>
    </div>
  );
};

export default MetricCard;