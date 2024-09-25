import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";

import * as Tabs from "@radix-ui/react-tabs";

import { InvoicesTable } from "~/components/InvoicesTable";

import { type Invoice, mockInvoices } from "~/api/invoices";
import { DashboardHeader } from "~/components/DashboardHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return mockInvoices;
};

export default function Index() {
  const data = useLoaderData<Invoice[]>();

  const inboxData = data.filter(
    (invoice) => invoice.status === "inbox"
  ) as Invoice[];

  const approvalData = data.filter(
    (invoice) => invoice.status === "needing_approval"
  );
  const scheduledData = data.filter(
    (invoice) => invoice.status === "scheduled"
  );

  return (
    <div className="w-full h-dvh justify-center py-8">
      <div className="w-[968px] h-dvh mx-auto flex flex-col gap-8">
        <div className="w-full flex gap-6 items-center">
          <h1 className="text-[28px] leading-[36px] font-normal">Bill Pay</h1>
          <div className="bg-[#7073930F] hover:cursor-pointer hover:bg-[#1212160f] px-4 py-1 rounded-full text-[15px] text-[#363644] min-w-[50px]">
            Add Bill
          </div>
        </div>
        <DashboardHeader data={data} />
        <Tabs.Root className="TabsRoot" defaultValue="inbox">
          <Tabs.List className="flex gap-6 text-[#363644] text-sm">
            <Tabs.Trigger
              value="inbox"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none"
            >
              Bill Inbox
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                {inboxData.length}
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="approval"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none"
            >
              Bills Needing Approval
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                {approvalData.length}
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="scheduled"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none"
            >
              Scheduled Bills
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                {scheduledData.length}
              </div>
            </Tabs.Trigger>{" "}
            <Tabs.Trigger
              value="paid"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none"
            >
              Paid Bills
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="inbox" className="mt-6">
            <InvoicesTable data={inboxData} />
          </Tabs.Content>
          <Tabs.Content value="approval" className="mt-6">
            approval
          </Tabs.Content>{" "}
          <Tabs.Content value="scheduled" className="mt-6">
            scheduled bills
          </Tabs.Content>
          <Tabs.Content value="paid" className="mt-6">
            paid
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
