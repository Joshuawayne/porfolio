import React from 'react';

const skills = [
  { name: "React", level: 90, icon: "⚛️" },
  { name: "Next.js", level: 70, icon: "🚀" },
  { name: "Three.js", level: 60, icon: "🧊" },
  { name: "TypeScript", level: 85, icon: "TS" },
  { name: "Node.js", level: 75, icon: "⚙️" },
  { name: "HTML & CSS (Web Design)", level: 95, icon: "🎨" },
  { name: "Web Development (General)", level: 90, icon: "💻" },
  { name: "Gemini API", level: 65, icon: "✨" }, // Keeping as it might be part of the OS context
];

const education = [
  { degree: "M.S. in Computer Science", school: "University of Digital Arts (Conceptual)", year: "2002" },
  { degree: "B.S. in Web Design", school: "Pixel Perfect Institute (Conceptual)", year: "1999" },
];

const certifications = [
  { name: "Certified Y2K Bug Exterminator", issuer: "Retro Certs Inc.", year: "2000" },
  { name: "Advanced JavaScript Ninja", issuer: "Code Dojo", year: "2001" },
];

const AboutSection: React.FC = () => {
  return (
    <div className="p-4 space-y-6 text-sm overflow-y-auto h-full">
      <section className="y2k-raised bg-gray-50 p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">My Digital Odyssey</h2>
        <p className="mb-2">
          My journey into the tech world started with a curiosity for web design and development, which has grown into a full-fledged passion.
          Currently, I'm channeling this passion into developing a <strong className="text-green-700">Cow Heat Tracking System</strong>, aiming to bring innovative solutions to the agricultural field.
        </p>
        <p className="mb-2">
          I'm always eager to learn and expand my skillset. Right now, I’m diving deeper into <strong className="text-purple-600">Next.js</strong> and exploring the 3D world with <strong className="text-purple-600">Three.js</strong>.
          I'm particularly interested in collaborating on projects in the agricultural sector and am always open to learning more about <strong className="text-orange-500">data analysis</strong>.
        </p>
        <p>
          Feel free to ask me anything about web design or web development!
        </p>
      </section>

      <section className="y2k-raised bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-purple-600 mb-3">Skills & Expertise</h3>
        <div className="space-y-3">
          {skills.map(skill => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.icon} {skill.name}</span>
                <span className="text-xs text-gray-600">{skill.level}% Learning/Proficient</span>
              </div>
              <div className="w-full y2k-sunken bg-gray-300 h-4 p-0.5">
                <div className="bg-green-500 h-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="y2k-raised bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-green-600 mb-3">Education (Conceptual)</h3>
        <ul className="list-disc list-inside space-y-1">
          {education.map(edu => (
            <li key={edu.degree}>{edu.degree} - <span className="font-medium">{edu.school}</span> ({edu.year})</li>
          ))}
        </ul>
      </section>

      <section className="y2k-raised bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-orange-500 mb-3">Certifications (Conceptual)</h3>
         <ul className="list-disc list-inside space-y-1">
          {certifications.map(cert => (
            <li key={cert.name}>{cert.name} - <span className="font-medium">{cert.issuer}</span> ({cert.year})</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AboutSection;