import React from 'react';
import { FileIconSvg } from '../../../constants'; // Using a generic file icon

const CVSection: React.FC = () => {
  const handleDownload = () => {
    alert("Downloading joshuawayne_cv_y2k.txt (1.5KB)... \nActually, this is a placeholder! No file will be downloaded. For a real CV, please email me!");
  };

  return (
    <div className="p-4 space-y-6 text-sm flex flex-col items-center justify-center h-full">
      <div className="y2k-raised bg-gray-100 p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">My Professional Dossier</h2>
        
        <div className="my-6">
          {React.cloneElement(FileIconSvg, { className: "w-16 h-16 text-gray-700 mx-auto" })}
        </div>

        <p className="mb-3">
          Access my Curriculum Vitae, packed with details about my skills (including Next.js, Three.js), experience with projects like the Cow Heat Tracking System, and more. 
        </p>
        <p className="mb-6 text-xs text-gray-600">
          (Saved in a universally compatible .txt format, naturally. File size optimized for your dial-up connection!)
        </p>

        <button 
          onClick={handleDownload} 
          className="y2k-button bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-lg animate-bounce"
        >
          Download CV_JOSHUAWAYNE.TXT
        </button>

        <div className="mt-8 text-xs y2k-sunken p-2 bg-yellow-100 border-yellow-400">
          <p><strong>System Requirements:</strong> A computer, a monitor (800x600 recommended), and a text editor (Notepad.exe preferred). Coffee optional but encouraged.</p>
        </div>
      </div>
    </div>
  );
};

export default CVSection;