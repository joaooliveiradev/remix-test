import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";

import * as Tabs from "@radix-ui/react-tabs";

import { mockInvoices } from "~/api/invoices";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return {
    invoicesData: mockInvoices,
  };
};

export default function Index() {
  const data = useLoaderData();

  console.log({ data });
  return (
    <div className="w-full h-dvh justify-center">
      <div className="w-[968px] mx-auto">
        dads
        <Tabs.Root className="TabsRoot" defaultValue="tab1"></Tabs.Root>
      </div>
    </div>
  );
}
