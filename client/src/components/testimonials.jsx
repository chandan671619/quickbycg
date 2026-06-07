import React from "react";

const Testimonials = () => {
  const testimonials = [
  {
    name: "Parag",
    role: "Frontend Engineer & Network Engineer",
    text: "QuickAI enabled us to build responsive and scalable user interfaces with ease. The platform's performance and reliability helped streamline our frontend development and network integration workflows."
  },
  {
    name: "Kashish",
    role: "Product Engineer & Startup Founder",
    text: "As a startup founder, QuickAI accelerated product development and innovation. Its AI-powered tools helped transform ideas into production-ready solutions much faster."
  },
  {
    name: "Chandan",
    role: "Backend Developer, Cloud Engineer & Database Engineer",
    text: "QuickAI simplified backend architecture, cloud deployment, and database management. It allowed us to build secure, scalable, and high-performance systems efficiently."
  }
];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Developers of QuickAI.
          </h2>
          <p className="text-gray-500 mt-3">
            Meet the talented team behind QuickAI, dedicated to building innovative AI tools that empower creators and businesses to generate, edit, and enhance content with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <p className="text-gray-600 mb-6">
                "{testimonial.text}"
              </p>

              

                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;