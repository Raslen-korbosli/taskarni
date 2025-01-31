export default function Header({
  name,
  buttonComponent,
  isSmallText,
}: {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
}) {
  return (
    <div className="w-ful mb-5 flex items-center justify-center">
      <h1 className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold`}>
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
}
