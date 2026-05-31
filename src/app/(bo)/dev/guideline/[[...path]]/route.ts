import { readFile, stat } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const guidelineRoot = path.join(/*turbopackIgnore: true*/ process.cwd(), "guideline-source", "web-design-guideline");

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

function getSafeFilePath(segments: string[]) {
  if (segments.some((segment) => segment === ".." || segment.includes("/") || segment.includes("\\"))) {
    return null;
  }

  const filePath = path.normalize(path.join(guidelineRoot, ...segments));

  if (!filePath.startsWith(`${guidelineRoot}${path.sep}`) && filePath !== guidelineRoot) {
    return null;
  }

  return filePath;
}

export async function GET(_request: Request, context: { params: Promise<{ path?: string[] }> }) {
  if (process.env.APP_ENV === "production") {
    return new Response("Not Found", { status: 404 });
  }

  const params = await context.params;
  const segments = params.path?.length ? params.path : ["main.html"];
  const filePath = getSafeFilePath(segments);

  if (!filePath) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const fileStat = await stat(/*turbopackIgnore: true*/ filePath);

    if (!fileStat.isFile()) {
      return new Response("Not Found", { status: 404 });
    }

    const body = await readFile(/*turbopackIgnore: true*/ filePath);
    const extension = path.extname(filePath).toLowerCase();

    return new Response(body, {
      headers: {
        "cache-control": "no-store",
        "content-type": contentTypes[extension] ?? "application/octet-stream",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
