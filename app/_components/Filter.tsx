"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    route.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" activeFilter={activeFilter} handler={handleFilter}>
        {" "}
        All Cabins
      </Button>
      <Button filter="small" activeFilter={activeFilter} handler={handleFilter}>
        {" "}
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handler={handleFilter}
      >
        {" "}
        4&mdash;6 guests
      </Button>
      <Button filter="large" activeFilter={activeFilter} handler={handleFilter}>
        {" "}
        7&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({
  filter,
  handler,
  activeFilter,
  children,
}: {
  filter: string;
  handler: (filter: string) => void;
  activeFilter: string;
  children: string[];
}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handler(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
