import React, { useState } from 'react';
import { FileIconSvg, FolderIconSvg } from '../../constants';
import { PortfolioAppSectionType } from '../../types';

// Import Portfolio Sections
import HomeSection from './PortfolioSections/HomeSection';
import AboutSection from './PortfolioSections/AboutSection';
import ProjectsSection from './PortfolioSections/ProjectsSection';
import ContactSection from './PortfolioSections/ContactSection';
import CVSection from './PortfolioSections/CVSection';


interface FolderAppProps {
  folderPath: string;
  contents: any; // Simplified: object representing folder structure for non-portfolio paths
}

const PortfolioNavigation: React.FC<{activeSection: PortfolioAppSectionType, onNavigate: (section: PortfolioAppSectionType) => void}> = ({ activeSection, onNavigate }) => {
  const navItems: { id: PortfolioAppSectionType; label: string }[] = [
    { id: 'home', label: 'HomeBase' },
    { id: 'about', label: 'Intel (About)' },
    { id: 'projects', label: 'My Creations' },
    { id: 'contact', label: 'Ping Me!' },
    { id: 'cv', label: 'The Resume.doc' },
  ];

  return (
    <div className="flex flex-wrap justify-center space-x-1 p-1 y2k-raised bg-gray-300 mb-1">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`y2k-button text-xs px-2 py-1 my-0.5 ${activeSection === item.id ? 'y2k-sunken bg-gray-400 font-bold' : 'hover:bg-gray-100'}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};


const FolderApp: React.FC<FolderAppProps> = ({ folderPath, contents }) => {
  const [activePortfolioSection, setActivePortfolioSection] = useState<PortfolioAppSectionType>('home');
  
  // Helper to navigate the mock file system for generic folders
  const getFolderContents = (path: string, fs: any) => {
    const parts = path.split('/').filter(p => p);
    let current = fs['/']; // Assuming root is always '/'
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return {}; // Path not found
      }
    }
    return current;
  };
  
  // Special handling for "My Documents" as the portfolio
  if (folderPath === '/My Documents') {
    let sectionContent;
    switch (activePortfolioSection) {
      case 'home': sectionContent = <HomeSection />; break;
      case 'about': sectionContent = <AboutSection />; break;
      case 'projects': sectionContent = <ProjectsSection />; break;
      case 'contact': sectionContent = <ContactSection />; break;
      case 'cv': sectionContent = <CVSection />; break;
      default: sectionContent = <p>Select a section</p>;
    }

    return (
      <div className="flex flex-col h-full bg-gray-200"> {/* Changed background for portfolio view */}
        <div className="p-1 border-b y2k-raised bg-gray-300 flex items-center">
          <span className="text-xs font-bold mr-2">Location:</span>
          <input type="text" readOnly value={`My Computer > My Documents > ${activePortfolioSection.charAt(0).toUpperCase() + activePortfolioSection.slice(1)}`} className="flex-grow y2k-sunken px-1 text-xs" />
        </div>
        <PortfolioNavigation activeSection={activePortfolioSection} onNavigate={setActivePortfolioSection} />
        <div className="flex-grow overflow-y-auto y2k-sunken bg-white"> {/* Content area for sections */}
          {sectionContent}
        </div>
      </div>
    );
  }

  // Original folder browsing logic for other paths
  const currentFolderItems = getFolderContents(folderPath, contents);

  return (
    <div className="flex flex-col h-full bg-white p-1">
      <div className="p-1 border-b y2k-raised bg-gray-300 flex items-center">
        <span className="text-xs font-bold mr-2">Address:</span>
        <input type="text" readOnly value={folderPath} className="flex-grow y2k-sunken px-1 text-xs" />
      </div>
      <div className="flex-grow overflow-y-auto p-2 y2k-sunken mt-1">
        {typeof currentFolderItems === 'object' && Object.keys(currentFolderItems).length > 0 ? (
          <ul className="space-y-1">
            {Object.entries(currentFolderItems).map(([name, item]) => (
              <li key={name} className="flex items-center p-1 hover:bg-blue-100 cursor-pointer" onDoubleClick={() => alert(`Double clicked ${name}. Deeper navigation for generic folders not fully implemented beyond this view.`)}>
                {typeof item === 'object' ? 
                  React.cloneElement(FolderIconSvg, {className: "w-5 h-5 mr-2"}) : 
                  React.cloneElement(FileIconSvg, {className: "w-5 h-5 mr-2"})
                }
                <span className="text-sm">{name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">This folder is empty or contains non-browseable content.</p>
        )}
         {typeof currentFolderItems === 'string' && (
            <div className="p-2 text-sm whitespace-pre-wrap">{currentFolderItems}</div>
        )}
      </div>
    </div>
  );
};

export default FolderApp;