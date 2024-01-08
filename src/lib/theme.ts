const one_year = 60 * 60 * 24 * 365;
export const setTheme = (theme: string) => {
  document.cookie = `theme=${theme}; max-age=${one_year}; path=/;`;
  document.documentElement.setAttribute("data-theme", theme);
};