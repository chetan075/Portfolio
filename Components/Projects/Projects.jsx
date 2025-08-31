import React from "react";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A fully functional online marketplace with secure payment gateways, user authentication, and an intuitive shopping experience.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
      features: [
        "User authentication",
        "Cart management",
        "Admin dashboard",
        "Order tracking",
        "Real-time notifications",
      ],
      challenges:
        "Implemented optimized database queries to enhance performance and scalability.",
      demo: "https://example-ecommerce.com",
      github: "https://github.com/chetan075/ecommerce-platform",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      category: "Full-Stack",
      duration: "3 months",
      status: "Completed",
    },
    {
      title: "Task Management SaaS",
      description:
        "A customizable and data-driven dashboard for businesses to manage workflows and analytics efficiently.",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS", "Chart.js"],
      features: [
        "Data visualization",
        "Authentication",
        "Role-based access control",
        "Real-time updates",
      ],
      challenges:
        "Integrated WebSockets for real-time data synchronization, improving user experience.",
      github: "https://github.com/chetan075/task-management-saas",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      category: "Frontend",
      duration: "2 months",
      status: "Completed",
    },
    {
      title: "Social Media Platform",
      description:
        "A real-time social networking application that allows users to post, comment, and interact with others.",
      techStack: [
        "MERN Stack",
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Socket.io",
      ],
      features: [
        "JWT authentication",
        "Live notifications",
        "Real-time chat",
        "Multimedia uploads",
      ],
      challenges:
        "Implemented scalable backend architecture to support high user traffic.",
      demo: "https://example-social-app.com",
      github: "https://github.com/chetan075/social-media-platform",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=300&fit=crop",
      category: "Full-Stack",
      duration: "4 months",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6">
            <span className="text-sm font-medium text-blue-400">Portfolio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work, demonstrating expertise in modern web
            development technologies and problem-solving capabilities.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  alt={`${project.title} screenshot`}
                  src={project.image}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600/90 text-white text-sm rounded-full font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-600/90 text-white text-sm rounded-full font-medium">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {project.duration}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 text-xs rounded-lg border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-lg">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Key Features:
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {project.features
                      .slice(0, 2)
                      .map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 border border-gray-600 text-gray-300 text-sm font-medium rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-2xl p-12">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-200">
            Have a Project in Mind?
          </h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and bring innovative
            ideas to life. Let's discuss your next project!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/Contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Start a Conversation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <a
              href="mailto:chetan@example.com"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 border-2 border-gray-600 rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
