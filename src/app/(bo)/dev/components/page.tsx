import { notFound } from "next/navigation";

import {
  ColorFoundation,
  FoundationPreviewShell,
  RadiusShadowFoundation,
  SpacingFoundation,
  TypographyFoundation,
} from "@/foundation";
import { ComponentsPreview, ToastProvider } from "@/components";

export const dynamic = "force-dynamic";

export default function ComponentsPage() {
  if (process.env.APP_ENV === "production") {
    notFound();
  }

  return (
    <ToastProvider>
      <FoundationPreviewShell>
        <ColorFoundation />
        <TypographyFoundation />
        <SpacingFoundation />
        <RadiusShadowFoundation />
        <ComponentsPreview />
      </FoundationPreviewShell>
    </ToastProvider>
  );
}
