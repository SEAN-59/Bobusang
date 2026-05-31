export function GET() {
  return Response.json({
    ok: true,
    service: "bobusang",
    checkedAt: new Date().toISOString(),
  });
}
