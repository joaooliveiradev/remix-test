import { useEffect, useState } from "react";

import clsx from "clsx";

import type { InboxInvoice } from "~/api/invoices";

import * as Table from "~/components/Table";
import * as Toast from "@radix-ui/react-toast";

import { formatCurrency } from "~/lib/utils";
import {
  ArrowRight,
  ArrowRight2,
  DocumentText,
  Link21,
  Trash,
} from "iconsax-react";
import React from "react";
import { Link } from "@remix-run/react";

type InboxTableProps = {
  inboxData: InboxInvoice[];
};

const InboxTable = ({ inboxData }: InboxTableProps) => {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [selectedInvoicesId, setSelectedInvoicesId] = useState<string[]>([]);

  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    open: boolean;
  }>({
    id: "",
    open: false,
  });
  const [activeDropdownContent, setActiveDropdownContent] =
    useState<InboxInvoice | null>(null);

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
    if (openDropdown.open && openDropdown.id === id) {
      return setOpenDropdown({ id, open: false });
    } else {
      const invoice = inboxData.find((invoice) => invoice.id === id);
      setActiveDropdownContent(invoice!);
      return setOpenDropdown({ id, open: true });
    }
  };

  return inboxData.length > 0 ? (
    <>
      <div className="flex gap-6">
        <Table.Table
          className={clsx(
            "w-full",
            openDropdown.open && "w-[calc(100%-364px)]"
          )}
        >
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
              <Table.TableHeadCell className="font-medium text-right">
                Amount
              </Table.TableHeadCell>
              {openDropdown.open === false && (
                <>
                  <Table.TableHeadCell
                    className={clsx("text-left font-medium")}
                  >
                    Invoice No.
                  </Table.TableHeadCell>
                  <Table.TableHeadCell
                    className={clsx("text-left font-medium")}
                  >
                    Added on
                  </Table.TableHeadCell>
                </>
              )}
            </Table.TableRow>
          </Table.TableHead>
          <Table.TableBody>
            {inboxData.map((invoice) => (
              <Table.TableRow
                key={invoice.id}
                className="w-full group hover:bg-[#7073930f] hover:cursor-pointer border-b-[1px] border-b-[#f4f5f9] table-row"
                onClick={() => handleClickRow(invoice.id)}
              >
                <Table.TableCell>
                  <input
                    type="checkbox"
                    className="form-checkbox block relative h-4 w-4 p-4 text-indigo-600 z-30 cursor-pointer"
                    checked={selectedInvoicesId.includes(invoice.id)}
                    onChange={() =>
                      handleSelectedIndividualCheckbox(invoice.id)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </Table.TableCell>
                <Table.TableCell className="p-4 whitespace-nowrap">
                  {invoice.dueDate}
                </Table.TableCell>
                <Table.TableCell className="p-4 whitespace-nowrap">
                  {invoice.recipient}
                </Table.TableCell>
                <Table.TableCell className="p-4 whitespace-nowrap text-right">
                  ${invoice.amount.toFixed(2)}
                </Table.TableCell>
                {openDropdown.open === false ? (
                  <React.Fragment>
                    <Table.TableCell className={clsx("p-4 whitespace-nowrap")}>
                      {invoice.invoiceNumber}
                    </Table.TableCell>
                    <Table.TableCell className={clsx("p-4 whitespace-nowrap")}>
                      {invoice.addedOn}
                    </Table.TableCell>
                    <Table.TableCell
                      className={clsx(
                        "p-4 flex items-center justify-end",
                        openDropdown.open && "hidden"
                      )}
                    >
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100">
                        <form action="/?index" method="post">
                          <input
                            type="hidden"
                            name="invoiceId"
                            value={invoice.id}
                          />
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-120 flex items-center justify-center p-2.5 rounded-full bg-[#7073930f] hover:bg-[#d032751a]"
                          >
                            <Trash className="size-3 text-[#d03275] text-center" />
                          </button>
                        </form>
                        <button
                          className="py-1 px-4 flex items-center gap-1 rounded-[26px] text-white bg-[#5266EB] hover:bg-[#5063d9] text-[15px]"
                          onClick={(e) => {
                            window.open("/approve-payment", "_blank");
                            e.stopPropagation();
                          }}
                        >
                          Review
                          <ArrowRight2 className="w-4 h-4 text-[40px] font-bold" />
                        </button>
                      </div>
                    </Table.TableCell>
                  </React.Fragment>
                ) : (
                  activeDropdownContent?.id === invoice.id && (
                    <td className="absolute top-[83px] size-4 flex justify-center items-center animate-toast-slide-in-right">
                      <ArrowRight2 size={16} color="#1e1e2a" variant="Bold" />
                    </td>
                  )
                )}
              </Table.TableRow>
            ))}
          </Table.TableBody>
        </Table.Table>
        {openDropdown.open && activeDropdownContent !== null && (
          <div
            key={activeDropdownContent.id}
            className="z-20 mx-auto bg-white rounded-xl shadow-md overflow-hidden border-[1px] border-[#5b5f6b3d] animate-toast-slide-in-right"
          >
            <div className="flex justify-between items-center px-10 pt-8 pb-6 border-b-[1px] border-[#7073931A]">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeDropdownContent.recipient}
                </h2>
                <p className="text-[11px] text-gray-500">
                  {activeDropdownContent.sentBy
                    ? `Sent by ${activeDropdownContent.sentBy}`
                    : `Uploaded by ${activeDropdownContent.uploadedBy}`}
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
              <Link to="/invoices/demo-invoice-after-ocr.pdf" target="_blank">
                <div className="flex gap-2 py-3 px-4 border-[1px] border-[#f4f5f9] rounded-lg items-center cursor-pointer">
                  <div className="w-[80px] h-[40px] bg-[#7073931a] px-1 flex items-center justify-center rounded-md">
                    <DocumentText className="size-4 text-[#535461]" />
                  </div>
                  <span className="truncate max-h-10 w-[220px] text-[#1e1e2a] text-xs">
                    demo_invoice-after-ocr-2.pdf
                  </span>
                </div>
              </Link>
            </div>
            <div className="w-full justify-center flex gap-2 py-8 px-10 border-b-[1px] border-[#7073931A]">
              <form action="/?index" method="post">
                <input
                  type="hidden"
                  name="invoiceId"
                  value={activeDropdownContent.id}
                />
                <button className="min-w-[80px] py-2 px-8 min-h-[40px] rounded-[26px] text-[#d03275] bg-[#7073930F] hover:bg-[#15161d0f] font-medium text-sm">
                  Discard
                </button>
              </form>
              <Link to="/approve-payment" target="_blank">
                <button className="py-2 px-8 flex items-center gap-1 rounded-[26px] text-white bg-[#5266EB] hover:bg-[#5063d9] font-medium text-sm">
                  Review
                  <ArrowRight2 className="w-4 h-4 text-[40px] font-bold" />
                </button>
              </Link>
            </div>
            <div className="px-6 py-4">
              <Link21 className="size-4 text-[#535461]" />
            </div>
          </div>
        )}
      </div>
      {openToast && (
        <Toast.Root
          open={openToast}
          onOpenChange={setOpenToast}
          className={clsx(
            "fixed z-[9999px] bottom-[20%] bg-white left-[35%] w-[600px] py-[10px] pl-[20px] pr-[10px] shadow-md rounded-[100px]",
            "radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "z-30 border-[1px] border-[#5b5f6b3d]"
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
              <Link to="/approve-payment" target="_blank">
                <button className="py-2 px-8 flex items-center gap-1 rounded-[26px] text-white bg-[#5266EB] hover:bg-[#5063d9] font-medium text-sm">
                  Review {selectedInvoicesId.length}
                  {selectedInvoicesId.length === 1 ? " invoice " : " invoices "}
                  <ArrowRight className="size-4 text-[40px] font-bold" />
                </button>
              </Link>
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
