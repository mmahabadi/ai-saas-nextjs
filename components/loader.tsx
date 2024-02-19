import Image from "next/image";

const Loader = () => {
  return (
    <div className="p-8 rounded-lg w-full flex items-center justify-center">
      <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-32 h-32 relative">
          <Image src="/logo.gif" alt="Logo" fill />
        </div>
        <p className="text-sm text-muted-foreground">Robo&apos;s thinking...</p>
      </div>
    </div>
  );
};
export default Loader;
