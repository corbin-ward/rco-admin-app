import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, Upload, FileText, Calendar } from 'lucide-react'

interface Document {
  id: number
  name: string
  title: string
  url: string
  uploadDate: Date
}

interface DocumentUploaderProps {
  documents: Document[] | undefined
  onUpdate?: (updatedDocuments: Document[]) => void
  readOnly?: boolean
}

export function DocumentUploader({ documents = [], onUpdate, readOnly = false }: DocumentUploaderProps) {
  const [newDocument, setNewDocument] = useState<Partial<Document>>({})

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // This is a placeholder for file upload functionality
      console.log(`Uploading file: ${file.name}`)
      setNewDocument({ name: file.name, url: URL.createObjectURL(file) })
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDocument(prev => ({ ...prev, title: event.target.value }))
  }

  const addDocument = () => {
    if (newDocument.name && newDocument.url && newDocument.title && onUpdate) {
      onUpdate([...documents, { 
        id: Date.now(), 
        ...newDocument as Document, 
        uploadDate: new Date() 
      }])
      setNewDocument({})
    }
  }

  const removeDocument = (id: number) => {
    if (onUpdate) {
      const updatedDocuments = documents.filter(doc => doc.id !== id)
      onUpdate(updatedDocuments)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((document) => (
            <div key={document.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {document.title}
                  </a>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(document.uploadDate)}
                  </p>
                </div>
              </div>
              {!readOnly && (
                <Button variant="ghost" size="sm" onClick={() => removeDocument(document.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {!readOnly && (
          <div className="flex items-center space-x-2 mt-4">
            <Input
              type="file"
              onChange={handleFileUpload}
              className="flex-grow"
            />
            <Input
              value={newDocument.title || ''}
              onChange={handleTitleChange}
              placeholder="Document Title"
              className="flex-grow"
            />
            <Button onClick={addDocument} disabled={!newDocument.name || !newDocument.title}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

