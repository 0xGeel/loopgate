// A fancy way to add debug statements ✨

const styling =
  "background-color: #bada55; padding: 3px 6px; border-radius: 4px;";

export const fancyLog = (text: string) => {
  console.log(`%cDEBUG: ${text}`, styling);
};
