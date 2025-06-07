import React, { useRef } from 'react';
import { FaDownload, FaCamera } from 'react-icons/fa';

const MedicalRecords = ({ files, onUpload, onDownloadAll }) => {
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onUpload(selectedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onUpload(droppedFiles);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Dossier médical</h3>
        <button
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onDownloadAll}
        >
          Télécharger tout
        </button>
      </div>

      <label className="text-sm font-medium text-gray-700 mb-2 block">Médias</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500"
        onClick={() => fileInputRef.current.click()}
      >
        <FaCamera className="text-2xl text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Glissez-déposez ou</p>
        <button className="mt-2 px-4 py-1 bg-green-600 text-white text-sm rounded">Parcourir</button>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".jpg,.jpeg,.png,.mp4"
          onChange={handleFileSelect}
          className="hidden"
        />
        <p className="text-xs text-gray-400 mt-2">Formats acceptés : JPG, PNG, MP4</p>
      </div>

      <div className="mt-4 space-y-2">
        {files.map((file, index) => (
          <div key={index} className="bg-gray-50 px-4 py-3 rounded-lg flex justify-between items-center">
            <p className="text-sm text-gray-800 truncate w-5/6">{file.name}</p>
            <button className="text-blue-600 hover:underline text-sm" onClick={() => file.download()}>
              Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
