import skillsData from '../data/skills.json';

export default function Expertise() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Expertise & Skills</h1>
      <div className="space-y-10">
        {skillsData.categories.map((category: any) => (
          <div key={category.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{category.name}</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {category.skills.map((skill: any) => (
                <li key={skill.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                  <span className="font-semibold text-gray-700">{skill.name}</span>
                  <span className="text-sm text-cyan-700 bg-cyan-100 px-2 py-1 rounded">{skill.level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
