import Image from "next/image";

interface EmptyProps {
  label: string;
  image: string;
}
const Empty = ({ label, image }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" fill src={image ? `/${image}` : "/empty.png"} />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
export default Empty;
