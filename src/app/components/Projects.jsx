"use client";
import { useState } from "react";
import TechIcons from "./TechIcons";
import ProjectCard from "./ProjectCard";
import projectsData from "../data/projects.json";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredProjects = activeFilter
    ? projectsData.filter((project) =>
        project.technologies.includes(activeFilter)
      )
    : projectsData;

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
        <TechIcons
          onFilterClick={(tech) =>
            setActiveFilter(activeFilter === tech ? null : tech)
          }
          activeFilter={activeFilter}
        />
        <div className="space-y-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              isEven={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
