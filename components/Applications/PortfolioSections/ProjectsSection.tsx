import React from 'react';
import { PortfolioProject } from '../../../types';

const userProjects: PortfolioProject[] = [
  {
    id: 'cow-heat',
    title: 'Cow Heat Tracking System (Current Focus)',
    // imageUrl: 'https://picsum.photos/seed/cowproject/300/200', // Placeholder if no image
    description: 'An innovative system for monitoring and tracking heat cycles in cattle, aimed at improving farm efficiency. Currently under active development.',
    technologies: ['TypeScript', 'Agricultural Tech', 'Data Analysis (Ongoing)'],
    // liveLink: '#', // No live link yet
    // repoLink: '#', // Add if available
  },
  {
    id: 'matrix-page',
    title: 'Matrix Loading Page',
    imageUrl: 'https://picsum.photos/seed/matrixapp/300/200', // Replace with actual screenshot if possible, or keep placeholder
    description: 'A visually engaging loading screen experience inspired by "The Matrix". Reload and feel the nostalgia!',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveLink: 'https://matrixreloaded.netlify.app/',
    // repoLink: 'https://github.com/Joshuawayne/The-matrix-loading-screen', // Example, update if correct
  },
  {
    id: 'fashion-magazine',
    title: 'Avant Magazine',
    imageUrl: 'https://picsum.photos/seed/fashionapp/300/200', // Replace with actual screenshot if possible
    description: 'A sleek and stylish online fashion magazine site, showcasing modern web design.',
    technologies: ['Web Design', 'HTML', 'CSS', 'JavaScript'], // Assuming tech stack
    liveLink: 'https://avantmagazine.netlify.app/',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    // imageUrl: 'https://picsum.photos/seed/weatherapp/300/200',
    description: 'A practical application to check weather forecasts. Built with Blade.',
    technologies: ['Blade', 'PHP', 'Python', 'APIs'], // Assumed tech based on "Blade"
    // repoLink: 'https://github.com/Joshuawayne/weather-app', // Example
  },
   {
    id: 'mazao-app',
    title: 'Mazao App',
    // imageUrl: 'https://picsum.photos/seed/mazaoapp/300/200',
    description: 'A project related to produce and  farming (Mazao often means "produce" or "crops" in Swahili). This involves TypeScript.',
    technologies: ['TypeScript', 'React'],
    // repoLink: 'https://github.com/Joshuawayne/mazao', 
  }
];


const ProjectsSection: React.FC = () => {
  return (
    <div className="p-4 space-y-6 text-sm overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">My Digital Creations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userProjects.map(project => (
          <div key={project.id} className="y2k-raised bg-gray-100 p-3 flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-blue-700">{project.title}</h3>
            {project.imageUrl && (
              <div className="w-full h-32 y2k-sunken bg-gray-300 mb-2">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-xs flex-grow">{project.description}</p>
            <div>
              <strong className="text-xs">Technologies:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 y2k-button border-blue-400">{tech}</span>
                ))}
              </div>
            </div>
            <div className="flex space-x-2 pt-2 border-t border-gray-400">
              {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="y2k-button text-xs bg-green-500 hover:bg-green-600 text-white">View Live</a>}
              {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="y2k-button text-xs bg-gray-500 hover:bg-gray-600 text-white">View Code</a>}
              {!project.liveLink && !project.repoLink && project.id === 'cow-heat' && <span className="text-xs text-gray-500 italic">Currently in Development</span>}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-gray-500 mt-4">Some project images are placeholders for this Y2K demo. Click 'View Live' for actual sites!</p>
    </div>
  );
};

export default ProjectsSection;
