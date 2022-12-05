import useStore from "../Store";
/* interface PageIndex { */
/*   [key in keyof typeof Pages]: number */
/* } */

const Pages = {
  HOME_PAGE: "home",
  LIST_ASSET_PAGE: "list_assets",
} as const
/* type PageIndex = Record<keyof typeof Pages, number>; */

/* adding [] around the variable in key due to this*/
/* https://stackoverflow.com/a/2274327 */
const page_index: Record<string, number> = {
  [Pages.HOME_PAGE]: 0,
  [Pages.LIST_ASSET_PAGE]: 1
}

const get_page_index: (name: string) => number = (name: string) => page_index[name]

const get_page_joyride_status = (page: string) => {
  const completed = useStore((state) => state.completed);
  const idx = get_page_index(page)
  return completed![idx] == "1"
}

const set_page_joyride_status = (page: string, new_value: boolean) => {
  const completed = useStore((state) => state.completed);
  const setCompleted = useStore((state) => state.setCompleted);
  const idx = get_page_index(page)
  let tmp_array = completed!.split("")
  tmp_array[idx] = new_value == true ? "1" : "0"

  setCompleted(tmp_array.join(""))
}

const toggle_page_joyride_status = (page: string) => {
  const completed = useStore((state) => state.completed);
  const setCompleted = useStore((state) => state.setCompleted)
  const idx = get_page_index(page)
  let tmp_array = completed!.split("")
  if (tmp_array[idx] == "1") {
    tmp_array[idx] = "0"
  } else if (tmp_array[idx] == "0") {
    tmp_array[idx] = "1"
  }

  setCompleted(tmp_array.join(""))
}

export { get_page_joyride_status, set_page_joyride_status, toggle_page_joyride_status, Pages }
