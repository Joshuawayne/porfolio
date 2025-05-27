
import React, { useState } from 'react';

interface NotepadAppProps {
  initialContent?: string;
  // onSave?: (content: string) => void; // For future save functionality
}

const NotepadApp: React.FC<NotepadAppProps> = ({ initialContent = '' }) => {
  const [text, setText] = useState(initialContent);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-1 border-b y2k-raised bg-gray-300 flex space-x-1">
        <button className="y2k-button text-xs">File</button>
        <button className="y2k-button text-xs">Edit</button>
        <button className="y2k-button text-xs">Format</button>
        <button className="y2k-button text-xs">Help</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow w-full h-full p-2 font-mono text-sm y2k-sunken resize-none focus:outline-none"
        placeholder="Type something..."
        spellCheck="false"
      />
    </div>
  );
};

export default NotepadApp;
