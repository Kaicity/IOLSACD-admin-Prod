const HeaderContent = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="flex flex-col gap-y-2 mb-3">
      <h1 className="text-2xl text-primary md:text-3xl font-semibold">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{subTitle}</p>
    </div>
  );
};

export default HeaderContent;
