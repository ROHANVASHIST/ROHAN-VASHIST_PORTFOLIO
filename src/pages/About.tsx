import profileData from '../data/profile.json';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Me</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Education</h2>
        <div className="border-l-4 border-cyan-600 pl-4">
          <h3 className="text-xl font-semibold text-gray-800">{profileData.education.degree}</h3>
          <p className="text-gray-600">{profileData.education.institution}</p>
          <p className="text-sm text-gray-500">{profileData.education.graduationYear}</p>
        </div>
      </section>
      
      <a href="/resume.pdf" download className="mt-8 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 inline-block">
        Download Resume
      </a>
    </main>
  );
}
