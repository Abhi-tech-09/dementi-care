import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import doctor from "../assets/doctor.svg";
import support from "../assets/support.svg";
import feature from "../assets/features.svg";
import family from "../assets/family.svg";
import people from "../assets/people.svg";
import building from "../assets/building.svg";

export const sections = [
  {
    title: "Welcome to Dementi Care",
    text: "Caring for loved ones, supporting families, and making every moment count.",
    image: doctor,
  },
  {
    title: "Our Mission",
    text: "At Dementi Care, we strive to empower families and enhance the quality of life for dementia patients through compassionate support and innovative solutions.",
    image: support,
  },
  {
    title: "Features",
    text: (
      <>
        <p>
          <strong>Personalized Care Plans:</strong> Tailor-made strategies to
          meet the unique needs of your loved ones.
        </p>
        <p>
          <strong>Memory Aids:</strong> Tools and activities designed to
          stimulate and preserve cognitive functions.
        </p>
        <p>
          <strong>Caregiver Support:</strong> Resources and community support to
          help you navigate your caregiving journey.
        </p>
        <p>
          <strong>Emergency Assistance:</strong> Quick access to vital
          information and support in times of need.
        </p>
      </>
    ),
    image: feature,
  },
  {
    title: "Family Support",
    text: (
      <>
        <p>
          <strong>Join Our Community:</strong> Connect with other families,
          share experiences, and find solace in our supportive network.
        </p>
        <p>
          <strong>Expert Advice:</strong> Get insights and guidance from
          healthcare professionals specializing in dementia care.
        </p>
      </>
    ),
    image: family,
  },
  {
    title: "How We Help",
    text: (
      <>
        <p>
          <strong>Holistic Approach:</strong> Combining technology with human
          touch to provide comprehensive care solutions.
        </p>
        <p>
          <strong>User-Friendly Interface:</strong> Designed for ease of use,
          ensuring seamless navigation for all age groups.
        </p>
        <p>
          <strong>Progress Tracking:</strong> Monitor your loved one's condition
          and receive regular updates on their well-being.
        </p>
      </>
    ),
    image: people,
  },

  {
    title: "Get Started Today",
    text: (
      <p>
        Join Dementi Care and discover a new way to support your loved ones.
        Sign up now!
      </p>
    ),
    image: building,
  },
];

const variant = {
  hidden: { transform: "translateX(-50px)", opacity: 0 },
  visible: { transform: "translateX(0)", opacity: 1 },
};
const Section = ({ title, text, image, reverse }: any) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  return (
    <div
      className={`my-10 p-6 glass-low rounded-lg shadow-lg fade-in-up flex flex-col md:flex-row  ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        ref={ref}
        variants={variant}
        initial={"hidden"}
        transition={{ delay: 0.2 }}
        animate={control}
        className="md:w-1/2 flex justify-center items-center slide-in-left"
      >
        <img src={image} alt={title} className="rounded-lg shadow-lg" />
      </motion.div>
      <motion.div
        ref={ref}
        variants={variant}
        initial={"hidden"}
        transition={{ delay: 0.2 }}
        animate={control}
        className="md:w-1/2 p-6 h-fit"
      >
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <div className="text-lg">{text}</div>
      </motion.div>
    </div>
  );
};

export default Section;
