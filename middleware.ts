// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
