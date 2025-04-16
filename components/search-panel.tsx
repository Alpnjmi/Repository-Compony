"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Search, X, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Document types for filtering
const documentTypes = [
  { id: "station-report", label: "Station Report" },
  { id: "pump-maintenance", label: "Pump Maintenance Log" },
  { id: "safety-inspection", label: "Safety Inspection Report" },
  { id: "fuel-stock", label: "Fuel Stock Record" },
  { id: "monthly-sales", label: "Monthly Sales Report" },
  { id: "training-materials", label: "Training Materials" },
  { id: "environmental-audit", label: "Environmental Audit" },
  { id: "staff-duty", label: "Staff Duty Roster" },
  { id: "technical-manual", label: "Technical Manual" },
  { id: "other", label: "Other Documents" },
]

interface SearchPanelProps {
  onSearch: (searchParams: SearchParams) => void
}

export interface SearchParams {
  searchText: string
  searchMode: "all" | "any" | "exact"
  dateUploaded: Date | null
  documentTypes: string[]
}

export function SearchPanel({ onSearch }: SearchPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [searchMode, setSearchMode] = useState<"all" | "any" | "exact">("all")
  const [dateUploaded, setDateUploaded] = useState<Date | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleSearch = () => {
    onSearch({
      searchText,
      searchMode,
      dateUploaded,
      documentTypes: selectedTypes,
    })
  }

  const handleClearFilters = () => {
    setSearchText("")
    setSearchMode("all")
    setDateUploaded(null)
    setSelectedTypes([])
    onSearch({
      searchText: "",
      searchMode: "all",
      dateUploaded: null,
      documentTypes: [],
    })
  }

  const toggleDocumentType = (id: string) => {
    setSelectedTypes((prev) => (prev.includes(id) ? prev.filter((type) => type !== id) : [...prev, id]))
  }

  return (
    <Card className="mb-6 border-shell-red/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/images/shell-logo.png" alt="Shell logo" className="h-6 w-6" />
            <CardTitle className="text-xl text-shell-gray">Search Roslem Hub Repository</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-shell-gray">
            {isExpanded ? "Simple Search" : "Advanced Search"}
          </Button>
        </div>
        <CardDescription>Find documents and files in the repository</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="search-text" className="text-shell-gray font-medium">
                  Title
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search for documents by title</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex gap-2">
                <Input
                  id="search-text"
                  placeholder="Enter search terms..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="bg-shell-red hover:bg-shell-darkred text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {isExpanded && (
              <div className="md:w-1/3">
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-shell-gray font-medium">Date Uploaded</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter documents by upload date</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateUploaded ? format(dateUploaded, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateUploaded || undefined}
                      onSelect={(date) => setDateUploaded(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {isExpanded && (
            <>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-shell-gray font-medium">Search Mode</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Choose how to match your search terms</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <RadioGroup
                  value={searchMode}
                  onValueChange={(value) => setSearchMode(value as "all" | "any" | "exact")}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-words" />
                    <Label htmlFor="all-words">All Words</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any-word" />
                    <Label htmlFor="any-word">Any Word</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exact" id="exact-phrase" />
                    <Label htmlFor="exact-phrase">Exact Phrase</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-shell-gray font-medium">Item Type</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter by document type</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {documentTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={() => toggleDocumentType(type.id)}
                      />
                      <Label htmlFor={type.id}>{type.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      {isExpanded && (
        <CardFooter className="flex justify-end pt-0">
          <Button variant="outline" onClick={handleClearFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
