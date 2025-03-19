"use client";
import { differenceInDays, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CabinType } from "./Rerservations";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(
  range: { from: Date | undefined; to: Date | undefined },
  datesArr: Date[]
) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

type SettingType = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
function DateSelector({
  settings,
  cabin,
  bookedDates,
}: {
  settings: SettingType;
  cabin: CabinType;
  bookedDates: Date[];
}) {
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to!, displayRange.from!);
  const cabinPrice = numNights * (regularPrice - discount);
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center text-xs"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        // @ts-expect-error: Ignorable error
        onSelect={setRange}
        selected={displayRange}
        hidden={{ before: new Date() }}
        startMonth={new Date()}
        startDate={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)} // December of the year 5 years from now
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
