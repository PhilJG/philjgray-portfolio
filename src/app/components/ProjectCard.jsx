import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import TechIcons from "./TechIcons";

export default function ProjectCard({ project, isEven }) {
  const hasDetailPage = project.hasDetailPage && project.slug;
  const detailPageUrl = hasDetailPage ? `/projects/${project.slug}` : null;

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2">
        {hasDetailPage ? (
          <Link href={detailPageUrl} className="block">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="rounded-lg shadow-lg hover:opacity-90 transition-opacity cursor-pointer object-contain"
            />
          </Link>
        ) : (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-contain"
          />
        )}
      </div>
      <div className="w-full md:w-1/2">
        <div>
          {hasDetailPage ? (
            <Link href={detailPageUrl}>
              <h3 className="text-2xl font-bold mb-4 text-foreground hover:text-primary transition-colors cursor-pointer">
                {project.title}
              </h3>
            </Link>
          ) : (
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {project.title}
            </h3>
          )}
          <TechIcons technologies={project.technologies} />
        </div>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex gap-4 mb-4 flex-wrap">
          {hasDetailPage && (
            <Link
              href={detailPageUrl}
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              View case study <FaArrowRight />
            </Link>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-2 items-center gap-2 text-primary hover:text-primary/80"
            >
              <FaGithub />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-2 items-center gap-2 text-primary hover:text-primary/80"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
