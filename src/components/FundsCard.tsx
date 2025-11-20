//
import { useFunds } from "@/hooks/useFunds";
//

function FundsCard() {
  const { data, isLoading, error } = useFunds();

  if (error) return <div className="text-red-500">Error</div>;

  const fund = data[0] || 0;

  return (
    <div className="bg-primary/10 px-4 py-2 rounded-lg">
      <p className="text-xs text-muted-foreground">Total Balance</p>
      <p className="text-lg font-bold text-primary">
        {isLoading ? "Loading.." : ` ₹${fund.AVAILABLE_BALANCE}`}
      </p>
    </div>
  );
}

export default FundsCard;
