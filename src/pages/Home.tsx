import profileData from '../data/profile.json';

export default function Home() {
  return (
    <main>
      <section 
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative" 
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/profile.jpg)' }}
      >
        <div className="text-center p-6 text-white">
          <h1 className="text-5xl font-bold">{profileData.name}</h1>
          <p className="text-xl mt-4">{profileData.headline}</p>
          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
              Explore My Work
            </button>
            <button className="px-8 py-3 bg-white/20 text-white backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30">
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
