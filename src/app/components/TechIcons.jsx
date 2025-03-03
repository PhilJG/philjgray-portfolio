import {
  FaReact,
  FaNodeJs,
  FaVuejs,
  FaPython,
  FaJava,
  FaPhp,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiJavascript,
} from "react-icons/si";

import { TbBrandOauth } from "react-icons/tb";

const iconComponents = {
  react: FaReact,
  nodejs: FaNodeJs,
  vuejs: FaVuejs,
  python: FaPython,
  java: FaJava,
  php: FaPhp,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  javascript: SiJavascript,
  oauth: TbBrandOauth,
};

export default function TechIcons({
  technologies,
  onFilterClick,
  activeFilter,
}) {
  return (
    <div className="flex flex-wrap justify-left gap-4 mb-8">
      {Object.entries(iconComponents)
        .filter(([tech]) => technologies && technologies.includes(tech))
        .map(([tech, Icon]) => (
          <div
            key={tech}
            onClick={() => onFilterClick(tech)}
            className={`pl-2 rounded-full transition-colors duration-200 ${
              activeFilter === tech
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground  "
            }`}
            title={tech}
          >
            <Icon size={24} />
          </div>
        ))}
    </div>
  );
}
