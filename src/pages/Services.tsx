import servicesData from '../data/services.json';

export default function Services() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">My Services</h1>
      <div className="grid gap-8">
        {servicesData.services.map((service: any) => (
          <div key={service.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <h3 className="font-semibold text-gray-800 mb-2">Deliverables:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {service.deliverables.map((item: string) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
