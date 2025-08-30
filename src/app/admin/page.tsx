"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import supabase from "@/lib/supabase/client";

// const supabase = createClient();

interface Document {
  file_name: string;
  uploaded_at: string;
}

const AdminPanel = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from("embedded_documents")
      .select("file_name, uploaded_at")
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setDocuments(data || []);
    }
  };

  const handleIngestWeb = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/ingest", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to ingest web data");
      }
      await fetchDocuments();
      setMessage("Web data ingested successfully");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };


  const ingestData = async () => {
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json();

      console.log("Data: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    setMessage(null);
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload-file", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to upload file");
        }
      }
      await fetchDocuments();
      setMessage("Files uploaded and embedded successfully");
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "text/plain": [".txt"],
    },
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={ingestData}
          className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "Ingesting..." : "Ingest Web Data"}
        </button>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-amber-300 p-6 rounded cursor-pointer text-center ${isDragActive ? "bg-amber-100" : ""
            }`}
        >
          <input {...getInputProps()} />
          <p className="text-amber-600">
            {isDragActive
              ? "Drop files here"
              : "Drag and drop files here or click to upload"}
          </p>
          <p className="text-sm text-gray-500">
            Supported: PDF, DOCX, PPTX, TXT
          </p>
        </div>
      </div>

      {message && (
        <p
          className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}
        >
          {message}
        </p>
      )}

      <h2 className="text-xl font-semibold mb-2">Uploaded Resources</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">File Name</th>
              <th className="py-2 px-4 text-left">Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.file_name} className="border-t">
                <td className="py-2 px-4">{doc.file_name}</td>
                <td className="py-2 px-4">
                  {new Date(doc.uploaded_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={2} className="py-2 px-4 text-center text-gray-500">
                  No resources uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
