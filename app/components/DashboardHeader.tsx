import type { Invoice } from "~/api/invoices";
import { Card, CardContent } from "~/components/Card";

type DashboardHeaderProps = {
  data: Invoice[];
};

const getOutstandingAmount = (data: Invoice[]) =>
  data.reduce((acc, invoice) => acc + invoice.amount, 0);

const getOverdueData = (data: Invoice[]) => {
  const overdueData = data.filter(
    (invoice) => new Date(invoice.dueDate) < new Date()
  );

  return {
    count: overdueData.length,
    totalAmount: getOutstandingAmount(overdueData),
  };
};

const getDueNext7DaysData = (data: Invoice[]) => {
  const dueNext7DaysData = data.filter((invoice) => {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    return (
      new Date(invoice.dueDate) >= now &&
      new Date(invoice.dueDate) <= sevenDaysFromNow
    );
  });

  return {
    count: dueNext7DaysData.length,
    totalAmount: getOutstandingAmount(dueNext7DaysData),
  };
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

const DashboardHeader = ({ data }: DashboardHeaderProps) => {
  const totalOutstanding = getOutstandingAmount(data);
  const overdueData = getOverdueData(data);
  const dueNext7DaysData = getDueNext7DaysData(data);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent>
          <div className="text-4xl font-bold">{data.length}</div>
          <div className="text-[17px] leading-[28px] font-normal">
            Total Outstanding
          </div>
          <div className="text-[15px] leading-[24px] text-[#535461]">
            {formatCurrency(totalOutstanding)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { DashboardHeader };
