import type { Metadata } from "next";
import ConsultationClient from "./consultation-client";

export const metadata: Metadata = {
  title: "Beratungstermin buchen",
  description:
    "Vereinbaren Sie eine vertrauliche Beratung mit einem Anwalt von Shield&Siegel. Wählen Sie zwischen Basis-, Premium- oder Eilberatung mit transparenten Preisen.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
