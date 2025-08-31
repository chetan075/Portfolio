import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      demo: "YourWebsite.com",
      image:
        "https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png",
    },
    {
      title: "SaaS Dashboard",
      description:
        "A customizable and data-driven dashboard for businesses to manage workflows and analytics efficiently.",
      techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
      features: [
        "Data visualization",
        "Authentication",
        "Role-based access control",
        "Real-time updates",
      ],
      challenges:
        "Integrated WebSockets for real-time data synchronization, improving user experience.",
      github: "https://YourGitHubRepo",
      image:
        "https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png",
    },
    {
      title: "Social Media App",
      description:
        "A real-time social networking application that allows users to post, comment, and interact with others.",
      techStack: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js"],
      features: [
        "JWT authentication",
        "Live notifications",
        "Real-time chat",
        "Multimedia uploads",
      ],
      challenges:
        "Implemented scalable backend architecture to support high user traffic.",
      demo: "https://YourWebsite.com",
      image:
        "https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png",
    },
  ];

  return (
    <div className="bg-gray-900 text-amber-50">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 lg:px-20">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center lg:text-left mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl mb-4 text-purple-700">
              {index + 1}. {project.title}
            </h3>

            <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-20">
              <motion.div
                className="order-2 lg:order-1 lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="my-4 text-base md:text-lg lg:text-xl">
                  {project.description}
                </p>
                <div className="mb-4">
                  <strong className="text-lg">Tech Stack:</strong>
                  <ul className="list-disc pl-5 mt-2 text-base md:text-lg">
                    {project.techStack.map((tech, techIndex) => (
                      <li key={techIndex}>{tech}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <strong className="text-lg">Features:</strong>
                  <ul className="list-disc pl-5 mt-2 text-base md:text-lg">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <strong className="text-lg">Challenges & Solutions:</strong>
                  <p className="mt-2 text-base md:text-lg">
                    {project.challenges}
                  </p>
                </div>
                {project.demo && (
                  <div className="mb-4">
                    <strong className="text-lg">Live Demo:</strong>
                    <a
                      href={`https://${project.demo}`}
                      className="text-amber-300 hover:underline ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.demo}
                    </a>
                  </div>
                )}
                {project.github && (
                  <div>
                    <strong className="text-lg">GitHub:</strong>
                    <a
                      href={project.github}
                      className="text-amber-300 hover:underline ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YourGitHubRepo
                    </a>
                  </div>
                )}
              </motion.div>
              <motion.div
                className="order-1 lg:order-2 lg:w-1/2 flex justify-center mb-6 lg:mb-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full max-w-lg">
                  <Image
                    alt={`${project.title} screenshot`}
                    src={project.image}
                    width={1824}
                    height={1080}
                    className="w-full h-auto rounded-md bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
