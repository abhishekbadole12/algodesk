import React from "react";
import TableHeader from "./table-header";
import { Clock } from "lucide-react";
import TableColumnHeader from "./table-column-header";
import { RECENT_ORDERS_COLUMNS } from "@/constant/table";

interface TableProps {
  title: string;
  Icon: any;
  columns: string[];
  children: React.ReactNode;
  isLoading: boolean;
}

export default function Table({
  title,
  Icon,
  columns,
  children,
  isLoading,
}: TableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <TableHeader title={title} Icon={Icon} />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <TableColumnHeader columns={columns} />

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-muted-foreground"
                >
                  Loading…
                </td>
              </tr>
            )}

            {!isLoading && React.Children.count(children) === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-muted-foreground"
                >
                  No trades to show
                </td>
              </tr>
            )}

            {!isLoading && children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
