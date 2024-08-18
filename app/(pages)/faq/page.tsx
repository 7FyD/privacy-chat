import Link from "next/link";

const FAQPage = () => {
  return (
    <div className="container space-y-8">
      <h1 className="font-bold text-4xl">Frequently Asked Questions</h1>
      <div>
        <h3 className="font-semibold text-2xl">Is it secure?</h3>
        <p>
          Yes, our Privacy Chat services run exclusively on HTTPS, ensuring that
          all data transferred between the server and the client is fully
          encrypted. Messages are temporarily stored in the server's local
          memory and are automatically deleted after a set period or when the
          room expires. Importantly, no other party interacts with the data, and
          since there are no user accounts or IDs, messages cannot be linked to
          any specific user. Additionally, we're soon going to introduce{" "}
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
          , providing an extra layer of security to fully ensure that nothing
          can be leaked.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-2xl">
          Can I get in trouble for using Privacy Chat?
        </h3>
        <p>
          Of course not. Privacy Chat is a free service designed to provide
          secure communication for everyone. It simply facilitates conversations
          between multiple people without storing any personal information or
          linking messages to specific users. It's a legitimate tool that
          prioritizes user privacy and is available for anyone to use.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-2xl">
          How do I create a chat and invite my associates?
        </h3>
        <p>
          To create a chat and invite your associates, simply access our{" "}
          <Link
            href="/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            new chat interface
          </Link>
          , set a name for the chat, choose a password (we highly recommend
          using one to prevent unauthorized access), and set an expiry timer for
          the chat. Then, click 'Create Room' and share the link with your
          friends!
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-2xl">
          Can I access a chat after it has already expired?
        </h3>
        <p>
          No. Once a chat expires, all its content is deleted and you must
          create a new chat if you wish to continue your conversations.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-2xl">
          Can someone access my chats and messages without my permission?
        </h3>
        <p>
          The only way someone can access your conversation is if they have the
          link to your chat and know the password to the room. Once you share
          the password with someone, they could pass it on to others, which
          might lead to your messages being leaked. So, it's important to be
          cautious about who you share your chat link and password with.
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
