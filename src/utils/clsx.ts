type ClassName = string;

function clsx(...classes: ClassName[]): string {
  if (classes.length === 0) return "";

  return classes.join(" ");
}

export default clsx;
