"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, FileText, FileSpreadsheet, FileImage, File, FileIcon as FilePresentation } from "lucide-react"
import { downloadFile } from "@/lib/file-utils"

interface FilePreviewProps {
  file: {
    id: string
    name: string
    type: string
    size: string
    modified: string
    owner: string
  }
  onClose: () => void
}

export function FilePreview({ file, onClose }: FilePreviewProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-16 w-16 text-shell-red" />
      case "xlsx":
      case "csv":
        return <FileSpreadsheet className="h-16 w-16 text-shell-blue" />
      case "jpg":
      case "png":
      case "gif":
        return <FileImage className="h-16 w-16 text-shell-blue" />
      case "pptx":
        return <FilePresentation className="h-16 w-16 text-shell-yellow" />
      default:
        return <File className="h-16 w-16 text-shell-gray" />
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>File Preview</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          {getFileIcon(file.type)}
          <h3 className="mt-4 font-medium text-lg">{file.name}</h3>
          <div className="mt-2 text-sm text-muted-foreground">
            {file.size} • Modified on {new Date(file.modified).toLocaleDateString()}
          </div>
          <div className="text-sm text-muted-foreground">Owner: {file.owner}</div>

          <div className="mt-8 w-full p-4 bg-muted rounded-lg text-center">
            <p className="text-muted-foreground">Preview not available. Download the file to view its contents.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-shell-red hover:bg-shell-darkred text-white" onClick={() => downloadFile(file)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
