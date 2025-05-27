
import React from 'react';
import { FileIconSvg } from '../../constants'; // Assuming you have a generic file icon

interface RecycleBinAppProps {
  deletedItems: { id: string; name: string }[]; // Simplified representation
  onEmptyRecycleBin: () => void;
  onRestoreItem: (id: string) => void; // Placeholder
}

const RecycleBinApp: React.FC<RecycleBinAppProps> = ({ deletedItems, onEmptyRecycleBin, onRestoreItem }) => {
  return (
    <div className="flex flex-col h-full bg-white p-2">
      <div className="flex justify-between items-center mb-2 pb-2 border-b y2k-raised bg-gray-300 p-1">
        <h2 className="font-bold">Recycle Bin</h2>
        <button onClick={onEmptyRecycleBin} className="y2k-button text-xs bg-red-400 hover:bg-red-500" disabled={deletedItems.length === 0}>
          Empty Recycle Bin
        </button>
      </div>
      {deletedItems.length === 0 ? (
        <p className="text-gray-600 text-center py-4">The Recycle Bin is empty.</p>
      ) : (
        <ul className="space-y-1 overflow-y-auto flex-grow y2k-sunken p-1">
          {deletedItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-1 hover:bg-blue-100">
              <div className="flex items-center space-x-2">
                {React.cloneElement(FileIconSvg, { className: "w-5 h-5"})}
                <span>{item.name}</span>
              </div>
              <button onClick={() => { alert('Restore functionality is a placeholder.'); onRestoreItem(item.id); }} className="y2k-button text-xs">
                Restore
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecycleBinApp;
