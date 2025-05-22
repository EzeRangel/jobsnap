import Image from "next/image";

export default function EmptyTable() {
  return (
    <div className="text-center">
      <span className="inline-block">
        <Image
          unoptimized
          src="/empty-files.png"
          width={200}
          height={242}
          alt="Illustration with folder and files"
        />
      </span>
      <h3 className="text-lg font-bold text-foreground">No CVs found</h3>
      <p className="text-muted-foreground">
        Upload your first CV to start analyzing it against your dream job
      </p>
    </div>
  );
}
