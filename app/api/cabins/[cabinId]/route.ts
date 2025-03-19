import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest } from "next/server";

type Params = {
  cabinId: string;
};
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    console.error(err);
    return Response.json({ data: "Cabin not found" });
  }
}
