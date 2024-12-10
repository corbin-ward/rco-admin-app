import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar } from 'lucide-react'
import { DocumentUploader } from '../editor/document-uploader'

interface Document {
  id: number
  name: string
  title: string
  url: string
  uploadDate: Date
}

interface DocumentsSectionProps {
  documents: Document[]
  isEditing: boolean
  onUpdate: (updatedDocuments: Document[]) => void
}

export function DocumentsSection({ documents, isEditing, onUpdate }: DocumentsSectionProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const content = isEditing ? (
    <>
      <DocumentUploader 
        documents={documents}
        onUpdate={onUpdate}
      />
    </>
  ) : (
    <div className="space-y-4">
      {documents && documents.length > 0 ? (
        documents.map((document) => (
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
          </div>
        ))
      ) : (
        <p>No documents available.</p>
      )}
    </div>
  );

  return isEditing ? (
    content
  ) : (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
}

