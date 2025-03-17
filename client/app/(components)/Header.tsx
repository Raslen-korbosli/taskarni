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
    <div className="w-ful mb-5 flex items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
      <div className="flex items-center justify-center"> {buttonComponent}</div>
    </div>
  );
}
