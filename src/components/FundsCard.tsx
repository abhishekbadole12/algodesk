//
import { IndianRupee } from "lucide-react";
//
import { useFunds } from "@/hooks/useFunds";
//

function FundsCard() {
  const { data, isLoading, error } = useFunds();

  if (error) return <div className="text-red-500">Error</div>;

  const fund = data?.[0];

  return (
    <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg">
      <IndianRupee className="w-5 h-5 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">Total Balance</p>
        <p className="text-lg font-bold text-primary">
          {isLoading ? "Loading.." : ` ₹${fund.AVAILABLE_BALANCE}`}
        </p>
      </div>
    </div>
  );
}

export default FundsCard;
