import clsx from "clsx";
import Dropzone, { DropzoneProps } from "react-dropzone";

export type DropZoneProps = Readonly<{ className?: string }> & DropzoneProps;

export const DropZone = ({ className, ...props }: DropZoneProps) => {
  return (
    <Dropzone {...props}>
      {({ getRootProps, getInputProps }) => (
        <section
          {...getRootProps()}
          className={clsx(
            "flex items-center justify-center h-64",
            "rounded-sm bg-neutral-950 border-2 border-dashed border-neutral-800 p-4",
            className
          )}
        >
          <input {...getInputProps()} />
          <p>Drop some files here, or click to select files</p>
        </section>
      )}
    </Dropzone>
  );
};
