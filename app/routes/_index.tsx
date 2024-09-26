import { redirect, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@vercel/remix";

import * as Tabs from "@radix-ui/react-tabs";
import {
  Provider as ToastProvider,
  Viewport as ToastViewport,
} from "@radix-ui/react-toast";

import { DashboardHeader } from "~/components/DashboardHeader";
import { InboxTable } from "~/components/InboxTable";
import { NeedingApprovalTable } from "~/components/NeedingApprovalTable";

import {
  type Invoice,
  type InboxInvoice,
  type NeedingApprovalInvoice,
  mockInvoices,
} from "~/api/invoices";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => mockInvoices;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const invoiceIdsFormData = formData.getAll("invoiceIds") as string[];

  if (invoiceIdsFormData.length === 0) {
    const singleInvoiceId = formData.get("invoiceId");

    const index = mockInvoices.findIndex(
      (invoice) => invoice.id === singleInvoiceId
    );

    if (index !== -1) {
      mockInvoices.splice(index, 1);

      return redirect("/");
    }
  }

  const idsToBeDeletedArr = invoiceIdsFormData[0].split(",");

  idsToBeDeletedArr.forEach((id) => {
    const index = mockInvoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      mockInvoices.splice(index, 1);
    }
  });

  return redirect("/");
};

export default function Index() {
  const data = useLoaderData<Invoice[]>();

  const inboxData = data.filter(
    (invoice) => invoice.status === "inbox"
  ) as InboxInvoice[];

  const approvalData = data.filter(
    (invoice) => invoice.status === "needing_approval"
  ) as NeedingApprovalInvoice[];

  const scheduledData = data.filter(
    (invoice) => invoice.status === "scheduled"
  );

  const dataWithoutPaidBills = data.filter(
    (invoice) => invoice.status !== "paid"
  );

  return (
    <ToastProvider>
      <div className="w-[968px] mx-auto flex flex-col gap-8">
        <div className="w-full flex gap-6 items-center">
          <h1 className="text-[28px] leading-[36px] font-normal">Bill Pay</h1>
          <div className="bg-[#7073930F] hover:cursor-pointer hover:bg-[#1212160f] px-4 py-1 rounded-full text-[15px] text-[#363644] min-w-[50px]">
            Add Bill
          </div>
        </div>
        <DashboardHeader invoices={dataWithoutPaidBills} />
        <Tabs.Root className="TabsRoot" defaultValue="inbox">
          <Tabs.List className="flex gap-6 text-[#363644] text-xs leading-[20px]">
            <Tabs.Trigger
              value="inbox"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none text-[#70707D] [&[data-state='active']]:text-[#363644] hover:text-[#363644]"
            >
              Bill Inbox
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                {inboxData.length}
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="approval"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none text-[#70707D] [&[data-state='active']]:text-[#363644] hover:text-[#363644]"
            >
              Bills Needing Approval
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                {approvalData.length}
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="scheduled"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none text-[#70707D] [&[data-state='active']]:text-[#363644] hover:text-[#363644]"
            >
              Scheduled Bills
              <div className="px-2 py-0.5 bg-[#7073931a] text-xs rounded-[4px]">
                {scheduledData.length}
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger
              value="paid"
              className="flex gap-2 items-center py-[10px] [&[data-state='active']]:border-b-2 [&[data-state='active']]:border-[#5266eb] hover:border-b-2 hover:border-[#70739338] outline-none text-[#70707D] [&[data-state='active']]:text-[#363644] hover:text-[#363644]"
            >
              Paid Bills
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="inbox" className="mt-6">
            <InboxTable inboxData={inboxData} />
          </Tabs.Content>
          <Tabs.Content value="approval" className="mt-6">
            <NeedingApprovalTable needApprovalData={approvalData} />
          </Tabs.Content>{" "}
          <Tabs.Content value="scheduled" className="mt-6">
            scheduled bills
          </Tabs.Content>
          <Tabs.Content value="paid" className="mt-6">
            paid
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
