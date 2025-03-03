"use client";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/me@philjgray.ca",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitMessage(
          "Thank you for your message. I'll get back to you soon!"
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(
          "Oops! There was a problem submitting your form. Please try again."
        );
      }
    } catch (error) {
      setSubmitMessage(
        "Oops! There was a problem submitting your form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
          Contact Me
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-xl mb-6 text-muted-foreground text-center md:text-right">
              I'm always open to new opportunities and collaborations. Feel free
              to reach out if you have any questions or just want to connect!
            </p>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://github.com/philjg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/phil-j-gray/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://x.com/thephiljgray"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <form
              action="https://formsubmit.co/me@philjgray.ca"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 block w-full rounded-md bg-primary bg-secondary text-foreground shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 block w-full rounded-md bg-secondary bg-background text-foreground shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="p-2 mt-1 block w-full rounded-md bg-secondary bg-background text-foreground shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitMessage && (
                  <div
                    className={`mt-4 text-center ${
                      submitMessage.includes("Oops")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
