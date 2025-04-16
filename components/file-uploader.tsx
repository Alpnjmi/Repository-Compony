"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatFileSize } from "@/lib/file-utils"

// Update the interface to include the fileObject parameter
interface FileUploaderProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (fileName: string, fileType: string, fileSize: string, fileObject?: File) => void
}

export function FileUploader({ isOpen, onClose, onUpload }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Update the handleSubmit function to pass the file object
  const handleSubmit = () => {
    if (selectedFile) {
      // Format file size
      const fileSize = formatFileSize(selectedFile.size)

      // Get file extension
      const fileType = selectedFile.name.split(".").pop() || ""

      onUpload(selectedFile.name, fileType, fileSize, selectedFile)
      setSelectedFile(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <div
          className={`mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 ${
            dragActive ? "border-shell-red bg-shell-red/5" : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <Button variant="ghost" size="icon" onClick={() => setSelectedFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedFile.size < 1024 * 1024
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                  : `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`}
              </p>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-shell-red mb-2" />
              <p className="mb-2 text-sm font-medium">Drag and drop file here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOCX, XLSX, PPTX, JPG, PNG (max 10MB)</p>
              <Label htmlFor="file-upload" className="sr-only">
                Choose a file
              </Label>
              <Input id="file-upload" ref={inputRef} type="file" className="hidden" onChange={handleChange} />
              <Button
                variant="secondary"
                className="mt-4 bg-shell-yellow text-black hover:bg-shell-yellow/80"
                onClick={() => inputRef.current?.click()}
              >
                Browse Files
              </Button>
            </>
          )}
        </div>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!selectedFile}
            onClick={handleSubmit}
            className="bg-shell-red hover:bg-shell-darkred text-white"
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
