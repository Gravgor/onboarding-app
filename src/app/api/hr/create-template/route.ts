import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createOnboardingTemplate } from "@/lib/actions/actions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user.companyId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, tasks, documents, complianceItems } = body;

    const newTemplate = await createOnboardingTemplate({
      name,
      description,
      tasks,
      documents,
      complianceItems,
      companyId: session.user.companyId,
    });

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error("Error creating onboarding template:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}