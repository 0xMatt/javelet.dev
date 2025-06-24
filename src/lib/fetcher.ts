// @ts-expect-error any type is allowed
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
