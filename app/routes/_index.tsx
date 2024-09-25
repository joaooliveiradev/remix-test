import { redirect, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@vercel/remix";

import * as Tabs from "@radix-ui/react-tabs";
import * as Table from "~/components/Table";
import { DashboardHeader } from "~/components/DashboardHeader";

import { type Invoice, mockInvoices } from "~/api/invoices";
import { InvoicesTable } from "~/components/InvoicesTable";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => mockInvoices;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const invoiceId = formData.get("invoiceId");

  if (typeof invoiceId !== "string") {
    throw new Error("Wrong id, oops..");
  }
  const index = mockInvoices.findIndex((invoice) => invoice.id === invoiceId);
  if (index !== -1) {
    mockInvoices.splice(index, 1);
  }

  return redirect("/");
};

export default function Index() {
  const data = useLoaderData<Invoice[]>();

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const inboxData = data.filter((invoice) => invoice.status === "inbox");
  const approvalData = data.filter(
    (invoice) => invoice.status === "needing_approval"
  );
  const scheduledData = data.filter(
    (invoice) => invoice.status === "scheduled"
  );

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(inboxData.map((invoice) => invoice.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowCheckboxChange = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(
        selectedInvoices.filter((invoiceId) => invoiceId !== id)
      );
    } else {
      setSelectedInvoices([...selectedInvoices, id]);
    }
  };

  const invoicesWithoutPaidBills = data.filter(
    (invoice) => invoice.status !== "paid"
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
        <DashboardHeader invoices={invoicesWithoutPaidBills} />
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
            <Table.Table className="w-full">
              <Table.TableHead>
                <Table.TableRow>
                  <Table.TableHeadCell className="text-left font-medium">
                    {/* //toast here */}
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </Table.TableHeadCell>
                  <Table.TableHeadCell className="text-left font-medium">
                    Due Date
                  </Table.TableHeadCell>
                  <Table.TableHeadCell className="text-left font-medium">
                    To
                  </Table.TableHeadCell>
                  <Table.TableHeadCell className="text-left font-medium">
                    Amount
                  </Table.TableHeadCell>
                  <Table.TableHeadCell className="text-left font-medium">
                    Invoice No.
                  </Table.TableHeadCell>
                  <Table.TableHeadCell className="text-left font-medium">
                    Added On
                  </Table.TableHeadCell>
                  <Table.TableHeadCell className="text-left font-medium">
                    {" "}
                  </Table.TableHeadCell>
                </Table.TableRow>
              </Table.TableHead>
              <Table.TableBody>
                {inboxData.map((invoice) => (
                  // dropdown here
                  <Table.TableRow
                    key={invoice.id}
                    className="group hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <Table.TableCell className="p-4">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                        checked={selectedInvoices.includes(invoice.id)}
                        onChange={() => handleRowCheckboxChange(invoice.id)}
                      />
                    </Table.TableCell>
                    <Table.TableCell className="p-4 whitespace-nowrap">
                      {invoice.dueDate}
                    </Table.TableCell>
                    <Table.TableCell className="p-4 whitespace-nowrap">
                      {invoice.recipient}
                    </Table.TableCell>
                    <Table.TableCell className="p-4 whitespace-nowrap">
                      ${invoice.amount.toFixed(2)}
                    </Table.TableCell>
                    <Table.TableCell className="p-4 whitespace-nowrap">
                      {invoice.invoiceNumber}
                    </Table.TableCell>
                    <Table.TableCell className="p-4 whitespace-nowrap">
                      {invoice.addedOn}
                    </Table.TableCell>
                    <Table.TableCell className="p-4 flex items-center justify-end">
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
                        <form action="/?index" method="post">
                          <input
                            type="hidden"
                            name="invoiceId"
                            value={invoice.id}
                          />
                          <button className="text-red-600 hover:text-red-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 3a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v9a2 2 0 002 2h8a2 2 0 002-2V6h.5a.5.5 0 000-1H15V4a1 1 0 00-1-1H6zm3 4a.5.5 0 011 0v7a.5.5 0 01-1 0V7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </form>
                        <button className="py-1 px-4 bg-[#5266eb] rounded-full text-white text-[15px]">
                          Review
                        </button>
                      </div>
                    </Table.TableCell>
                  </Table.TableRow>
                ))}
              </Table.TableBody>
            </Table.Table>
          </Tabs.Content>
          <Tabs.Content value="approval" className="mt-6">
            <InvoicesTable data={inboxData} />
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
