import Cabin from "@/app/_components/Cabin";
import Rerservations from "@/app/_components/Rerservations";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { [cabinId: string]: string };
}) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((c) => ({ cabinId: String(c.id) }));
  return ids;
}

export default async function Page({
  params,
}: {
  params: { [cabinId: string]: string };
}) {
  const cabin = await getCabin(params.cabinId);
  const { name, maxCapacity, image, description } = cabin;
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin
        image={image}
        description={description}
        name={name}
        maxCapacity={maxCapacity}
      />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Rerservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
