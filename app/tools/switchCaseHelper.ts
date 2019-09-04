export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;

// F stand for function
export const switchcaseF = cases => defaultCase => key =>
  switchcase(cases)(defaultCase)(key)();
