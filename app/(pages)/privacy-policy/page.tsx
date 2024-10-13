import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Chat - Privacy Policy",
  description:
    "Private & fully privacy-safe chats, simple to use and with no sign up required!",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Privacy Chat - "Private Conversations, Securely"
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Privacy Policy
        </h2>
        <p className="text-lg font-light text-gray-700 mb-6">
          Last modified: 20th August 2024
        </p>
        <p className="text-lg font-light text-gray-700 mb-2">
          "We", "our platform", "us", "Privacy Chat" all refer to the same
          platform -{" "}
          <Link href="/" className="text-blue-400 hover:underline">
            https://pc.thelungu.com
          </Link>
        </p>
        <p className="text-lg font-light text-gray-700 mb-6">
          "You," "your," and "user" all refer to the individuals using the
          Privacy Chat service.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          At <strong>Privacy Chat</strong>, your privacy is our top priority.
          Our service was designed to provide a secure platform for private
          conversations, ensuring the confidentiality of our users. Below,
          you'll find details on how we protect your privacy and what minimal
          information we interact with.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          What information do We collect?
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          We believe in keeping your data private. <strong>Privacy Chat</strong>{" "}
          does not collect or store any personal information or connection data.
          Here’s what you need to know:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>
            <strong>No Personal Data</strong>: We do not collect your name,
            email, IP address, or any other identifying information.
          </li>
          <li>
            <strong>Temporary Room Credentials</strong>: When a chat room is
            created, we generate a unique room ID that is temporarily stored to
            facilitate the conversation. This room ID is not linked to any
            personal information and is deleted as soon as the chat session
            ends.
          </li>
        </ul>

        <p className="text-lg text-gray-700 mb-6">
          Your conversations are entirely private and only accessible to those
          with the room credentials. Once a room is closed, all associated data
          is immediately and permanently deleted.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          How Are Your Conversations Kept Private?
        </h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>
            <strong>Room security</strong>: Each room ID is unique and secure,
            ensuring that only those with the credentials can access the
            conversation. The room credentials are deleted after the chat ends,
            ensuring no trace of the conversation remains on our servers.
          </li>
          <li>
            <strong>Temporized chats</strong>: Privacy Chat is designed to
            ensure that all data associated with a room is irretrievably deleted
            once the conversation ends. This includes all messages and any other
            data related to the chat session.
          </li>
          <li>
            <strong>Complete anonymity</strong>: We prioritize your anonymity.
            No logs of conversations, user activities, or any other data are
            kept. This ensures your privacy is preserved at all times.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Disclaimer
        </h3>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>
            <strong>User responsibility</strong>: While we do everything within
            our power to protect your privacy, it is the user's responsibility
            to keep the room credentials secure. Privacy Chat cannot be held
            responsible for any data breaches resulting from users sharing their
            credentials with others.
          </li>
          <li>
            <strong>No access to content</strong>: Privacy Chat has no access to
            the content of your conversations. Once the room is closed, all data
            is permanently deleted from our servers and cannot be recovered.
          </li>
          <li>
            <strong>Changes to the Privacy Policy</strong>: We will never change
            our priority. If we are forced to remove our privacy-oriented
            approach, the platform will be shutdown instead of risking user
            data.
          </li>
        </ul>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Contact information
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          If you have any questions about this Privacy Policy or any concerns
          regarding privacy issues, please contact us at{" "}
          <Link
            href="mailto:privacychat@7fyd.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            privacychat@7fyd.dev
          </Link>
          .
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Privacy Chat</strong> is committed to providing a secure and
          private environment for your conversations. Thank you for trusting us
          with your privacy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
