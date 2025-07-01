import { getContributions } from '@/services/github';

export async function GET() {
  return Response.json(await getContributions());
}
