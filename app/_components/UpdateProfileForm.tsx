import Image from "next/image";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

type GuestType = {
  fullName: string;
  email: string;
  nationalID: string;
  countryFlag: string;
};
function UpdateProfileForm({
  children,
  guest,
}: {
  children: React.ReactNode;
  guest: GuestType;
}) {
  const { fullName, email, nationalID, countryFlag } = guest;
  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          defaultValue={fullName}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              width={20}
              height={20}
              src={countryFlag}
              alt="Country flag"
              className="rounded-sm"
            />
          )}
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update</SubmitButton>
      </div>
    </form>
  );
}
export default UpdateProfileForm;
