interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SideBarSection = ({ title, children, className }: Props) => {
  return (
    <div className={className}>
      <h3 className="text-xs font-medium text-[var(--sidebar-text)] px-4 mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-y-1">
        {children}
      </div>
    </div>
  );
}; 