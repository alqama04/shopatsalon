import {Skeleton} from "@/components/Skeleton";

const loading = () => {
  return (
    <div className=" w-screen h-[100svh] z-10">
      <div className="sm:hidden">
        <Skeleton/>
      </div>
      <div className="hidden sm:flex justify-center items-center h-[100svh] w-full">
        <span className="loading loading-ring h-[10rem] w-[10rem]"></span>
      </div>
    </div>
  );
};

export default loading;
