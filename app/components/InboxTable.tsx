import { useEffect, useState } from "react";

import clsx from "clsx";

import type { InboxInvoice, Invoice } from "~/api/invoices";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Table from "~/components/Table";
import * as Toast from "@radix-ui/react-toast";

import { formatCurrency } from "~/lib/utils";
import { act } from "react-dom/test-utils";

type InboxTableProps = {
  inboxData: InboxInvoice[];
};

const InboxTable = ({ inboxData }: InboxTableProps) => {
  const [selectedInvoicesId, setSelectedInvoicesId] = useState<string[]>([]);

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [activeDropdownContent, setActiveDropdownContent] =
    useState<InboxInvoice | null>(null);

  const [openToast, setOpenToast] = useState<boolean>(false);

  useEffect(() => {
    if (selectedInvoicesId.length > 0) {
      setOpenToast(true);
    } else {
      setOpenToast(false);
    }
  }, [selectedInvoicesId]);

  const handleSelectAllCheckboxes = () => {
    if (inboxData.length === selectedInvoicesId.length) {
      setSelectedInvoicesId([]);
    } else {
      setSelectedInvoicesId(inboxData.map((invoice) => invoice.id));
    }
  };

  const handleSelectedIndividualCheckbox = (id: string) => {
    if (selectedInvoicesId.includes(id)) {
      setSelectedInvoicesId(
        selectedInvoicesId.filter((invoiceId) => invoiceId !== id)
      );
    } else {
      setSelectedInvoicesId([...selectedInvoicesId, id]);
    }
  };

  const getSelectedInvoiceSum = (): number => {
    const selectedInvoices = inboxData.filter((invoice) =>
      selectedInvoicesId.includes(invoice.id)
    );

    return selectedInvoices.reduce(
      (total, selectedInvoice) => total + selectedInvoice.amount,
      0
    );
  };

  const handleClickRow = (id: string) => {
    if (openDropdown) {
      setOpenDropdown(false);
    } else {
      const invoice = inboxData.find((invoice) => invoice.id === id);
      setActiveDropdownContent(invoice!);
      setOpenDropdown(true);
    }
  };

  console.log({ openDropdown });

  return inboxData.length > 0 ? (
    <>
      <Table.Table className="w-full">
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableHeadCell className="text-left font-medium">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                checked={selectedInvoicesId.length === inboxData.length}
                onChange={() => handleSelectAllCheckboxes()}
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
            <Table.TableHeadCell
              className={clsx(
                "text-left font-medium",
                openDropdown && "hidden"
              )}
            >
              Invoice No.
            </Table.TableHeadCell>
            <Table.TableHeadCell
              className={clsx(
                "text-left font-medium",
                openDropdown && "hidden"
              )}
            >
              Added On
            </Table.TableHeadCell>
            <Table.TableHeadCell className="text-left font-medium">
              {" "}
            </Table.TableHeadCell>
          </Table.TableRow>
        </Table.TableHead>
        <Table.TableBody>
          {inboxData.map((invoice) => (
            <Table.TableRow
              key={invoice.id}
              className="w-full group hover:cursor-pointer border-b-[1px] border-b-[#f4f5f9] table-row relative z-10"
              onClick={() => handleClickRow(invoice.id)}
            >
              <Table.TableCell>
                <input
                  type="checkbox"
                  className="form-checkbox block relative h-4 w-4 p-4 text-indigo-600  z-30 cursor-pointer"
                  checked={selectedInvoicesId.includes(invoice.id)}
                  onChange={() => handleSelectedIndividualCheckbox(invoice.id)}
                  onClick={(e) => e.stopPropagation()}
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
              {openDropdown && activeDropdownContent!.id === invoice.id && (
                <Table.TableCell className="p-4 whitespace-nowrap">
                  &gt;
                </Table.TableCell>
              )}
              <Table.TableCell
                className={clsx(
                  "p-4 whitespace-nowrap",
                  openDropdown && "hidden"
                )}
              >
                {invoice.invoiceNumber}
              </Table.TableCell>
              <Table.TableCell
                className={clsx(
                  "p-4 whitespace-nowrap",
                  openDropdown && "hidden"
                )}
              >
                {invoice.addedOn}
              </Table.TableCell>
              <Table.TableCell className="p-4 flex items-center justify-end">
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
                  <form action="/?index" method="post">
                    <input type="hidden" name="invoiceId" value={invoice.id} />
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
      {openDropdown && (
        <div className="absolute bottom-[250px] right-[296px] z-20 w-[32rem] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Debug LLC
                </h2>
                <p className="text-sm text-gray-500">
                  Sent by demo@mercury.com
                </p>
              </div>
              <span className="text-xl font-bold text-gray-900">-$220.00</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Due Apr 19</p>
              <div>
                <p className="text-sm font-medium text-gray-700">Invoice #</p>
                <p className="text-sm text-gray-900">INV-902</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Added on</p>
                <p className="text-sm text-gray-900">Sep 15</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">Sales Invoice</p>
              <p className="text-sm text-gray-700">
                Please pay the following invoice by the due date.
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                demo_invoice-after-ocr-2.pdf
              </span>
            </div>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Discard
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
                Review
              </button>
            </div>
          </div>
        </div>
      )}
      {openToast && (
        <Toast.Root
          open={openToast}
          onOpenChange={setOpenToast}
          className={clsx(
            "fixed bottom-[20%] left-[35%] w-[600px] py-[10px] pl-[20px] pr-[10px] shadow-md rounded-[100px]",
            "radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide"
          )}
          duration={Infinity}
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-[#363644] text-[15px] leading-[24px]">
                {selectedInvoicesId.length}
                {selectedInvoicesId.length === 1 ? " invoice " : " invoices "}
                selected
              </span>
              <span className="text-[#70707d] text-[14px] leading-[20px] font-normal">
                {formatCurrency(getSelectedInvoiceSum())} total
              </span>
            </div>
            <div className="flex gap-2">
              <form action="/?index" method="post">
                <input
                  type="hidden"
                  name="invoiceIds"
                  value={selectedInvoicesId}
                />
                <button className="min-w-[80px] py-2 px-8 min-h-[40px] rounded-[26px] text-[#d03275] bg-[#7073930F] hover:bg-[#15161d0f] font-medium text-sm">
                  Discard
                </button>
              </form>
              <button
                className="min-w-[80px] py-2 px-8 min-h-[40px] rounded-[26px] text-white bg-[#5266EB] hover:bg-[#5063d9] font-medium text-sm"
                onClick={() => {
                  window.open("/invoices/demo-invoice-after-ocr.pdf", "_blank");
                }}
              >
                Review {selectedInvoicesId.length}
                {selectedInvoicesId.length === 1 ? " invoice " : " invoices "}
              </button>
            </div>
          </div>
        </Toast.Root>
      )}
    </>
  ) : (
    <div className="flex flex-col gap-4 w-full h-32 items-center justify-center">
      <h1>No bills in your inbox yet</h1>
      <button className="min-w-[80px] py-2 px-8 min-h-[40px] rounded-[26px] text-[#444444] bg-[#7073930F] font-medium text-sm">
        Add Bill
      </button>
    </div>
  );
};

export { InboxTable };
