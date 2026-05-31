"use client";

import { useEffect } from "react";
import "swagger-ui-dist/swagger-ui.css";

type SwaggerUIBundleOptions = {
  url: string;
  dom_id: string;
  deepLinking: boolean;
  presets: unknown[];
  plugins: unknown[];
  layout: string;
};

type SwaggerUIBundleType = {
  (options: SwaggerUIBundleOptions): unknown;
  presets: {
    apis: unknown;
  };
  plugins: {
    DownloadUrl: unknown;
  };
};

type SwaggerStandalonePresetType = unknown;

export function SwaggerStandalone() {
  useEffect(() => {
    let mounted = true;

    async function mountSwagger() {
      const [{ default: SwaggerUIBundle }, { default: SwaggerUIStandalonePreset }] = await Promise.all([
        import("swagger-ui-dist/swagger-ui-bundle"),
        import("swagger-ui-dist/swagger-ui-standalone-preset"),
      ]);

      if (!mounted) {
        return;
      }

      const bundle = SwaggerUIBundle as SwaggerUIBundleType;
      const standalonePreset = SwaggerUIStandalonePreset as SwaggerStandalonePresetType;

      bundle({
        url: "/api/openapi",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [bundle.presets.apis, standalonePreset],
        plugins: [bundle.plugins.DownloadUrl],
        layout: "StandaloneLayout",
      });
    }

    void mountSwagger();

    return () => {
      mounted = false;
    };
  }, []);

  return <div id="swagger-ui" />;
}
