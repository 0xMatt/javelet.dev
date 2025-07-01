import { getSummaries } from '@/services/wakatime';

export async function GET() {
  return Response.json(await getSummaries());
}
