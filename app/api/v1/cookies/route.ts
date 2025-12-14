// basic post route to set a cookie
import { getAppSession } from "@/lib/utils/cookies";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { user, group, entity } = await getAppSession();
  const response = NextResponse.json({ user, group, entity });
  return response;
}
