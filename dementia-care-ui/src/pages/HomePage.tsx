import { motion } from "framer-motion";
import { LampContainer } from "../components/LampContainer";
import Navbar from "../components/Navbar";
import { InfiniteMovingCards } from "../components/InfiniteMovingCards";
import { Link } from "react-router-dom";
import Section, { sections } from "../components/Section";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const HomePage = () => {
  return (
    <div
      data-theme="forest"
      className="w-screen h-screen overflow-scroll box-border bg-slate-950"
    >
      <Navbar />
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Empowering Minds, Supporting Life
        </motion.h1>
      </LampContainer>
      <section className="container mx-auto px-6">
        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            text={section.text}
            image={section.image}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>
      <div className="rounded-md flex flex-col antialiaseditems-center justify-start relative overflow-hidden mx-10">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
        <div className="flex gap-5">
          <Link className="btn bg-slate-800" to="/stories">
            Explore more such stories
          </Link>
          <Link className="btn glass btn-secondary btn-outline" to="/stories">
            Share your story with us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
