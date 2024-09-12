import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/lib/actions';

export async function POST(req: Request, res: Response) {
  const { name, email, password, companyName, plan } = await req.json();
  const result = await registerUser(name, email, password, companyName, plan);
  return Response.json(result);
}