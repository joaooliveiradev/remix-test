import { useState } from "react";

import clsx from "clsx";

import type { ScheduledInvoice } from "~/api/invoices";

import * as Table from "~/components/Table";
import * as Select from "@radix-ui/react-select";

import React from "react";
import {
  ArrowDown2,
  ArrowRight2,
  ArrowUp2,
  Check,
  DocumentText,
  DocumentUpload,
  Edit2,
  Link,
  Link21,
  Trash,
} from "iconsax-react";
import { formatCurrency } from "~/lib/utils";

type ScheduleTableProps = {
  scheduleData: ScheduledInvoice[];
};

const ScheduleTable = ({ scheduleData }: ScheduleTableProps) => {
  const [selectedInvoicesId, setSelectedInvoicesId] = useState<string[]>([]);

  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    open: boolean;
  }>({
    id: "",
    open: false,
  });

  const [activeDropdownContent, setActiveDropdownContent] =
    useState<ScheduledInvoice | null>(null);

  const handleClickRow = (id: string) => {
    if (openDropdown.open && openDropdown.id === id) {
      return setOpenDropdown({ id, open: false });
    } else {
      const invoice = scheduleData.find((invoice) => invoice.id === id);
      setActiveDropdownContent(invoice!);
      return setOpenDropdown({ id, open: true });
    }
  };

  return (
    <div className={clsx("w-full flex gap-6")}>
      <Table.Table
        className={clsx("w-full", openDropdown.open && "w-[calc(100%-392px)]")}
      >
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableHeadCell className="text-left font-medium">
              Next payment
            </Table.TableHeadCell>
            <Table.TableHeadCell className="text-left font-medium">
              To
            </Table.TableHeadCell>
            <Table.TableHeadCell className="font-medium text-right">
              Amount
            </Table.TableHeadCell>
            {openDropdown.open === false && (
              <>
                <Table.TableHeadCell className={clsx("text-left font-medium")}>
                  Due Data
                </Table.TableHeadCell>
                <Table.TableHeadCell className={clsx("text-left font-medium")}>
                  Progress
                </Table.TableHeadCell>
              </>
            )}
          </Table.TableRow>
        </Table.TableHead>
        <Table.TableBody>
          {scheduleData.map((invoice) => (
            <Table.TableRow
              key={invoice.id}
              className="w-full group hover:bg-[#7073930f] hover:cursor-pointer border-b-[1px] border-b-[#f4f5f9] table-row"
              onClick={() => handleClickRow(invoice.id)}
            >
              <Table.TableCell className="p-4 whitespace-nowrap">
                {invoice.nextPayment}
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
                    {invoice.dueDate}
                  </Table.TableCell>
                  <Table.TableCell className={clsx("p-4 whitespace-nowrap")}>
                    {invoice.paymentProgress}
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
          className="flex flex-col w-[392px] z-20 mx-auto bg-white rounded-xl shadow-md overflow-hidden border-[1px] border-[#5b5f6b3d] animate-toast-slide-in-right"
        >
          <div className="w-full flex justify-between items-center px-10 pt-8 pb-6 border-b-[1px] border-[#7073931A]">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {activeDropdownContent.recipient}
              </h2>
              <p className="text-[11px] text-gray-500">
                Created by {activeDropdownContent.createdBy}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div>
                -
                <span className="text-[15px] text-[#1E1E2A] font-normal text-right">
                  {formatCurrency(activeDropdownContent.amount)}
                </span>
              </div>
              <span className="text-[#70707d] text-[11px]">
                Next payment {activeDropdownContent.nextPayment}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between items-center px-10 pt-8 pb-6 border-b-[1px] border-[#7073931A]">
            <div className="flex w-full justify-between">
              <span className="text-[13px] text-[#70707d]">Account</span>
              <span className="text-[14px] text-[#1e1e2a]">
                {activeDropdownContent.account.name}
              </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="text-[13px] text-[#70707d]">Method</span>
              <span className="text-[14px] text-[#1e1e2a]">
                {activeDropdownContent.paymentMethod}
              </span>
            </div>{" "}
            <div className="flex w-full justify-between">
              <span className="text-[13px] text-[#70707d]">Progress</span>
              <span className="text-[14px] text-[#1e1e2a]">
                {activeDropdownContent.paymentProgress}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 px-10 pt-8 pb-6 border-b-[1px] border-[#7073931A]">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] text-[#535461]">Payment rule</p>
              <p className="text-[15px] text-[#363644]">
                {activeDropdownContent.paymentRule}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] text-[#535461]">Recipient memo</p>
              <p className="text-[15px] text-[#363644]">
                {activeDropdownContent.recipientMemo}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 px-10 pt-8 pb-6 border-b-[1px] border-[#7073931A]">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] text-[#535461]">GL Code</p>
              <Select.Root>
                <Select.Trigger className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <Select.Value placeholder="Select an option" />
                  <Select.Icon>
                    <ArrowDown2 className="w-4 h-4 text-gray-400" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-300"
                    position="popper"
                    sideOffset={5}
                    style={{ zIndex: 9999 }}
                    side="top"
                  >
                    <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
                      <ArrowUp2 size="16" />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-2">
                      <Select.Group>
                        {activeDropdownContent.GLCode.map((glcode) => (
                          <Select.Item
                            value={glcode.split(" ").join("").trim()}
                            className="flex items-center px-2 py-1 text-sm rounded-md cursor-default select-none outline-none focus:bg-gray-100"
                          >
                            <Select.ItemText>{glcode}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
                      <ArrowDown2 size="16" />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[11px] text-[#535461]">Internal notes</p>
              <textarea className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none">
                {activeDropdownContent.recipientMemo}
              </textarea>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[11px] text-[#535461]">Attachments</p>
              <input
                type="file"
                name="upload"
                id="upload"
                className="invisible w-0 h-0 button"
              />
              <div className="w-full py-4 border-2 border-dashed hover:border-blue-500 border-gray-300 rounded-md bg-white">
                <label
                  htmlFor="upload"
                  className="w-full flex gap-4 px-4 items-center text-center cursor-pointer"
                >
                  <DocumentUpload size={14} />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[10px] text-gray-600 mb-1">
                      Drag and drop here or click to upload
                    </p>
                    <p className="text-[10px] text-gray-500">
                      You may upload PDF, PNG, or JPEG files
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 flex justify-between">
            <Link21 className="size-4 text-[#535461]" />
            <div className="flex gap-4">
              <Edit2 className="size-4 text-[#535461]" />
              <Trash className="size-4 text-[#535461]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ScheduleTable };
