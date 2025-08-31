import React from "react";

const About = () => {
  const experienceLevels = [
    {
      level: "Junior Developer",
      years: "0-2 Years",
      description:
        "Building foundational skills in modern web technologies and best practices.",
      skills: ["HTML/CSS", "JavaScript", "React Basics", "Version Control"],
      color: "from-green-500 to-blue-500",
    },
    {
      level: "Mid-Level Developer",
      years: "2-4 Years",
      description:
        "Creating full-stack applications with advanced frameworks and databases.",
      skills: [
        "Full-Stack Development",
        "API Design",
        "Database Management",
        "Testing",
      ],
      color: "from-blue-500 to-purple-500",
    },
    {
      level: "Senior Developer",
      years: "4+ Years",
      description:
        "Leading complex projects and mentoring teams with cutting-edge technologies.",
      skills: [
        "Architecture Design",
        "Team Leadership",
        "DevOps",
        "Performance Optimization",
      ],
      color: "from-purple-500 to-pink-500",
    },
  ];

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "💻",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      description: "Building responsive and interactive user interfaces",
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: ["Node.js", "Express.js", "Python", "MongoDB"],
      description: "Creating robust server-side applications and APIs",
    },
    {
      title: "DevOps & Cloud",
      icon: "☁️",
      skills: ["AWS", "Docker", "CI/CD", "Git"],
      description: "Deploying and maintaining scalable applications",
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: ["VS Code", "Postman", "Figma", "Jest"],
      description: "Essential tools for modern development workflow",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 mb-6">
            <span className="text-sm font-medium text-blue-400">About Me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Crafting Digital
            </span>
            <br />
            <span className="text-gray-300">Experiences</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with a love for creating
            exceptional digital experiences. With expertise in modern web
            technologies, I transform ideas into scalable, user-centric
            applications that make a real impact.
          </p>
        </div>

        {/* Experience Journey */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-200">
            My Development Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experienceLevels.map((exp, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${exp.color} mb-4`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {exp.level}
                    </h4>
                    <p className="text-sm text-blue-400 font-medium">
                      {exp.years}
                    </p>
                  </div>
                  <p className="text-gray-300 text-center mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="space-y-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} mr-3`}
                        ></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Technical Expertise
              </span>
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {category.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg px-3 py-2 text-sm text-gray-300 text-center"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-200">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's collaborate on your next project and bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/Projects"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 border-2 border-gray-600 rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
