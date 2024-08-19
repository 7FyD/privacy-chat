import { Separator } from "@/app/components/ui/separator";
import Link from "next/link";
import React from "react";

const sections: Array<{ title: string; content: React.JSX.Element }> = [
  {
    title: "Why It Was Created",
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
    title: "What It Does",
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
    title: "How It Serves You",
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
    title: "How to get started",
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
];

const AboutPage: React.FC = () => {
  return (
    <div className="container space-y-4">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-start">
        About Privacy Chat
      </h1>
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          {section.content}
          {index < sections.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
