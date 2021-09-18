export const joinFilters = (...filters: Array<string>) => filters.join(',');

export const flatmap = (arr: Array<Array<string>>): Array<string> => {
  return arr.reduce((a, e) => a.concat(e), []);
};
