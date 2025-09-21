"use client"

import { Button } from "@/components/ui/button"

interface MonthFilterProps {
  selectedMonth: string
  onMonthChange: (month: string) => void
}

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
]

export function MonthFilter({ selectedMonth, onMonthChange }: MonthFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <Button
        variant={selectedMonth === "" ? "default" : "outline"}
        size="sm"
        onClick={() => onMonthChange("")}
        className={
          selectedMonth === ""
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950"
            : "border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
        }
      >
        Todos
      </Button>

      {months.map((month) => (
        <Button
          key={month}
          variant={selectedMonth === month ? "default" : "outline"}
          size="sm"
          onClick={() => onMonthChange(month)}
          className={
            selectedMonth === month
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950"
              : "border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
          }
        >
          {month.charAt(0).toUpperCase() + month.slice(1)}
        </Button>
      ))}
    </div>
  )
}
