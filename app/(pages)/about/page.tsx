import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import Link from "next/link";
import React from "react";

const sections: Array<{ title: string; content: React.JSX.Element }> = [
  {
    title: "The story behind Privacy Chat",
    content: (
      <p className="text-gray-700">
        Privacy Chat was created with a simple mission: to provide users with a
        secure and private space to communicate online. In an age where personal
        data is often exploited, we believe that privacy should be a fundamental
        right. Our platform ensures that your conversations are kept
        confidential, free from unauthorized access and surveillance.
      </p>
    ),
  },
  {
    title: "The usage of Privacy Chat",
    content: (
      <p className="text-gray-700">
        Privacy Chat offers a streamlined and intuitive chat experience that
        prioritizes your privacy. You can create chat rooms, invite
        participants, and communicate in real-time, all while knowing that your
        messages are encrypted and secure. We also provide features such as
        message deletion and room expiration to give you complete control over
        your conversations.
      </p>
    ),
  },
  {
    title: "Our main focus - the user",
    content: (
      <p className="text-gray-700">
        Our platform is designed with your security in mind. Whether you're
        discussing sensitive business information or simply want to chat with
        friends without worrying about data breaches, Privacy Chat serves as a
        reliable tool to safeguard your communications. We ensure that your data
        remains in your hands and is not stored or shared with third parties.
        Trust and transparency are at the core of everything we do.
      </p>
    ),
  },
  {
    title: "How to get started with Privacy Chat",
    content: (
      <p className="text-gray-700">
        Simply head over to our{" "}
        <Link
          href="/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          new chat interface
        </Link>
        , enter your username and your room's desired password and lifespan,
        click "Create Room" and share the link with your friends!
      </p>
    ),
  },
  {
    title: "More information about Privacy Chat",
    content: (
      <p className="text-gray-500">
        Check out some of the{" "}
        <Link href="/faq" className="text-blue-400 hover:underline">
          frequently asked questions
        </Link>{" "}
        if you wish to learn more about our project, or head over to our{" "}
        <Link href="/privacy-policy" className="text-blue-400 hover:underline">
          privacy policy
        </Link>{" "}
        to learn how we protect your data and information.
      </p>
    ),
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-start text-gray-900">
        About Privacy Chat
      </h1>
      <Accordion
        type="multiple"
        className="w-full space-y-12 md:space-y-8 text-center md:text-start"
      >
        {sections.map((section) => (
          <AccordionItem key={section.title} value={section.title}>
            <AccordionTrigger className="font-semibold text-2xl text-gray-800">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AboutPage;
