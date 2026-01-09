import { clsx } from "clsx";
import { Upload } from "lucide-react";
import type { ChangeEvent, CSSProperties } from "react";

import style from "./FileUpload.module.css";

interface FileUploadProps {
  id?: string;
  name?: string;
  accept?: string;
  required?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
}

const FileUpload = ({
  id,
  name,
  accept = ".pdf,.doc,.docx",
  required = false,
  value,
  onChange,
  className = "",
  style: customStyle,
  placeholder = "Click to upload or drag and drop",
}: FileUploadProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    } else {
      onChange(null);
    }
  };

  const removeFile = () => {
    onChange(null);
  };

  return (
    <div className={clsx(style.fileUploadContainer, className)} style={customStyle}>
      <label htmlFor={id} className={style.fileInputLabel}>
        <Upload className={style.iconUpload} />
        <span>{placeholder}</span>
        <span className={style.fileInputNote}>
          {accept.replace(/\./g, "").replace(/,/g, ", ").toUpperCase()} (Max 20MB)
        </span>
        {value && (
          <div className={style.fileNameContainer}>
            <span className={style.fileName}>{value.name}</span>
            <button
              type="button"
              className={style.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        )}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={style.input}
        required={required}
      />
    </div>
  );
};

export default FileUpload;
