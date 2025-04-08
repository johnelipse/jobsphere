import { Badge } from "@/components/ui/badge";
import { getNormalDate } from "@/lib/getNormalDate";
import React from "react";

export default function StatusColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const status = row.getValue(`${accessorKey}`);

  return <Badge variant="outline">{status ? "Active" : "Disabled"}</Badge>;
}
