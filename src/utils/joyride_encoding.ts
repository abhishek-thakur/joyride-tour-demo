/* interface PageIndex { */
/*   [key in keyof typeof Pages]: number */
/* } */

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Step } from "react-joyride";

export interface State {
  complete: boolean;
  run: boolean;
  steps: Step[];
}

const Pages = {
  HOME_PAGE: "home",
  LIST_ASSET_PAGE: "list_assets",
  CONTACT_US_PAGE: "contact_us",
} as const;
/* type PageIndex = Record<keyof typeof Pages, number>; */

/* adding [] around the variable in key due to this*/
/* https://stackoverflow.com/a/2274327 */
const page_index: Record<string, number> = {
  [Pages.HOME_PAGE]: 0,
  [Pages.LIST_ASSET_PAGE]: 1,
  [Pages.CONTACT_US_PAGE]: 2,
};

const get_page_index: (name: string) => number = (name: string) =>
  page_index[name];

const get_page_joyride_status = (completed: string, page: string) => {
  const idx = get_page_index(page);
  return completed![idx] == "1";
};

const set_page_joyride_status = (
  completed: string,
  page: string,
  new_value: boolean
) => {
  const idx = get_page_index(page);
  let tmp_array = completed!.split("");
  tmp_array[idx] = new_value == true ? "1" : "0";

  return tmp_array.join("");
};

const toggle_page_joyride_status = (completed: string, page: string) => {
  const idx = get_page_index(page);
  let tmp_array = completed!.split("");
  if (tmp_array[idx] == "1") {
    tmp_array[idx] = "0";
  } else if (tmp_array[idx] == "0") {
    tmp_array[idx] = "1";
  }
  return tmp_array.join("");
};

const pulse = keyframes`
0% {
  transform: scale(1);
}

55% {
  background-color: rgba(48, 48, 232, 0.9);
  transform: scale(1.6);
}
`;
const BeaconButton = styled.button`
  animation: ${pulse} 1s ease-in-out infinite;
  background-color: rgba(48, 48, 232, 0.6);
  border: 0;
  border-radius: 50%;
  display: inline-block;
  height: 3rem;
  width: 3rem;
`;

export {
  get_page_index,
  get_page_joyride_status,
  set_page_joyride_status,
  toggle_page_joyride_status,
  Pages,
  page_index,
  BeaconButton,
};
