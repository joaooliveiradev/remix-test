import { useEffect, useState } from "react";

import type { NeedingApprovalInvoice } from "~/api/invoices";

import clsx from "clsx";

import * as Table from "~/components/Table";
import * as Toast from "@radix-ui/react-toast";

import { ArrowRight2, CloseCircle } from "iconsax-react";
import { formatCurrency } from "~/lib/utils";
import { Link } from "@remix-run/react";
import { IoCheckmark } from "react-icons/io5";
import { FaExclamation } from "react-icons/fa6";

type NeedingApprovalTableProps = {
  needApprovalData: NeedingApprovalInvoice[];
};

const NeedingApprovalTable = ({
  needApprovalData,
}: NeedingApprovalTableProps) => {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [openSuccessToast, setOpenSuccessToast] = useState<boolean>(false);
  const [openFailedToast, setOpenFailedToast] = useState<boolean>(false);

  const [selectedInvoicesId, setSelectedInvoicesId] = useState<string[]>([]);

  useEffect(() => {
    if (selectedInvoicesId.length > 0) {
      setOpenToast(true);
    } else {
      setOpenToast(false);
    }
  }, [selectedInvoicesId]);
  const handleSelectedIndividualCheckbox = (id: string) => {
    if (selectedInvoicesId.includes(id)) {
      setSelectedInvoicesId(
        selectedInvoicesId.filter((invoiceId) => invoiceId !== id)
      );
    } else {
      setSelectedInvoicesId([...selectedInvoicesId, id]);
    }
  };

  const handleSelectAllCheckboxes = () => {
    if (needApprovalData.length === selectedInvoicesId.length) {
      setSelectedInvoicesId([]);
    } else {
      setSelectedInvoicesId(needApprovalData.map((invoice) => invoice.id));
    }
  };

  const getSelectedInvoiceSum = (): number => {
    const selectedInvoices = needApprovalData.filter((invoice) =>
      selectedInvoicesId.includes(invoice.id)
    );

    return selectedInvoices.reduce(
      (total, selectedInvoice) => total + selectedInvoice.amount,
      0
    );
  };

  return needApprovalData.length > 0 ? (
    <>
      <Table.Table className="w-full">
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableHeadCell className="text-left font-medium">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                checked={selectedInvoicesId.length === needApprovalData.length}
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
            <Table.TableHeadCell className={clsx("text-left font-medium")}>
              Approvals
            </Table.TableHeadCell>
            <Table.TableHeadCell className={clsx("text-left font-medium")}>
              Requested By
            </Table.TableHeadCell>
          </Table.TableRow>
        </Table.TableHead>
        <Table.TableBody>
          {needApprovalData.map((invoice) => (
            <Table.TableRow
              key={invoice.id}
              className="w-full group hover:bg-[#7073930f] hover:cursor-pointer border-b-[1px] border-b-[#f4f5f9] table-row"
              onClick={() => {
                window.open("/invoices/demo-invoice-after-ocr.pdf", "_blank");
              }}
            >
              <Table.TableCell>
                <input
                  type="checkbox"
                  className="form-checkbox block relative h-4 w-4 p-4 text-indigo-600 z-30 cursor-pointer"
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
              <Table.TableCell className="p-4 whitespace-nowrap text-right">
                ${invoice.amount.toFixed(2)}
              </Table.TableCell>
              <Table.TableCell className={clsx("p-4 whitespace-nowrap")}>
                {invoice.approvals}
              </Table.TableCell>
              <Table.TableCell className={clsx("p-4 whitespace-nowrap")}>
                {invoice.uploadedBy}
              </Table.TableCell>
              <Table.TableCell className="p-4 flex items-center justify-end">
                <div className="flex items-center justify-center gap-0.5">
                  <span className="block text-[#5266EB] text-[15px] opacity-0 group-hover:opacity-100">
                    View
                  </span>
                  <ArrowRight2
                    className="size-4 pt-0.5 font-bold"
                    color="#5266EB"
                  />
                </div>
              </Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.Table>
      {openFailedToast && (
        <Toast.Root
          open={openFailedToast}
          onOpenChange={setOpenFailedToast}
          className={clsx(
            "w-auto absolute left-[45%] bottom-[30%] p-4 bg-[#1e1e2a] shadow-md rounded-xl",
            "radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "border-[1px] border-[#5b5f6b3d]"
          )}
          duration={1500}
        >
          <div className="flex gap-2 items-center text-white">
            <FaExclamation size="18" color="#f32a1c" />
            Declined 1 request
          </div>
        </Toast.Root>
      )}
      {openSuccessToast && (
        <Toast.Root
          open={openSuccessToast}
          onOpenChange={setOpenSuccessToast}
          className={clsx(
            "w-auto absolute left-[45%] bottom-[30%] p-4 bg-[#1e1e2a] shadow-md rounded-xl",
            "radix-state-open:animate-toast-slide-in-right",
            "radix-state-closed:animate-toast-hide",
            "border-[1px] border-[#5b5f6b3d]"
          )}
          duration={1500}
        >
          <div className="flex gap-2 items-center text-white">
            <IoCheckmark size="18" color="#05ffb4" />
            Approved 1 request
          </div>
        </Toast.Root>
      )}
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
                {selectedInvoicesId.length === 1 ? " payment " : " payments "}
                selected
              </span>
              <span className="text-[#70707d] text-[14px] leading-[20px] font-normal">
                {formatCurrency(getSelectedInvoiceSum())} total
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setOpenFailedToast(true);
                  setOpenToast(false);
                }}
                className="size-10 flex items-center justify-center p-2.5 rounded-full bg-[#7073930f] hover:bg-[#d032751a]"
              >
                <CloseCircle size="18" color="#d03275" />
              </button>
              <button
                onClick={() => {
                  setOpenSuccessToast(true);
                  setOpenToast(false);
                }}
                className="size-10 flex items-center justify-center p-2.5 rounded-full bg-[#7073930f] hover:bg-[#d032751a]"
              >
                <IoCheckmark size="18" color="#33333" />
              </button>
              <Link
                to="/invoices/demo-invoice-after-ocr.pdf"
                target="_blank"
                onClick={() => setOpenToast(false)}
              >
                <button className="py-2 px-8 flex items-center gap-1 rounded-[26px] text-white bg-[#5266EB] hover:bg-[#5063d9] font-medium text-sm">
                  Review Request
                  <ArrowRight2 className="size-4 text-[40px] font-bold" />
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

export { NeedingApprovalTable };
