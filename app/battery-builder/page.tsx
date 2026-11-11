import { redirect } from "next/navigation";

export default function BatteryBuilderRedirect() {
  redirect("/build-calculator?tab=battery");
}
