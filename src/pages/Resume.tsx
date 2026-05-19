import resumeData from '../data/resume.json';

export default function Resume() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Resume</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Experience</h2>
        {resumeData.experience.map((exp: any) => (
          <div key={exp.company} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{exp.role} @ {exp.company}</h3>
            <p className="text-gray-600 italic">{exp.period}</p>
            <p className="text-gray-700 mt-2">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Education</h2>
        {resumeData.education.map((edu: any) => (
          <div key={edu.institution} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
            <p className="text-gray-700">{edu.institution} ({edu.year})</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill: string) => (
            <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
