import type { PaidInvoice } from "~/api/invoices";

import * as Table from "~/components/Table";

type BillsTableProps = {
  billsData: PaidInvoice[];
};

const BillsTable = ({ billsData }: BillsTableProps) => {
  return (
    <>
      <Table.Table className="w-full">
        <Table.TableHead>
          <Table.TableRow>
            <Table.TableHeadCell className="text-left font-medium">
              Date
            </Table.TableHeadCell>
            <Table.TableHeadCell className="text-left font-medium">
              To
            </Table.TableHeadCell>
            <Table.TableHeadCell className="text-left font-medium">
              Payment Method
            </Table.TableHeadCell>
            <Table.TableHeadCell className="text-left font-medium">
              Account
            </Table.TableHeadCell>
            <Table.TableHeadCell className="text-right font-medium">
              Ammount
            </Table.TableHeadCell>
          </Table.TableRow>
        </Table.TableHead>
        <Table.TableBody>
          {billsData.map((invoice) => (
            <Table.TableRow
              key={invoice.id}
              className="w-full group hover:bg-[#7073930f] hover:cursor-pointer border-b-[1px] border-b-[#f4f5f9] table-row"
              onClick={() => {
                window.open("/invoices/demo-invoice-after-ocr.pdf", "_blank");
              }}
            >
              <Table.TableCell className="p-4 whitespace-nowrap">
                {invoice.paidDate}
              </Table.TableCell>
              <Table.TableCell className="p-4 whitespace-nowrap">
                {invoice.recipient}
              </Table.TableCell>
              <Table.TableCell className="p-4 whitespace-nowrap">
                {invoice.paymentMethod}
              </Table.TableCell>
              <Table.TableCell className="p-4 whitespace-nowrap">
                {invoice.account}
              </Table.TableCell>
              <Table.TableCell className="p-4 whitespace-nowrap text-right">
                -${invoice.amount.toFixed(2)}
              </Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.Table>
    </>
  );
};

export { BillsTable };
