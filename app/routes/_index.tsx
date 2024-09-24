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

  return (
    <div className="w-full h-dvh justify-center">
      <div className="w-[968px] mx-auto">
        <Tabs.Root className="TabsRoot" defaultValue="inbox">
          <Tabs.List className="flex gap-6 text-[#363644] text-sm">
            <Tabs.Trigger
              value="inbox"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb]"
            >
              Bill Inbox
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                3
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="approval"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb]"
            >
              Bill Inbox
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                3
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="scheduled"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb]"
            >
              Bill Inbox
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                3
              </div>
            </Tabs.Trigger>{" "}
            <Tabs.Trigger
              value="paid"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb]"
            >
              Bill Inbox
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                3
              </div>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
    </div>
  );
}
