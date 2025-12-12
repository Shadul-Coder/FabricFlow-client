import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-[350px] flex justify-center items-center sm:h-[400px] lg:h-[500px]">
      <BeatLoader color="#ae8844" />
    </div>
  );
};

export default Loading;
