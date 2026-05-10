"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navigation from "../../components/Navigation";
import VisualizationTabs from "../../components/VisualizationTabs";
import projectData from "../../data/neuroprojection.json";

const showNeurotree = process.env.NEXT_PUBLIC_SHOW_NEUROTREE === "true";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [attendForm, setAttendForm] = useState({ name: "", email: "" });
  const [attendSubmitting, setAttendSubmitting] = useState(false);
  const [attendMessage, setAttendMessage] = useState("");

  const handleAttendChange = (e) => {
    const { name, value } = e.target;
    setAttendForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttendSubmit = async (e) => {
    e.preventDefault();
    setAttendSubmitting(true);
    setAttendMessage("");
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/me@philjgray.ca",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...attendForm,
            message:
              "Neuroprojection events signup — please add me to the mailing list.",
          }),
        },
      );
      if (response.ok) {
        setAttendMessage("You're on the list. We'll be in touch.");
        setAttendForm({ name: "", email: "" });
      } else {
        setAttendMessage("Something went wrong. Please try again.");
      }
    } catch {
      setAttendMessage("Something went wrong. Please try again.");
    } finally {
      setAttendSubmitting(false);
    }
  };

  useEffect(() => {
    if (params.slug !== "neuroprojection") {
      router.push("/");
    }
  }, [params.slug, router]);

  if (params.slug !== "neuroprojection") {
    return null;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation hideBrand />

      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={projectData.hero.poster}
          aria-label={projectData.hero.alt}
        >
          <source src={projectData.hero.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {projectData.title}
            </h1>
            {/* <p className="text-xl md:text-2xl sm:p-4 mb-6 text-white/90">
              {projectData.summary}
            </p> */}
            <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
              An ongoing body of work exploring what becomes possible when
              internal mental states are made visible in shared space. Using
              consumer EEG technology and real-time generative visuals, the work
              translates a meditator&apos;s brainwave activity into projected
              environments that a room full of people can witness
              simultaneously.
            </p>
          </div>
        </div>
      </section>

      {/* Visualizations */}
      <section className="mt-20 mb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-0">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Visualizations
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-8">
            These visualizations use the Muse EEG headset, a consumer device
            which has been validated in clinical settings to measure brainwave
            activity in real time. The algorithmic interpretation of that data
            however has not been clinically validated and is not without its
            issues and edge cases. The audience feedback has been positive and
            given the impression that this approach is on the right track but
            that is still only anecdotal. A neuroscience advisor is being
            brought on specifically to interrogate and improve the signal logic.
            That process of refinement is an ongoing part of the development.
          </p>

          <VisualizationTabs>
            <VisualizationTabs.Tab
              id="neuroaurora"
              title="Neuroaurora"
              iconSrc="/portfolio/neuroprojection/icons/neuroaurora-icon.svg"
              videoSrc="/portfolio/neuroprojection/videos/neuroprojection-1.mp4"
              videoPoster="/portfolio/neuroprojection/hero.jpg"
            >
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Neuroaurora makes mindfulness meditation visible to others in
                  real time. The display gives the meditator external
                  confirmation of something they could previously only sense
                  internally, while the audience gains access to something that
                  has always been invisible. The exchange between the two is
                  where the experience becomes complete.
                </p>
                <p>
                  In this session the meditator is working toward something, and
                  the audience can see whether they are getting there or not.
                  The challenge is to reach the state without craving it and
                  remain present without grasping for the result or pushing away
                  distraction rather than let it pass. Unlike most things
                  performed in front of an audience, it cannot be faked. The
                  display is indifferent to effort and expression. Either the
                  mind stills or it doesn&apos;t.
                </p>
              </div>
            </VisualizationTabs.Tab>

            <VisualizationTabs.Tab
              id="neuropaint"
              title="Neuropaint"
              iconSrc="/portfolio/neuroprojection/icons/neuropaint-icon.svg"
              videoSrc="/portfolio/neuroprojection/videos/neuropaint-1.mp4"
            >
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Neuropaint turns the human brain into a brush. An audience
                  member wields it, but neither participant has full control
                  over the final result.
                </p>
                <p>
                  Each color represents a brainwave frequency, the more dominant
                  that wave is relative to the others, the brighter and larger
                  its color becomes. This mapping gives both the meditator and
                  the audience a framework for understanding what is happening
                  in real time, and from there they can begin to experiment with
                  different mental states, breathing techniques and musical cues
                  to see what each produces.
                </p>
                <p>
                  Neuropaint has potential for facilitators in meditation, sound
                  baths and other experiential practices to experiment with in
                  their sessions.
                </p>
                <p>
                  At the end of each session the meditator leaves with the
                  painting as an artifact — a visual record of their neural
                  session.
                </p>
              </div>
            </VisualizationTabs.Tab>

            {/* Neurotree — hidden until NEXT_PUBLIC_SHOW_NEUROTREE=true */}
            {showNeurotree && (
              <VisualizationTabs.Tab id="neurotree" title="Neurotree">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {/* TODO: Add Neurotree copy and media */}
                </div>
              </VisualizationTabs.Tab>
            )}
          </VisualizationTabs>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="mb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-0">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Artist Statement
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <blockquote className="flex-1 border-l-2 border-primary pl-6 space-y-6 text-muted-foreground leading-relaxed italic">
              <p>
                Human consciousness is already legible to others through speech,
                behaviour, and social interaction. Neuroprojection aims to strip
                those learned layers back and offering a different kind of
                signal, not unmediated but less rehearsed. The translation is
                still an interpretation shaped by technology and aesthetic
                choice. But the question it poses is direct. What changes when
                our invisible experience becomes something you can watch?
              </p>
              <footer className="not-italic font-medium text-foreground">
                Phil Gray
              </footer>
            </blockquote>

            <div className="w-full sm:w-1/4 md:w-1/3 flex-shrink-0 relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image
                src="/portfolio/neuroprojection/phil-neuropaint-profile.jpeg"
                alt="Phil Gray with Neuropaint"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-0">
          <p className="text-muted-foreground leading-relaxed text-center mb-10">
            This work is not a conclusion but a contribution to an ongoing
            conversation about neurotechnology, perception, and shared
            experience. What that conversation looks like and where it will lead
            is still being discovered.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
              <h2 className="text-xl font-bold">Get in touch</h2>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                For research, collaboration, exhibition and festival inquiries.
              </p>
              <a
                href="mailto:me@philjgray.ca"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
              >
                me@philjgray.ca
              </a>
            </div>

            {/* Attend */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
              <h2 className="text-xl font-bold">Attend a session</h2>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                Get notified about future events and public sessions.
              </p>
              <form onSubmit={handleAttendSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={attendForm.name}
                  onChange={handleAttendChange}
                  className="p-2 block w-full rounded-md bg-secondary text-foreground text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  value={attendForm.email}
                  onChange={handleAttendChange}
                  className="p-2 block w-full rounded-md bg-secondary text-foreground text-sm shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
                <button
                  type="submit"
                  disabled={attendSubmitting}
                  className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {attendSubmitting ? "Sending..." : "Submit"}
                </button>
                {attendMessage && (
                  <p
                    className={`text-sm text-center ${
                      attendMessage.includes("wrong")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {attendMessage}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
