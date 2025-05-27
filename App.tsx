
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BootScreen from './components/BootScreen';
import DesktopIcon from './components/DesktopIcon';
import WindowComponent from './components/Window';
import Taskbar from './components/Taskbar';
import ContextMenu from './components/ContextMenu';
import ScreenSaver from './components/ScreenSaver';
import { BootPhase, WindowInstance, AppType, DesktopIconItem, ContextMenuItem, ContextMenuState, Wallpaper, ScreensaverType } from './types';
import { 
    INITIAL_DESKTOP_ICONS, DEFAULT_WALLPAPER, IDLE_TIMEOUT, 
    RecycleBinEmptySvg, RecycleBinFullSvg, MOCK_FILE_SYSTEM, 
    FileIconSvg, FolderIconSvg, SettingsIconSvg, CalculatorIconSvg, 
    MinesweeperIconSvg, CdPlayerIconSvg, TASKBAR_HEIGHT
} from './constants';
import useContextMenu from './hooks/useContextMenu';
import useIdleTimer from './hooks/useIdleTimer';

// Import App Components
import NotepadApp from './components/Applications/NotepadApp';
import SettingsApp from './components/Applications/SettingsApp';
import RecycleBinApp from './components/Applications/RecycleBinApp';
import FolderApp from './components/Applications/FolderApp';
import CalculatorApp from './components/Applications/CalculatorApp';
import GamePlaceholderApp from './components/Applications/GamePlaceholderApp';
import CDPlayerApp from './components/Applications/CDPlayerApp';


