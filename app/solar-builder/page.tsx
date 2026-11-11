import { redirect } from "next/navigation";

export default function SolarBuilderRedirect() {
  redirect("/build-calculator?tab=solar");
}
