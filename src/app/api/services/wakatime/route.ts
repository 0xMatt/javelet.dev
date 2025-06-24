import { getSummaries } from '@/services/wakatime';

export async function GET() {
  const res = await getSummaries();
  return Response.json(await res.json());
}
