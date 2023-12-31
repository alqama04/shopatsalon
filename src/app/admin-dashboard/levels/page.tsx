import dynamic from "next/dynamic";
import FetchLevels from "./(getLevels)/FetchLevels";
const CreateLevel = dynamic((()=>import('./(action)/(create-levels)/CreateLevel')))

const page = () => {
  return (
    <div className="bg-white">
      <CreateLevel/>

      <FetchLevels/>
    </div>
  );
};

export default page;
