import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileText, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface ResumeUploadProps {
  file: File | null;
  pastedText: string;
  mode: "upload" | "paste";
  onFileChange: (file: File | null) => void;
  onPastedTextChange: (text: string) => void;
  onModeChange: (mode: "upload" | "paste") => void;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED = ".pdf,.doc,.docx";
const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  file,
  pastedText,
  mode,
  onFileChange,
  onPastedTextChange,
  onModeChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((f: File): boolean => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return false;
    }
    if (f.size > MAX_SIZE) {
      setError("File must be under 5 MB.");
      return false;
    }
    setError(null);
    return true;
  }, []);

  const handleFile = useCallback(
    (f: File) => {
      if (validate(f)) onFileChange(f);
    },
    [validate, onFileChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
      // Reset so re-selecting same file works
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <div className="flex flex-col gap-3">
      <Tabs
        value={mode}
        onValueChange={(v) => onModeChange(v as "upload" | "paste")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="min-h-[44px]">Upload File</TabsTrigger>
          <TabsTrigger value="paste" className="min-h-[44px]">Paste Text</TabsTrigger>
        </TabsList>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Either option works — choose what's easiest for you
        </p>

        <TabsContent value="upload" className="mt-3">
          {file ? (
            <div
              className="flex items-center gap-3 rounded-lg border p-4 bg-card"
              style={{ borderColor: "var(--border)" }}
            >
              <FileText size={20} className="text-primary shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => { onFileChange(null); setError(null); }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Remove file"
              >
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors min-h-[160px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              )}
            >
              <Upload size={28} className="text-muted-foreground" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground">Drop your resume here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground">PDF, DOC, DOCX · Max 5 MB</p>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED}
                onChange={handleInputChange}
                className="hidden"
                aria-label="Upload resume file"
              />
            </div>
          )}
          {error && (
            <p className="text-xs mt-2" style={{ color: "var(--destructive)" }}>{error}</p>
          )}
        </TabsContent>

        <TabsContent value="paste" className="mt-3">
          <Textarea
            value={pastedText}
            onChange={(e) => onPastedTextChange(e.target.value)}
            placeholder="Paste your resume content here..."
            className="min-h-[200px] resize-y"
            aria-label="Resume text content"
          />
          <p className="text-xs text-muted-foreground text-right mt-1">
            {pastedText.length} characters
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
