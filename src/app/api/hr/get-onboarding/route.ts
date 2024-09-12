import { getOnboardingDetails } from "@/lib/actions";
import { getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const session = await getServerAuthSession()
  
  if (!session || !session.user.companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {id, companyId} = body;
    const onboarding = await getOnboardingDetails(id, companyId);
    return NextResponse.json(onboarding, { status: 200 });
  } catch (error) {
    console.error("Error creating onboarding template:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}