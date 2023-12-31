export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div className="flex flex-col gap-4 p-4 justify-center w-full">
      <div className={`skeleton h-32 w-full ${className}`}></div>
      <div className={`skeleton h-4 w-28 ${className}`}></div>
      <div className={`skeleton h-4 w-full ${className}`}></div>
      <div className={`skeleton h-4 w-full ${className}`}></div>
    </div>
  );
};


export const Skeleton2 = ({className}:{className?:string}) => {
  return (
    <div className="flex flex-col  p-1 justify-center w-full">
      <div className={`${className} rounded-md skeleton h-32 sm:h-28 w-full`}></div>
    </div>
  );
};
