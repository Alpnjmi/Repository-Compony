"use client"

import { useState, useEffect } from "react"
import { FileUploader } from "@/components/file-uploader"
import { FileList } from "@/components/file-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { SearchPanel, type SearchParams } from "@/components/search-panel"
import { format } from "date-fns"

// Sample file data
type FileData = {
  id: string
  name: string
  type: string
  size: string
  modified: string
  owner: string
  fileObject?: File // Optional because initial files won't have this
  documentType?: string // Added for search filtering
}

// Map file extensions to document types for demo purposes
const getDocumentTypeFromExtension = (extension: string): string => {
  const mapping: Record<string, string> = {
    pdf: "technical-manual",
    xlsx: "monthly-sales",
    docx: "station-report",
    pptx: "training-materials",
  }
  return mapping[extension] || "other"
}

const initialFiles: FileData[] = [
  {
    id: "1",
    name: "Shell Safety Protocol.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "2025-04-10T14:48:00",
    owner: "Alex Johnson",
    documentType: "safety-inspection",
  },
  {
    id: "2",
    name: "Q1 Energy Report.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    modified: "2025-04-08T09:30:00",
    owner: "Sam Wilson",
    documentType: "monthly-sales",
  },
  {
    id: "3",
    name: "Sustainability Meeting Notes.docx",
    type: "docx",
    size: "548 KB",
    modified: "2025-04-11T16:15:00",
    owner: "Taylor Smith",
    documentType: "environmental-audit",
  },
  {
    id: "4",
    name: "Renewable Energy Roadmap.pptx",
    type: "pptx",
    size: "4.2 MB",
    modified: "2025-04-05T11:20:00",
    owner: "Jamie Lee",
    documentType: "training-materials",
  },
  {
    id: "5",
    name: "Environmental Impact Assessment.pdf",
    type: "pdf",
    size: "3.7 MB",
    modified: "2025-04-09T13:45:00",
    owner: "Casey Brown",
    documentType: "environmental-audit",
  },
  {
    id: "6",
    name: "Station Maintenance Schedule.xlsx",
    type: "xlsx",
    size: "1.2 MB",
    modified: "2025-04-07T10:30:00",
    owner: "Jordan Taylor",
    documentType: "pump-maintenance",
  },
  {
    id: "7",
    name: "Fuel Inventory Report.pdf",
    type: "pdf",
    size: "2.1 MB",
    modified: "2025-04-06T09:15:00",
    owner: "Morgan Lee",
    documentType: "fuel-stock",
  },
  {
    id: "8",
    name: "Staff Rotation Schedule.docx",
    type: "docx",
    size: "420 KB",
    modified: "2025-04-04T14:20:00",
    owner: "Riley Johnson",
    documentType: "staff-duty",
  },
]

export function FileRepository() {
  const [files, setFiles] = useState<FileData[]>(initialFiles)
  const [filteredFiles, setFilteredFiles] = useState<FileData[]>(initialFiles)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)

  // Load files from localStorage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem("repositoryFiles")
    if (savedFiles) {
      try {
        setFiles(JSON.parse(savedFiles))
        setFilteredFiles(JSON.parse(savedFiles))
      } catch (error) {
        console.error("Error loading files from localStorage:", error)
      }
    }
  }, [])

  // Save files to localStorage whenever they change
  useEffect(() => {
    // We need to create a version without the fileObject which can't be serialized
    const filesToSave = files.map(({ fileObject, ...rest }) => rest)
    localStorage.setItem("repositoryFiles", JSON.stringify(filesToSave))
  }, [files])

  // Apply search and filters
  useEffect(() => {
    if (!searchParams) {
      setFilteredFiles(files)
      return
    }

    let results = [...files]

    // Filter by search text
    if (searchParams.searchText) {
      const searchTerms = searchParams.searchText.toLowerCase().trim()

      if (searchParams.searchMode === "exact") {
        results = results.filter((file) => file.name.toLowerCase().includes(searchTerms))
      } else if (searchParams.searchMode === "all") {
        const terms = searchTerms.split(/\s+/)
        results = results.filter((file) => terms.every((term) => file.name.toLowerCase().includes(term)))
      } else {
        // "any"
        const terms = searchTerms.split(/\s+/)
        results = results.filter((file) => terms.some((term) => file.name.toLowerCase().includes(term)))
      }
    }

    // Filter by date
    if (searchParams.dateUploaded) {
      const dateString = format(searchParams.dateUploaded, "yyyy-MM-dd")
      results = results.filter((file) => {
        const fileDate = format(new Date(file.modified), "yyyy-MM-dd")
        return fileDate === dateString
      })
    }

    // Filter by document types
    if (searchParams.documentTypes.length > 0) {
      results = results.filter((file) => searchParams.documentTypes.includes(file.documentType || "other"))
    }

    setFilteredFiles(results)
  }, [searchParams, files])

  const addFile = (file: FileData) => {
    const newFiles = [file, ...files]
    setFiles(newFiles)
    setFilteredFiles(newFiles)

    // Show a success toast
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been added to your repository.`,
      action: <ToastAction altText="View">View</ToastAction>,
    })
  }

  const deleteFile = (id: string) => {
    const newFiles = files.filter((file) => file.id !== id)
    setFiles(newFiles)
    setFilteredFiles(newFiles.filter((file) => filterFile(file)))

    // Show a success toast
    toast({
      title: "File deleted",
      description: "The file has been removed from your repository.",
    })
  }

  // Filter function to apply current search params to a single file
  const filterFile = (file: FileData): boolean => {
    if (!searchParams) return true

    // Filter by search text
    if (searchParams.searchText) {
      const searchTerms = searchParams.searchText.toLowerCase().trim()

      if (searchParams.searchMode === "exact") {
        if (!file.name.toLowerCase().includes(searchTerms)) return false
      } else if (searchParams.searchMode === "all") {
        const terms = searchTerms.split(/\s+/)
        if (!terms.every((term) => file.name.toLowerCase().includes(term))) return false
      } else {
        // "any"
        const terms = searchTerms.split(/\s+/)
        if (!terms.some((term) => file.name.toLowerCase().includes(term))) return false
      }
    }

    // Filter by date
    if (searchParams.dateUploaded) {
      const dateString = format(searchParams.dateUploaded, "yyyy-MM-dd")
      const fileDate = format(new Date(file.modified), "yyyy-MM-dd")
      if (fileDate !== dateString) return false
    }

    // Filter by document types
    if (searchParams.documentTypes.length > 0) {
      if (!searchParams.documentTypes.includes(file.documentType || "other")) return false
    }

    return true
  }

  // Get recent files without modifying the original array
  const getRecentFiles = () => {
    return [...filteredFiles]
      .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
      .slice(0, 3)
  }

  // Handle search
  const handleSearch = (params: SearchParams) => {
    setSearchParams(params)
    setActiveTab("all")
  }

  return (
    <div className="space-y-6">
      <SearchPanel onSearch={handleSearch} />

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-shell-gray/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-shell-red data-[state=active]:text-white">
              All Files
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-shell-red data-[state=active]:text-white">
              Recent
            </TabsTrigger>
            <TabsTrigger value="shared" className="data-[state=active]:bg-shell-red data-[state=active]:text-white">
              Shared with me
            </TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsUploading(true)} className="bg-shell-red hover:bg-shell-darkred text-white">
            <Plus className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          <FileList files={filteredFiles} onDelete={deleteFile} />
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <FileList files={getRecentFiles()} onDelete={deleteFile} />
        </TabsContent>

        <TabsContent value="shared" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No files have been shared with you yet.</p>
          </div>
        </TabsContent>
      </Tabs>

      <FileUploader
        isOpen={isUploading}
        onClose={() => setIsUploading(false)}
        onUpload={(fileName, fileType, fileSize, fileObject) => {
          const newFile = {
            id: Date.now().toString(),
            name: fileName,
            type: fileType,
            size: fileSize,
            modified: new Date().toISOString(),
            owner: "You",
            fileObject: fileObject,
            documentType: getDocumentTypeFromExtension(fileType),
          }
          addFile(newFile)
          setIsUploading(false)

          // Switch to "all" tab to show the newly uploaded file
          setActiveTab("all")
        }}
      />
    </div>
  )
}
