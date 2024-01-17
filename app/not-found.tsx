import NoResult from "@/components/shared/NoResult";

const NoResultPage = () => {
  return (
    <div className="flex-center h-[100vh] w-full">
      <NoResult
        content="Seems like you have reached a dead-end"
        title="Oooopsss..."
        linkText="Go home"
        link="/"
      />
    </div>
  );
};

export default NoResultPage;
