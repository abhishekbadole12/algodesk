import { AlertCircle, ListTodo } from "lucide-react";

export default function PendingOrdersTable({ orders }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-primary" />
          Pending Orders
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50">
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Symbol
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Side
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Order Type
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Order Price
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Qty
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Status
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Created Time
              </th>
              <th className="text-left py-3 px-3 text-muted-foreground font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border hover:bg-background transition-colors"
              >
                <td className="py-3 px-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {order.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.exchange}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.side === "BUY"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {order.side}
                  </span>
                </td>
                <td className="py-3 px-3 text-foreground text-sm">
                  {order.orderType}
                </td>
                <td className="py-3 px-3 text-foreground font-semibold">
                  ₹{order.orderPrice.toFixed(2)}
                </td>
                <td className="py-3 px-3 text-foreground">{order.quantity}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                      Pending
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-muted-foreground text-sm">
                  {order.createdTime}
                </td>
                <td className="py-3 px-3">
                  <button className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}