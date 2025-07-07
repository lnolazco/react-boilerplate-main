import clsx from "clsx";

export type ImagePreviewProps = Readonly<{
  src?: string;
  alt?: string;
}> &
  Omit<React.ComponentProps<"figure">, "children">;

export const ImagePreview = ({
  src,
  alt,
  className,
  ...props
}: ImagePreviewProps) => {
  return (
    <figure
      {...props}
      className={clsx(
        "relative overflow-hidden h-40 min-w-40 rounded-sm bg-neutral-950 p-1",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className="block w-full h-full object-contain border-0"
      />
    </figure>
  );
};
