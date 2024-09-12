import { registerUser } from '@/lib/actions/actions.user';

export async function POST(req: Request) {
  const { name, email, password, companyName, plan } = await req.json();
  const result = await registerUser(name, email, password, companyName, plan);
  return Response.json(result);
}