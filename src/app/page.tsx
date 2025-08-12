import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Our simple landing page for the bot.</h1>

      <div className="flex">
        <ul className="flex items-center gap-x-4 mt-5">
          <li>Home</li>
          <Link href={"/chat"}>
            <li className="text-sm underline">Chat</li>
          </Link>
          <Link href={"/chat/1"}>
            <li className="text-sm underline">View Chat</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Home;
