import Image from "next/image";

type CardProps = {
  imageUrl?: string;
  title?: string;
  description?: string;
};

export default function Card({ imageUrl, title, description }: CardProps) {
  return (
    <div className="rounded-xl border-2 border-secondary bg-quaternary flex flex-col items-center p-4 gap-2 text-secondary">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          width={40}
          height={40}
          className="size-10"
        />
      )}
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}
