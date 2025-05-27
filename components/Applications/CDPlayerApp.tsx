
import React, { useState } from 'react';

const CDPlayerApp: React.FC = () => {
  const [status, setStatus] = useState("No Disc"); // "No Disc", "Reading...", "Playing Track 1"
  const [track, setTrack] = useState("---");

  const handleInsertDisc = () => {
    // Play sound: cd_tray_open.wav
    // Play sound: cd_insert.wav
    setStatus("Reading...");
    setTrack("Track 01 - My Awesome Song.mp3");
    setTimeout(() => setStatus("Playing Track 1"), 1500);
    // Play sound: cd_spin_up.wav
  };

  const handleEjectDisc = () => {
    // Play sound: cd_tray_open.wav
    setStatus("No Disc");
    setTrack("---");
     // Play sound: cd_eject.wav
  };

  return (
    <div className="flex flex-col h-full bg-gray-700 text-green-300 font-mono p-3 space-y-3">
      <div className="text-center text-lg y2k-sunken bg-black p-2 border-2 border-gray-500">
        {status} : {track}
      </div>
      <div className="flex justify-around items-center">
        <button className="y2k-button bg-gray-500 text-white p-2 text-xs">|&lt;</button>
        <button className="y2k-button bg-blue-500 text-white p-2 text-xs">&gt;</button> {/* Play */}
        <button className="y2k-button bg-gray-500 text-white p-2 text-xs">||</button> {/* Pause */}
        <button className="y2k-button bg-red-500 text-white p-2 text-xs">[]</button> {/* Stop */}
        <button className="y2k-button bg-gray-500 text-white p-2 text-xs">&gt;|</button>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleInsertDisc} className="y2k-button bg-green-600 text-white flex-1">Insert Disc</button>
        <button onClick={handleEjectDisc} className="y2k-button bg-yellow-500 text-black flex-1">Eject</button>
      </div>
      <div className="text-xs text-center text-gray-400">
        CD-ROM XA Drive (Simulated)
      </div>
       <p className="text-xs mt-4 text-gray-400 text-center">Sound effects and full playback not implemented.</p>
    </div>
  );
};

export default CDPlayerApp;
