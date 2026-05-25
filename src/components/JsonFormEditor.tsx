import { useState } from "react";
import { Eye, Code } from "lucide-react";
// @ts-ignore
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface JsonFormEditorProps {
  data: any;
  onChange: (newData: any) => void;
}

function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

function isImageField(key: string, value: any) {
  if (typeof value !== "string") return false;
  const k = key.toLowerCase();
  return (
    k.includes("image") ||
    k.includes("photo") ||
    k.includes("logo") ||
    value.startsWith("http")
  );
}

export default function JsonFormEditor({
  data,
  onChange,
}: JsonFormEditorProps) {
  const [viewMode, setViewMode] = useState<"form" | "raw">("form");
  const [rawText, setRawText] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState("");

  const handleRawChange = (text: string) => {
    setRawText(text);
    try {
      const parsed = JSON.parse(text);
      setError("");
      onChange(parsed);
    } catch (e: any) {
      setError(e.message || "Invalid JSON");
    }
  };

  const handleFieldChange = (path: (string | number)[], newValue: any) => {
    const newData = deepClone(data);
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = newValue;
    onChange(newData);
    setRawText(JSON.stringify(newData, null, 2));
  };

  const renderField = (
    value: any,
    path: (string | number)[],
    key: string | number,
  ) => {
    if (typeof value === "string") {
      const isImg = isImageField(key.toString(), value);

      return (
        <div key={path.join(".")}>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {key}
          </label>
          <div className="flex gap-4 items-start">
            {isImg && value && (
              <div
                className="w-32 h-32 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer group relative"
                onClick={() => window.open(value, "_blank")}
                title="Click to view full size image"
              >
                <img
                  src={value}
                  alt=""
                  className="w-full h-full object-contain transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="text-white" size={24} />
                </div>
              </div>
            )}
            <div className="flex-1 flex flex-col gap-2">
              {value.length > 80 ||
              key === "description" ||
              key === "bio" ||
              key === "problem" ||
              key === "solution" ||
              key === "content" ? (
                <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-gray-200 [&_.dark_.ql-toolbar]:border-gray-800 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[250px] [&_.ql-editor]:text-sm [&_.ql-editor]:font-sans">
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(content: string) =>
                      handleFieldChange(path, content)
                    }
                  />
                </div>
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleFieldChange(path, e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-cyan-500"
                />
              )}
              {isImg && (
                <label className="cursor-pointer flex items-center justify-center bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 py-2 rounded-lg text-xs font-bold hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors w-fit px-4 border border-cyan-200 dark:border-cyan-800">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          handleFieldChange(path, reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  Upload New Image
                </label>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return (
        <div key={path.join(".")}>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {key}
          </label>
          <input
            type={typeof value === "number" ? "number" : "checkbox"}
            checked={typeof value === "boolean" ? value : undefined}
            value={typeof value === "number" ? value : undefined}
            onChange={(e) =>
              handleFieldChange(
                path,
                typeof value === "number"
                  ? Number(e.target.value)
                  : e.target.checked,
              )
            }
            className={
              typeof value === "number"
                ? "w-full p-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-cyan-500"
                : "w-5 h-5 accent-cyan-600 rounded"
            }
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div
          key={path.join(".")}
          className="p-4 bg-gray-50/50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/5 rounded-xl"
        >
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest mb-3 border-b dark:border-white/10 pb-2">
            {key}
          </label>
          <div className="space-y-4">
            {value.map((item, index) =>
              renderField(item, [...path, index], index),
            )}
          </div>
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div
          key={path.join(".")}
          className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-xl shadow-sm"
        >
          <label className="block text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4 border-b dark:border-white/10 pb-2">
            {key}
          </label>
          <div className="space-y-4 grid grid-cols-1">
            {Object.keys(value).map((k) =>
              renderField(value[k], [...path, k], k),
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="flex justify-end mb-4 bg-gray-100/50 dark:bg-gray-800 p-1 rounded-xl w-fit">
        <button
          onClick={() => setViewMode("form")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold ${viewMode === "form" ? "bg-white dark:bg-gray-700 shadow-sm text-cyan-600 dark:text-cyan-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"}`}
        >
          <Eye size={14} /> Form View
        </button>
        <button
          onClick={() => setViewMode("raw")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold ${viewMode === "raw" ? "bg-white dark:bg-gray-700 shadow-sm text-cyan-600 dark:text-cyan-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"}`}
        >
          <Code size={14} /> Raw JSON
        </button>
      </div>

      {viewMode === "raw" ? (
        <div>
          {error && <div className="mb-2 text-xs text-red-500">{error}</div>}
          <textarea
            value={rawText}
            onChange={(e) => handleRawChange(e.target.value)}
            className="w-full h-[500px] p-4 font-mono text-sm bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
            spellCheck={false}
          />
        </div>
      ) : (
        <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
          {Object.keys(data).map((k) => renderField(data[k], [k], k))}
        </div>
      )}
    </div>
  );
}
