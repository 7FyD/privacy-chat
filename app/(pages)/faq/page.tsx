import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Separator } from "@/app/components/ui/separator";
import Link from "next/link";
import React from "react";

const faqs: Array<{ question: string; answer: React.JSX.Element }> = [
  {
    question: "Is Privacy Chat fully secure?",
    answer: (
      <p className="text-gray-700">
        Yes, our Privacy Chat services run exclusively on HTTPS, ensuring that
        all data transferred between the server and the client is fully
        encrypted. Messages are temporarily stored in the server's local memory
        and are automatically deleted after a set period or when the room
        expires. Importantly, no other party interacts with the data, and since
        there are no user accounts or IDs, messages cannot be linked to any
        specific user. Additionally, we're soon going to introduce{" "}
        <Link
          href="https://w.wiki/6xEG"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          End-to-End
        </Link>{" "}
        encryption using the{" "}
        <Link
          href="https://w.wiki/AvzW"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Signal Protocol
        </Link>
        , providing an extra layer of security to fully ensure that nothing can
        be leaked.
      </p>
    ),
  },
  {
    question: "Can I get in trouble for using Privacy Chat?",
    answer: (
      <p className="text-gray-700">
        Of course not. Privacy Chat is a free service designed to provide secure
        communication for everyone. It simply facilitates conversations between
        multiple people without storing any personal information or linking
        messages to specific users. It's a legitimate tool that prioritizes user
        privacy and is available for anyone to use.
      </p>
    ),
  },
  {
    question: "How do I create a chat and invite my associates?",
    answer: (
      <p className="text-gray-700">
        To create a chat and invite your associates, simply access our{" "}
        <Link
          href="/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          new chat interface
        </Link>
        , set a name for the chat, choose a password (we highly recommend using
        one to prevent unauthorized access), and set an expiry timer for the
        chat. Then, click "Create Room" and share the link with your friends!
      </p>
    ),
  },
  {
    question: "Can someone access my chats and messages without my permission?",
    answer: (
      <p className="text-gray-700">
        The only way someone can access your conversation is if they have the
        link to your chat and know the password to the room. Once you share the
        password with someone, they could pass it on to others, which might lead
        to your messages being leaked. So, it's important to be cautious about
        who you share your chat link and password with.
      </p>
    ),
  },
  {
    question: "Can I access a chat after it has already expired?",
    answer: (
      <p className="text-gray-700">
        No. Once a chat expires, all its content is deleted and you must create
        a new chat if you wish to continue your conversations.
      </p>
    ),
  },
];

const FAQPage = () => {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-start">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="multiple"
        className="w-full space-y-12 md:space-y-8 text-center md:text-start"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="font-semibold text-2xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQPage;
