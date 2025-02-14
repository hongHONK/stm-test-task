type ClassName = string | undefined | false;

function clsx(...classes: ClassName[]): string {
  if (classes.length === 0) return "";

  return classes.filter((item) => typeof item === "string").join(" ");
}

export default clsx;
