import skillsData from '../data/skills.json';

export default function Expertise() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">Expertise & Skills</h1>
      <div className="space-y-10">
        {skillsData.categories.map((category: any) => (
          <div key={category.name} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-800 pb-2">{category.name}</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {category.skills.map((skill: any) => (
                <li key={skill.name} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
                  <span className="text-sm text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30 px-2 py-1 rounded-lg">{skill.level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
