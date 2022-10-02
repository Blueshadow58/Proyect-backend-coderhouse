// Plain Old Java Object
export const asPOJO = (obj: any) => JSON.parse(JSON.stringify(obj));

export const renameField = (record: any, from: string, to: string) => {
  record[to] = record[from];
  delete record[from];
  return record;
};
export const removeField = (record: any, field: string) => {
  const value = record[field];
  delete record[field];
  return value;
};
