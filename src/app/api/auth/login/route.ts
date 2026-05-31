import bcrypt from "bcryptjs";

type LoginRequestBody = {
  password?: unknown;
  userId?: unknown;
};

export async function POST(request: Request) {
  let body: LoginRequestBody;

  try {
    body = await request.json() as LoginRequestBody;
  } catch {
    return Response.json({ message: "잘못된 요청입니다.", ok: false }, { status: 400 });
  }

  const userId = typeof body.userId === "string" ? body.userId.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    return Response.json({ message: "로그인 설정이 없습니다.", ok: false }, { status: 500 });
  }

  const isUsernameValid = userId === adminUsername;
  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

  if (!isUsernameValid || !isPasswordValid) {
    return Response.json({ message: "아이디 또는 비밀번호를 확인해주세요.", ok: false }, { status: 401 });
  }

  return Response.json({ ok: true });
}
