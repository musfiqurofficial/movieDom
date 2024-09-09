export const initialFilters = {
  sort_by: "DESC",
  year: "",
  category: "",
  search: "",
  genre: "",
  quality: "",
  minrating: 0,
  maxrating: 10,
};

export const filterAction = {
  ADD: "add",
  REMOVE: "remove",
};

export function filterReducer(state, { type, payload }) {
  switch (type) {
    case filterAction.ADD:
      return { ...state, ...payload };
    case filterAction.REMOVE:
      return { ...state, [payload]: "" };
    default:
      return state;
  }
}
