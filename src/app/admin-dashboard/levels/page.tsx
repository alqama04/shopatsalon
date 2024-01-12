import dynamic from "next/dynamic";
const CreateLevel = dynamic((()=>import('./(action)/(create-levels)/CreateLevel')))
const FetchLevels = dynamic(()=>import('./(getLevels)/FetchLevels'))
const page = () => {
  return (
    <div className="min-h-screen h-full">
      <CreateLevel/>

      <FetchLevels/>
    </div>
  );
};

export default page;
