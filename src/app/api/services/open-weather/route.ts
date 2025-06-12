import {getCurrentForecast} from "@/services/open-weather";

export async function GET() {
    const res = await getCurrentForecast();
    const data = await res.json()
    return Response.json(data);
}