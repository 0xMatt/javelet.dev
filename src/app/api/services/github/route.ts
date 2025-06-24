import { getContributions } from '@/services/github';

export async function GET() {
  const res = await getContributions();
  return Response.json(await res.json());
}
