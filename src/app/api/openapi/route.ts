import { openApiSpec } from "@/lib/openapi/spec";

export function GET() {
  return Response.json(openApiSpec);
}
