import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import TechIcons from "./TechIcons";

export default function ProjectCard({ project, isEven }) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          objectFit="contain"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            {project.title}
          </h3>
          <TechIcons technologies={project.technologies} />
        </div>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex gap-4 mb-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-2 items-center gap-2 text-primary hover:text-primary/80"
          >
            <FaGithub />
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-2 items-center gap-2 text-primary hover:text-primary/80"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}
