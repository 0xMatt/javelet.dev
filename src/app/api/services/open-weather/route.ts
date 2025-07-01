import { getCurrentForecast } from '@/services/open-weather';

export async function GET() {
  return Response.json(await getCurrentForecast());
}
