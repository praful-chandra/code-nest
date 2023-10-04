import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div className="">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
