"use client"

import * as React from "react"
import { ChevronDownIcon, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Calendar24Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
}

export function Calendar24({ date, setDate, time, setTime }: Calendar24Props) {
  const [open, setOpen] = React.useState(false)

  const timeSlots = React.useMemo(() => {
    const slots = [];
    const startHour = 15;
    const endHour = 23;

    for (let i = startHour; i <= endHour; i++) {
      const hour = i === 24 ? "00" : i.toString().padStart(2, "0");
      
      slots.push(`${hour}:00`);
      
      if (i !== endHour) {
        slots.push(`${hour}:30`);
      }
    }
    return slots;
  }, []);

  return (
    <div className="flex gap-4 items-end">
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="date-picker" className="px-1 text-xs font-semibold text-muted-foreground">
          Tanggal
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-full justify-start text-left font-normal"
            >
              <div className="flex items-center gap-2">
                {date ? (
                  date.toLocaleDateString("id-ID", { 
                    day: 'numeric', month: 'short', year: 'numeric' 
                  })
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </div>
              <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
                setOpen(false)
              }}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))} 
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3 w-[140px]">
        <Label htmlFor="time-picker" className="px-1 text-xs font-semibold text-muted-foreground">
          Jam
        </Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Jam" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]"> 
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}