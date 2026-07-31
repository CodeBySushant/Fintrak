import { BarLoader } from "react-spinners";

export default function MainLoading() {
  return (
    <div className="px-5 pt-2">
      <BarLoader width={"100%"} color="#111827" />
    </div>
  );
}