const App: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<BootPhase>(BootPhase.STARTING);
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconItem[]>(INITIAL_DESKTOP_ICONS);
  const [contextMenuState, showContextMenu, hideContextMenu] = useContextMenu();
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(DEFAULT_WALLPAPER);
  const [isScreenSaverActive, setIsScreenSaverActive] = useState(false);
  const [currentScreensaverType, setCurrentScreensaverType] = useState<ScreensaverType>(ScreensaverType.STARFIELD);
  const [deletedItems, setDeletedItems] = useState<{id: string, name: string}[]>([]); 
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [currentCursor, setCurrentCursor] = useState('auto');


  const { reset: resetIdleTimer } = useIdleTimer(IDLE_TIMEOUT, () => {
    if(currentScreensaverType !== ScreensaverType.NONE) {
        setIsScreenSaverActive(true);
    }
  });

  const handleBootComplete = useCallback(() => {
    setBootPhase(BootPhase.DONE);
  }, []);

  const getAppIcon = useCallback((appType: AppType, specificClass?: string): React.ReactElement<React.SVGAttributes<SVGSVGElement>> => {
    let iconElement: React.ReactElement<React.SVGAttributes<SVGSVGElement>>;
    switch (appType) {
      case AppType.NOTEPAD: iconElement = FileIconSvg; break;
      case AppType.SETTINGS: iconElement = SettingsIconSvg; break;
      case AppType.RECYCLE_BIN: iconElement = deletedItems.length > 0 ? RecycleBinFullSvg : RecycleBinEmptySvg; break;
      case AppType.FOLDER: iconElement = FolderIconSvg; break;
      case AppType.CALCULATOR: iconElement = CalculatorIconSvg; break;
      case AppType.MINESWEEPER: iconElement = MinesweeperIconSvg; break;
      case AppType.CD_PLAYER: iconElement = CdPlayerIconSvg; break;
      default: iconElement = FileIconSvg;
    }
    return React.cloneElement(iconElement, {className: specificClass || "w-4 h-4"});
  }, [deletedItems.length]);


  const openWindow = useCallback((appType: AppType, title: string, data?: any) => {
    const newWindowId = `window-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`; // More unique ID
    let width = 500, height = 400;
    if (appType === AppType.CALCULATOR) {
        width = 280; height = 400;
    } else if (appType === AppType.FOLDER && data?.folderPath === '/My Documents') {
        width = 700; height = 550;
    }

    const newWindow: WindowInstance = {
      id: newWindowId,
      appType,
      title,
      x: Math.random() * (window.innerWidth / 2 - width / 2) + 20,
      y: Math.random() * (window.innerHeight / 2 - height / 2 - TASKBAR_HEIGHT) + 20,
      width: width,
      height: height,
      zIndex: nextZIndex,
      isMinimized: false,
      isActive: true,
      isMaximized: false,
      icon: getAppIcon(appType),
      data: data,
    };
    setWindows(prev => [...prev.map(w => ({...w, isActive: false})), newWindow]);
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(newWindowId);
  }, [nextZIndex, getAppIcon]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
        const otherWindows = windows.filter(w => w.id !== id && !w.isMinimized);
        if (otherWindows.length > 0) {
            const topWindow = otherWindows.sort((a,b) => b.zIndex - a.zIndex)[0];
            setActiveWindowId(topWindow.id);
             // Explicitly focus the next top window
            setWindows(currentWindows => currentWindows.map(win => win.id === topWindow.id ? {...win, isActive: true, zIndex: nextZIndex} : win));
            setNextZIndex(prev => prev + 1);
        } else {
            setActiveWindowId(null);
        }
    }
  }, [activeWindowId, windows, nextZIndex]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true, isActive: false } : w)));
     if (activeWindowId === id) {
        const otherWindows = windows.filter(w => w.id !== id && !w.isMinimized);
        if (otherWindows.length > 0) {
            const topWindow = otherWindows.sort((a,b) => b.zIndex - a.zIndex)[0];
            setActiveWindowId(topWindow.id);
             setWindows(currentWindows => currentWindows.map(win => win.id === topWindow.id ? {...win, isActive: true, zIndex: nextZIndex} : win));
             setNextZIndex(prev => prev + 1);
        } else {
            setActiveWindowId(null);
        }
    }
  }, [activeWindowId, windows, nextZIndex]);

  const focusWindow = useCallback((id: string) => {
    const windowToFocus = windows.find(w => w.id === id);
    if (!windowToFocus || (windowToFocus.isActive && !windowToFocus.isMinimized)) return;

    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, zIndex: nextZIndex, isMinimized: false, isActive: true }
          : { ...w, isActive: false }
      )
    );
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  }, [windows, nextZIndex]);

  const handleTaskbarButtonClick = useCallback((id: string) => {
    const win = windows.find(w => w.id === id);
    if (win) {
      if (win.isMinimized || !win.isActive) {
        focusWindow(id);
      } else { 
        if (win.id === activeWindowId && !win.isMinimized) { // If it's already active and not minimized, minimize it
            minimizeWindow(id);
        } else { // Otherwise, focus it (handles case where it's not active but also not minimized)
            focusWindow(id);
        }
      }
    }
  }, [windows, focusWindow, minimizeWindow, activeWindowId]);

  const toggleMaximizeWindow = useCallback((id: string) => {
    setWindows(prevWindows => prevWindows.map(w => {
        if (w.id === id) {
            if (w.isMaximized) { // Restore
                return {
                    ...w,
                    x: w.originalRect?.x ?? w.x,
                    y: w.originalRect?.y ?? w.y,
                    width: w.originalRect?.width ?? w.width,
                    height: w.originalRect?.height ?? w.height,
                    isMaximized: false,
                    originalRect: undefined,
                    isActive: true,
                    zIndex: nextZIndex
                };
            } else { // Maximize
                return {
                    ...w,
                    originalRect: { x: w.x, y: w.y, width: w.width, height: w.height },
                    x: 0,
                    y: 0,
                    width: window.innerWidth, // Will be visually constrained by CSS calc for taskbar
                    height: window.innerHeight - TASKBAR_HEIGHT,
                    isMaximized: true,
                    isActive: true,
                    zIndex: nextZIndex
                };
            }
        }
        return {...w, isActive: w.id === id}; // Ensure other windows are not active if this one is
    }));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id); // Ensure the (un)maximized window is active
  }, [nextZIndex]);

  const handleUpdateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prevWindows => prevWindows.map(w => 
        w.id === id ? { ...w, x, y } : w
    ));
  }, []);


  const handleDesktopIconDoubleClick = useCallback((iconData: DesktopIconItem) => {
    openWindow(iconData.appType, iconData.label, iconData.data);
  }, [openWindow]);
  
  const handleEmptyRecycleBin = useCallback(() => {
    setDeletedItems([]);
    // Icon update is handled by useEffect on deletedItems.length
  }, []);


  const handleDesktopIconContextMenu = useCallback((event: React.MouseEvent, iconData: DesktopIconItem) => {
    const items: ContextMenuItem[] = [
      { label: 'Open', onClick: () => openWindow(iconData.appType, iconData.label, iconData.data), icon: getAppIcon(iconData.appType, "w-4 h-4 mr-1") },
    ];
     if (iconData.appType === AppType.RECYCLE_BIN) {
        items.push({ label: 'Empty Recycle Bin', onClick: handleEmptyRecycleBin, disabled: deletedItems.length === 0 });
    }
    items.push({ isSeparator: true });
    items.push({ label: 'Properties', onClick: () => alert(`Properties for ${iconData.label} (placeholder)`) });
    
    showContextMenu(event, items);
  }, [openWindow, showContextMenu, deletedItems.length, getAppIcon, handleEmptyRecycleBin]);


  const handleDesktopContextMenu = useCallback((event: React.MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest('.desktop-icon-button-wrapper') || targetElement.closest('.fixed.y2k-raised.shadow-lg')) return; // Ignore on icons or context menu itself

    const items: ContextMenuItem[] = [
      { label: 'Arrange Icons By', onClick: () => alert('Arrange Icons (placeholder)') },
      { label: 'Refresh', onClick: () => window.location.reload() }, 
      { isSeparator: true },
      { 
        label: 'CD-ROM Drive', 
        onClick: () => openWindow(AppType.CD_PLAYER, 'CD Player'),
        icon: getAppIcon(AppType.CD_PLAYER, "w-4 h-4 mr-1")
      },
      { isSeparator: true },
      { label: 'New', onClick: () => alert('New Folder/File (placeholder)') },
      { isSeparator: true },
      { label: 'Properties (Display Settings)', onClick: () => openWindow(AppType.SETTINGS, 'Display Properties'), icon: getAppIcon(AppType.SETTINGS, "w-4 h-4 mr-1") },
    ];
    showContextMenu(event, items);
  }, [showContextMenu, openWindow, getAppIcon]);

  const handleChangeWallpaper = useCallback((wallpaper: Wallpaper) => {
    setCurrentWallpaper(wallpaper);
  }, []);

  const handleExitScreensaver = useCallback(() => {
    setIsScreenSaverActive(false);
    resetIdleTimer();
  }, [resetIdleTimer]);
  
  const handleRestoreRecycleBinItem = (id: string) => {
    alert(`Restoring ${id} (placeholder)`);
    const newDeletedItems = deletedItems.filter(item => item.id !== id);
    setDeletedItems(newDeletedItems);
    // Icon update handled by useEffect
  };

  useEffect(() => {
    if(deletedItems.length === 0 && Math.random() < 0.05){ // Reduced frequency for demo
        const mockDeleted = [ {id: 'deleted-file-1', name: 'Old Report.doc'}, {id: 'deleted-file-2', name: 'My Secret Plan.txt'}];
        setDeletedItems(mockDeleted);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    setDesktopIcons(prevIcons => prevIcons.map(icon => {
        if (icon.id === 'recycle-bin') {
            const iconClasses = (icon.icon?.props?.className) || "w-8 h-8"; 
            return {...icon, icon: getAppIcon(AppType.RECYCLE_BIN, iconClasses)};
        }
        return icon;
    }));
  }, [deletedItems.length, getAppIcon]);


  const wallpaperStyle = useMemo(() => {
    return currentWallpaper.startsWith('#')
      ? { backgroundColor: currentWallpaper, cursor: currentCursor }
      : { backgroundImage: `url(${currentWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: currentCursor };
  }, [currentWallpaper, currentCursor]);


  if (bootPhase !== BootPhase.DONE) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden" 
      style={wallpaperStyle}
      onContextMenu={handleDesktopContextMenu}
      onClick={hideContextMenu} 
    >
      <div className="relative w-full h-full">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            iconData={icon}
            onDoubleClick={handleDesktopIconDoubleClick}
            onContextMenu={handleDesktopIconContextMenu}
            isSelected={false} 
          />
        ))}
      </div>

      {windows.map((win) => (
        <WindowComponent
          key={win.id}
          window={win}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={focusWindow}
          onToggleMaximize={toggleMaximizeWindow}
          onUpdatePosition={handleUpdateWindowPosition}
        >
          {win.appType === AppType.NOTEPAD && <NotepadApp />}
          {win.appType === AppType.SETTINGS && <SettingsApp currentWallpaper={currentWallpaper} onChangeWallpaper={handleChangeWallpaper} currentScreensaver={currentScreensaverType} onChangeScreensaver={setCurrentScreensaverType} currentCursor={currentCursor} onChangeCursor={setCurrentCursor}/>}
          {win.appType === AppType.RECYCLE_BIN && <RecycleBinApp deletedItems={deletedItems} onEmptyRecycleBin={handleEmptyRecycleBin} onRestoreItem={handleRestoreRecycleBinItem} />}
          {win.appType === AppType.FOLDER && <FolderApp folderPath={win.data?.folderPath || '/'} contents={MOCK_FILE_SYSTEM} />}
          {win.appType === AppType.CALCULATOR && <CalculatorApp />}
          {win.appType === AppType.MINESWEEPER && <GamePlaceholderApp gameName="Minesweeper" />}
          {win.appType === AppType.CD_PLAYER && <CDPlayerApp />}
        </WindowComponent>
      ))}

      <Taskbar 
        windows={windows} 
        onTaskbarButtonClick={handleTaskbarButtonClick}
        onStartButtonClick={() => alert("Start Menu clicked (placeholder)!")}
        activeWindowId={activeWindowId}
      />
      
      <ContextMenu menuState={contextMenuState} onClose={hideContextMenu} />
      
      <ScreenSaver active={isScreenSaverActive} type={currentScreensaverType} onExit={handleExitScreensaver} />
    </div>
  );
};

export default App;