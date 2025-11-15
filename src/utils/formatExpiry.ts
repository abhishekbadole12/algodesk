export function formatExpiry(dateStr: string): string {
  if (!dateStr) return "";

  // If it's already like 25Nov2025 → keep as is
  if (/^\d{2}[A-Za-z]{3}\d{4}$/.test(dateStr)) return dateStr;

  // If it's ISO (2025-11-25) → convert
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const monthName = months[parseInt(month, 10) - 1];
    return `${day}${monthName}${year}`;
  }

  // Try trimming extra time or symbols like "25Nov2025T00:00:00"
  const cleaned = dateStr.trim().split("T")[0].replace(/[^a-zA-Z0-9]/g, "");
  return cleaned;
}