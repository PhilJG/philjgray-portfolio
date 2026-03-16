import projectData from "../../data/neuroprojection.json";

export async function generateMetadata({ params }) {
  // For now, only handle neuroprojection
  if (params.slug === "neuroprojection") {
    return {
      title: projectData.meta.title,
      description: projectData.meta.description,
      openGraph: {
        title: projectData.meta.title,
        description: projectData.meta.description,
        images: [projectData.meta.ogImage],
      },
    };
  }
  return {
    title: "Project Not Found | Phil J Gray",
    description: "The requested project could not be found.",
  };
}

export default function ProjectLayout({ children }) {
  return children;
}

