
import React, { useState } from 'react';
import { Wallpaper, Y2K_WALLPAPERS, ScreensaverType } from '../../types';

interface SettingsAppProps {
  currentWallpaper: Wallpaper;
  onChangeWallpaper: (wallpaper: Wallpaper) => void;
  currentScreensaver: ScreensaverType;
  onChangeScreensaver: (type: ScreensaverType) => void;
  currentCursor: string;
  onChangeCursor: (cursor: string) => void;
}

const CURSOR_OPTIONS = [
  { name: 'Default', value: 'auto' },
  { name: 'Pointer', value: 'pointer' },
  { name: 'Crosshair', value: 'crosshair' },
  { name: 'Text', value: 'text' },
  { name: 'Wait', value: 'wait' },
];

const SettingsApp: React.FC<SettingsAppProps> = ({ 
    currentWallpaper, onChangeWallpaper, 
    currentScreensaver, onChangeScreensaver,
    currentCursor, onChangeCursor
}) => {
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'screensaver' | 'mouse'>('wallpaper');

  return (
    <div className="flex flex-col h-full bg-gray-200 p-2">
      <div className="flex border-b border-gray-400 mb-2">
        {['Wallpaper', 'Screensaver', 'Mouse'].map(tab => (
          <button 
            key={tab.toLowerCase()}
            className={`y2k-button px-3 py-1 text-sm ${activeTab === tab.toLowerCase() ? 'y2k-sunken bg-gray-100' : ''}`}
            onClick={() => setActiveTab(tab.toLowerCase() as any)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'wallpaper' && (
        <div>
          <h3 className="font-bold mb-2">Select Wallpaper:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-1 y2k-sunken">
            {Y2K_WALLPAPERS.map((wp) => (
              <button
                key={wp}
                className={`h-20 w-full y2k-button p-0.5 ${currentWallpaper === wp ? 'ring-2 ring-blue-500 ring-inset' : ''}`}
                onClick={() => onChangeWallpaper(wp)}
                style={wp.startsWith('#') ? { backgroundColor: wp } : { backgroundImage: `url(${wp})`, backgroundSize: 'cover' }}
                aria-label={`Wallpaper ${wp.startsWith('#') ? wp : 'image'}`}
              >
                {/* Optional: Show tiny preview or name */}
              </button>
            ))}
          </div>
           <p className="text-xs mt-2">Note: Wallpapers are placeholders from picsum.photos or solid colors.</p>
        </div>
      )}

      {activeTab === 'screensaver' && (
        <div>
          <h3 className="font-bold mb-2">Select Screensaver:</h3>
          <select 
            value={currentScreensaver} 
            onChange={(e) => onChangeScreensaver(e.target.value as ScreensaverType)}
            className="w-full p-1 y2k-sunken"
          >
            <option value={ScreensaverType.NONE}>None</option>
            <option value={ScreensaverType.STARFIELD}>Starfield</option>
            <option value={ScreensaverType.PIPES}>3D Pipes (Placeholder)</option>
          </select>
          <p className="text-xs mt-2">Screensaver activates after 30 seconds of inactivity.</p>
        </div>
      )}
       {activeTab === 'mouse' && (
        <div>
          <h3 className="font-bold mb-2">Mouse Pointer Scheme:</h3>
          <select 
            value={currentCursor} 
            onChange={(e) => onChangeCursor(e.target.value)}
            className="w-full p-1 y2k-sunken"
          >
            {CURSOR_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.name}</option>
            ))}
          </select>
           <p className="text-xs mt-2">Changes the desktop mouse cursor. Some applications might override this.</p>
        </div>
      )}

      <div className="mt-auto pt-2 flex justify-end space-x-2">
        <button className="y2k-button px-4">OK</button>
        <button className="y2k-button px-4">Cancel</button>
        <button className="y2k-button px-4">Apply</button>
      </div>
    </div>
  );
};

export default SettingsApp;
