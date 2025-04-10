"use server";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in.");
  }
  const nationalID = formData.get("nationalID");

  const data = formData.get("nationality")! as string;
  const [nationality, countryFlag] = data.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string)) {
    throw new Error("Please provide a valid national ID");
  }
  const updatedData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session!.user.guestId);
  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId: string) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in.");
  }
  const guestBookings = await getBookings(session!.user.guestId!);
  const guestBookingIds = guestBookings.map((bookings) => bookings.id);
  if (!guestBookingIds.includes(Number(bookingId))) {
    throw new Error("Unauthorized");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", Number(bookingId));
  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${bookingId}`);
}

export async function updateBooking(formData: FormData): Promise<void> {
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations")!.slice(0, 1000);
  const bookingId = formData.get("bookingId");

  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in.");
  }
  const guestBookings = await getBookings(session!.user.guestId!);
  const guestBookingIds = guestBookings.map((bookings) => bookings.id);
  if (!guestBookingIds.includes(Number(bookingId))) {
    throw new Error("Unauthorized");
  }
  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", bookingId);
  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createBooking(
  bookingData: { cabinPrice: number; cabinId: number },
  formData: FormData
): Promise<void> {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in.");
  }
  const newBooking = {
    ...bookingData,
    guestId: session!.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")!.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) {
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
