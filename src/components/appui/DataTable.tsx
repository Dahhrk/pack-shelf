// Specimen: Data Table (virtualized, sortable, resizable, selectable)
// Libraries: TanStack Table (MIT), TanStack Virtual (MIT), Motion (MIT)
// Source: Original — built for pack-shelf app-UI specimens
// License: MIT (this file)

import { useState, useMemo, useRef, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnResizeMode,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ArrowUpDown, ArrowUp, ArrowDown, Check } from "lucide-react";

interface RowData {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "away" | "offline";
  lastActive: string;
}

const departments = ["Engineering", "Design", "Marketing", "Sales", "Support", "Finance", "Legal", "Operations"];
const roles = ["Developer", "Designer", "Manager", "Analyst", "Lead", "Director", "Coordinator", "Specialist"];
const statuses: RowData["status"][] = ["active", "away", "offline"];
const firstNames = ["Avery", "Blake", "Casey", "Dana", "Ellis", "Finley", "Gray", "Harper", "Indigo", "Jordan", "Kai", "Lane", "Morgan", "Noel", "Oakley", "Parker", "Quinn", "Reese", "Sage", "Taylor"];
const lastNames = ["Alden", "Brooks", "Chen", "Dubois", "Evans", "Farrow", "Grant", "Hayes", "Ishida", "Jennings", "Kim", "Larsen", "Moreno", "Nakamura", "Ortiz", "Patel", "Reeves", "Santos", "Torres", "Walsh"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateRows(count: number): RowData[] {
  const rand = seededRandom(42);
  return Array.from({ length: count }, (_, i) => {
    const first = firstNames[Math.floor(rand() * firstNames.length)];
    const last = lastNames[Math.floor(rand() * lastNames.length)];
    const domain = ["acme.co", "initech.io", "globex.dev", "hooli.net"][Math.floor(rand() * 4)];
    const daysAgo = Math.floor(rand() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
      role: roles[Math.floor(rand() * roles.length)],
      department: departments[Math.floor(rand() * departments.length)],
      status: statuses[Math.floor(rand() * statuses.length)],
      lastActive: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
  });
}

const statusColor: Record<RowData["status"], string> = {
  active: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-zinc-600",
};

const columnHelper = createColumnHelper<RowData>();

export function DataTable() {
  const reduced = useReducedMotion();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");
  const [optimisticRow, setOptimisticRow] = useState<number | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => generateRows(600), []);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        size: 40,
        enableResizing: false,
        header: ({ table }) => (
          <label className="flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label="Select all rows"
            />
            <div className="w-4 h-4 rounded border border-zinc-600 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-zinc-900">
              {table.getIsAllRowsSelected() && <Check className="w-3 h-3 text-white" />}
            </div>
          </label>
        ),
        cell: ({ row }) => (
          <label className="flex items-center justify-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              aria-label={`Select row ${row.original.name}`}
            />
            <div className="w-4 h-4 rounded border border-zinc-600 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-zinc-900">
              {row.getIsSelected() && <Check className="w-3 h-3 text-white" />}
            </div>
          </label>
        ),
      }),
      columnHelper.accessor("id", { header: "#", size: 60 }),
      columnHelper.accessor("name", { header: "Name", size: 180 }),
      columnHelper.accessor("email", { header: "Email", size: 240 }),
      columnHelper.accessor("role", { header: "Role", size: 140 }),
      columnHelper.accessor("department", { header: "Department", size: 140 }),
      columnHelper.accessor("status", {
        header: "Status",
        size: 100,
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className="flex items-center gap-2 capitalize">
              <span className={`w-2 h-2 rounded-full ${statusColor[val]}`} />
              {val}
            </span>
          );
        },
      }),
      columnHelper.accessor("lastActive", { header: "Last Active", size: 130 }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode,
    enableRowSelection: true,
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 44,
    overscan: 20,
  });

  const handleOptimisticToggle = useCallback((rowId: number) => {
    setOptimisticRow(rowId);
    setTimeout(() => setOptimisticRow(null), 1200);
  }, []);

  const selectedCount = Object.keys(rowSelection).filter((k) => rowSelection[k]).length;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="text-sm text-zinc-400">
          {selectedCount > 0 ? (
            <span className="text-emerald-400">{selectedCount} selected</span>
          ) : (
            <span>{rows.length} team members</span>
          )}
        </div>
        <div className="text-xs text-zinc-500 font-mono">
          Virtualized — {data.length} rows
        </div>
      </div>

      {/* Table */}
      <div
        ref={tableContainerRef}
        className="overflow-auto max-h-[420px] relative"
        role="grid"
        aria-label="Team members table"
      >
        <table className="w-full border-collapse" style={{ width: table.getCenterTotalSize() }}>
          <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-xs font-mono text-zinc-500 uppercase tracking-wider px-3 py-3 border-b border-zinc-800 relative select-none"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className={`focus-ring flex items-center gap-1 ${
                          header.column.getCanSort() ? "cursor-pointer hover:text-zinc-300" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                        tabIndex={header.column.getCanSort() ? 0 : -1}
                        aria-label={`Sort by ${flexRender(header.column.columnDef.header, header.getContext())}`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="w-3 h-3" />
                            ) : (
                              <ArrowUpDown className="w-3 h-3 opacity-40" />
                            )}
                          </span>
                        )}
                      </button>
                    )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-emerald-500/50"
                      />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative", display: "block" }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              const isOptimistic = optimisticRow === row.original.id;
              return (
                <motion.tr
                  key={row.id}
                  data-index={virtualRow.index}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer ${
                    row.getIsSelected() ? "bg-emerald-950/20" : ""
                  } ${isOptimistic ? "bg-emerald-950/40" : ""}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    display: "table-row",
                  }}
                  layout={!reduced}
                  onClick={() => handleOptimisticToggle(row.original.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-2.5 text-sm text-zinc-300 whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Optimistic toast */}
      <AnimatePresence>
        {optimisticRow !== null && (
          <motion.div
            className="absolute bottom-4 right-4 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            Row updated (optimistic)
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
