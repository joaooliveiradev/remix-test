import React, { HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

type TableProps = {
  className?: string;
  children: React.ReactNode;
};

const Table = ({ className, children }: TableProps) => (
  <table className={cn("w-full", className)}>{children}</table>
);

type TableHeadProps = {
  className?: string;
  children: React.ReactNode;
};

const TableHead = ({ children, className }: TableHeadProps) => (
  <thead
    className={cn(
      "border-b-[1px] border-b-[#f4f5f9] text-[10px] text-gray-500 font-light",
      className
    )}
  >
    {children}
  </thead>
);

type TableHeadCellProps = {
  className?: string;
  children: React.ReactNode;
};

const TableHeadCell = ({ children, className }: TableHeadCellProps) => (
  <th className={cn("px-4 py-3", className)}>{children}</th>
);

type TableBodyProps = {
  className?: string;
  children: React.ReactNode;
};

const TableBody = ({ children, className }: TableBodyProps) => (
  <tbody className={cn("text-[15px] text-[#1e1e2a]", className)}>
    {children}
  </tbody>
);

type TableRowProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLTableRowElement>;

const TableRow = ({ children, className, ...rest }: TableRowProps) => (
  <tr className={cn("border-b-[1px] border-b-[#f4f5f9]", className)} {...rest}>
    {children}
  </tr>
);

type TableCellProps = {
  className?: string;
  children: React.ReactNode;
};

const TableCell = ({ children, className }: TableCellProps) => (
  <td className={cn("px-4 py-3 text-left", className)}>{children}</td>
);

export { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell };
