"use client"

import { useState } from "react"
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  MoreVertical,
  Download,
  Trash2,
  Share2,
  FileIcon as FilePresentation,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FilePreview } from "@/components/file-preview"
import { downloadFile } from "@/lib/file-utils"

interface FileListProps {
  files: {
    id: string
    name: string
    type: string
    size: string
    modified: string
    owner: string
  }[]
  onDelete: (id: string) => void
}

export function FileList({ files, onDelete }: FileListProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-shell-red" />
      case "xlsx":
      case "csv":
        return <FileSpreadsheet className="h-10 w-10 text-shell-blue" />
      case "jpg":
      case "png":
      case "gif":
        return <FileImage className="h-10 w-10 text-shell-blue" />
      case "pptx":
        return <FilePresentation className="h-10 w-10 text-shell-yellow" />
      default:
        return <File className="h-10 w-10 text-shell-gray" />
    }
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No files found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <Card
          key={file.id}
          className="overflow-hidden border-shell-gray/20 hover:border-shell-red/50 transition-colors"
        >
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div className="mr-4 flex-shrink-0">{getFileIcon(file.type)}</div>
              <div className="flex-1 cursor-pointer" onClick={() => setSelectedFile(file.id)}>
                <h3 className="font-medium">{file.name}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground">
                  <span>{file.size}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>Modified {formatDistanceToNow(new Date(file.modified), { addSuffix: true })}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>Owner: {file.owner}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedFile(file.id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadFile(file)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-shell-red focus:text-shell-red" onClick={() => onDelete(file.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}

      {selectedFile && (
        <FilePreview file={files.find((f) => f.id === selectedFile)!} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  )
}
