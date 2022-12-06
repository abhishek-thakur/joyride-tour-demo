import styled from "@emotion/styled";
import { Header, keyframes, Text } from "@mantine/core";
import { forwardRef, useRef, useState } from "react";
import Joyride, { BeaconRenderProps, StoreHelpers } from "react-joyride";
import { CallBackProps, STATUS, Step } from "react-joyride";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../Store";
import { State } from "./ListAssets";
import {
  get_page_index,
  // get_page_joyride_status,
  Pages,
  // set_page_joyride_status,
  // toggle_page_joyride_status,
} from "../utils/joyride_encoding";

const Home = () => {
  const navigate = useNavigate();
  const completed = useStore((state) => state.completed);
  const setCompleted = useStore((state) => state.setCompleted);
  // const setCompleted = useStore((state) => state.setCompleted);
  // const completed = useStore((state) => state.completed);
  /* const toggled = toggle_page_joyride_status(HOME_PAGE) */
  /* console.log(toggled) */

  // console.log(completed!);
  // console.log(get_page_joyride_status(Pages.HOME_PAGE));
  // console.log(get_page_joyride_status(Pages.LIST_ASSET_PAGE));
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
  const BeaconComponent = forwardRef<HTMLButtonElement, BeaconRenderProps>(
    (props, ref) => {
      return <BeaconButton ref={ref} {...props} />;
    }
  );
  const step: Step[] = [
    {
      content: <h2>Let's begin our journey!</h2>,
      locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
      placementBeacon: "top" as const,
      target: ".box",
    },
    {
      content: (
        <div>
          <h2>Home elements</h2>
          <p>this is the link for Home for the org user</p>
        </div>
      ),
      floaterProps: {
        disableAnimation: true,
      },
      spotlightPadding: 20,
      target: "#home",
    },
    {
      content: "These are our super awesome dashboards!",
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: "#dashboard",
      title: "Org Dashboards",
    },
    {
      content: "This is the link for the org Assets!",
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: "#Assets",
      title: "Org Assets",
    },
    {
      content: "The box contains START button !",
      placement: "right",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".box",
      title: "Sample box",
    },
  ];
  const [{ run, steps }, setState] = useState<State>({
    complete: false,
    run: true,
    steps: step,
  });
  const helpers = useRef<StoreHelpers>();

  const setHelpers = (storeHelpers: StoreHelpers) => {
    helpers.current = storeHelpers;
  };
  // const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   setState({
  //     run: true,
  //     steps: step,
  //   });
  // };
  // const handleJoyrideCallback = (data: CallBackProps) => {
  //   const { status, type } = data;
  //   const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

  //   if (finishedStatuses.includes(status)) {
  //     setState({ run: false, steps: [] });
  //   }
  // };
  const set_page_joyride_status = (page: string, new_value: boolean) => {
    const idx = get_page_index(page);
    let tmp_array = completed!.split("");
    tmp_array[idx] = new_value == true ? "1" : "0";
    setCompleted(tmp_array.join(""));
  };
  const get_page_joyride_status = (page: string) => {
    const idx = get_page_index(page);
    return completed![idx] == "1";
  };
  const toggle_page_joyride_status = (page: string) => {
    const idx = get_page_index(page);
    let tmp_array = completed!.split("");
    if (tmp_array[idx] == "1") {
      tmp_array[idx] = "0";
    } else if (tmp_array[idx] == "0") {
      tmp_array[idx] = "1";
    }
    setCompleted(tmp_array.join(""));
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (options.includes(status)) {
      setState({ complete: true, run: false, steps: [] });
      set_page_joyride_status(Pages.HOME_PAGE, true);
      // set_page_joyride_status(Pages.LIST_ASSET_PAGE, false);
      console.log(completed);
      console.log(get_page_joyride_status(Pages.HOME_PAGE));
    }
  };

  // const toggled = toggle_page_joyride_status(Pages.HOME_PAGE);
  const handleClickRestart = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    toggle_page_joyride_status(Pages.HOME_PAGE);
    // console.log(toggled);
    const { reset } = helpers.current!;
    setState({ complete: false, run: true, steps: step });
    reset(true);
  };
  return (
    <div className="App">
      {/* <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      /> */}
      {!get_page_joyride_status(Pages.HOME_PAGE) && (
        <Joyride
          beaconComponent={BeaconComponent}
          callback={handleJoyrideCallback}
          getHelpers={setHelpers}
          run={run}
          scrollToFirstStep
          showSkipButton
          steps={steps}
          styles={{
            options: {
              zIndex: 2000000,
            },
            overlay: {
              backgroundColor: "rgba(79, 46, 8, 0.5)",
            },
          }}
        />
      )}
      <Header height="50px" className="App-header">
        <Text
          id="home"
          variant="link"
          component={NavLink}
          to="/"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Text>

        <span className="App-span" id="dashboard">
          Dashboard
        </span>
        <Text
          id="Assets"
          variant="link"
          component={NavLink}
          to="assets"
          onClick={() => {
            navigate("assets");
          }}
        >
          Assets
        </Text>
        <span className="App-span" id="CVE">
          CVE Instance
        </span>
        <span className="App-span" id="scan">
          Scan Cycle
        </span>
        <span className="App-span" id="issue">
          Issues
        </span>
      </Header>
      <section className="box">
        <h1>demo box</h1>
        <div> box content </div>
        {get_page_joyride_status(Pages.HOME_PAGE) && (
          <button className="section-button" onClick={handleClickRestart}>
            Start
          </button>
        )}
      </section>
    </div>
  );
};
export default Home;
