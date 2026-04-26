export function setFilterParam(pathname: string, params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params);
  if (!value || value === "all") {
    next.delete(key);
  } else {
    next.set(key, value);
  }
  const query = next.toString();
  return query.length ? `${pathname}?${query}` : pathname;
}
