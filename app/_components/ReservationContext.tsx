"use client";
import React, { createContext, useContext, useState } from "react";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type ReservationContextType = {
  range: DateRange;
  setRange: (initialState: DateRange) => void;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType | null>(null);

const initialState: DateRange = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("Context was used outside the ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
