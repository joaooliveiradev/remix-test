import { useEffect, useState } from "react";

import clsx from "clsx";

import type { InboxInvoice, Invoice } from "~/api/invoices";

import * as Table from "~/components/Table";
import * as Toast from "@radix-ui/react-toast";

import { formatCurrency } from "~/lib/utils";
import { ArrowRight2, DocumentText, Link21 } from "iconsax-react";

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
      {openDropdown && activeDropdownContent !== null && (
        <div className="absolute bottom-[250px] right-[296px] z-20 w-[400px] mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex justify-between items-center px-10 pt-8 pb-6 border-b-[1px] border-[#7073931A]">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {activeDropdownContent.recipient}
              </h2>
              <p className="text-sm text-gray-500">
                Sent by {activeDropdownContent.sentBy}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div>
                -
                <span className="text-[15px] text-[#1E1E2A] font-normal">
                  {formatCurrency(activeDropdownContent.amount)}
                </span>
              </div>
              <span className="text-[#70707d] text-[11px]">
                Due {activeDropdownContent.dueDate}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-10 pt-8 pb-0">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] text-[#535461]">Invoice #</p>
              <p className="text-base text-[#363644]">
                {activeDropdownContent.invoiceNumber}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] text-[#535461]">Added on</p>
              <p className="text-base text-[#363644]">
                {activeDropdownContent.addedOn}
              </p>
            </div>
            {activeDropdownContent.email && (
              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-[#535461]">Email</p>
                <p className="text-[14px] text-[#1e1e2a] font-[480]">
                  {activeDropdownContent.email.title}
                </p>
                <p className="text-[15px] text-[#1e1e2a] max-h-[120px] truncate">
                  Please pay the following invoice by the due
                </p>
              </div>
            )}
            <div className="flex gap-2 py-3 px-4 border-[1px] border-[#f4f5f9] rounded-lg items-center cursor-pointer">
              <div className="w-[80px] h-[40px] bg-[#7073931a] px-1 flex items-center justify-center rounded-md">
                <DocumentText className="size-4 text-[#535461]" />
              </div>
              <span className="truncate max-h-10 w-[220px] text-[#1e1e2a] text-xs">
                demo_invoice-after-ocr-2.pdf
              </span>
            </div>
          </div>
          <div className="w-full justify-center flex gap-2 py-8 px-10 border-b-[1px] border-[#7073931A]">
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
              className="py-2 px-8 flex items-center gap-1 rounded-[26px] text-white bg-[#5266EB] hover:bg-[#5063d9] font-medium text-sm"
              onClick={() => {
                window.open("/invoices/demo-invoice-after-ocr.pdf", "_blank");
              }}
            >
              Review
              <ArrowRight2 className="w-4 h-4 text-[40px] font-bold" />
            </button>
          </div>
          <div className="px-6 py-4">
            <Link21 className="size-4 text-[#535461]" />
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
