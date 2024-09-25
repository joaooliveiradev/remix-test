import { useState } from "react";
import { type Invoice } from "~/api/invoices";

type InvoicesTableProps = {
  data: Invoice[];
};

const InvoicesTable = ({ data }: InvoicesTableProps) => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(data.map((invoice) => invoice.id));
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

  const handleDelete = (id: string) => {};

  return (
    <table className="w-full">
      <thead className="border-b-[1px] border-b-[#f4f5f9] text-[10px] text-gray-500 font-light">
        <tr>
          {/* Checkbox Column */}
          <th className="px-4 py-3 text-left">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          {/* Due Date Column */}
          <th className="px-4 py-3 text-left font-medium">
            Due Date
            {/* Sort Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </th>
          {/* Unnamed Column */}
          <th className="px-4 py-3 text-left"></th>
          {/* To Column */}
          <th className="px-4 py-3 text-left font-medium">To</th>
          {/* Amount Column */}
          <th className="px-4 py-3 text-left font-medium">
            Amount
            {/* Sort Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </th>
          <th className="px-4 py-3 text-left font-medium">Invoice No.</th>
          <th className="px-4 py-3 text-left font-medium">
            Added On
            {/* Sort Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline h-4 w-4 ml-1 text-gray-400 cursor-pointer hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </th>
          {/* Actions Column */}
          <th className="p-4 text-left"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((invoice) => (
          <tr key={invoice.id} className="group hover:bg-gray-100">
            {/* Checkbox */}
            <td className="p-4 whitespace-nowrap">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                checked={selectedInvoices.includes(invoice.id)}
                onChange={() => handleRowCheckboxChange(invoice.id)}
              />
            </td>
            {/* Due Date */}
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">
              {invoice.dueDate}
            </td>
            {/* Unnamed Column */}
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">
              {/* You can place an icon or any content here */}
            </td>
            {/* To */}
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">
              {invoice.recipient}
            </td>
            {/* Amount */}
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">
              ${invoice.amount.toFixed(2)}
            </td>
            {/* Invoice No. */}
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">
              {invoice.invoiceNumber}
            </td>
            {/* Added On */}
            <td className="p-4 whitespace-nowrap text-sm text-gray-900">
              {invoice.addedOn}
            </td>
            {/* Actions */}
            <td className="p-4 flex items-center justify-end">
              {/* Actions appear on hover */}
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
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
                <button className="py-1 px-4 bg-[#5266eb] rounded-full text-white text-[15px]">
                  Review
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { InvoicesTable };
