import Image from "next/image";
const Down = () => {
  return (
    <div className="down">
      <Image src={"/down.png"} alt={"向下"} width={30} height={30} />
    </div>
  );
};
export default Down;
