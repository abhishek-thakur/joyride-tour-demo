import { Footer, Header, Text } from "@mantine/core";
import { forwardRef, useRef, useState } from "react";
import Joyride, { BeaconRenderProps, StoreHelpers } from "react-joyride";
import { CallBackProps, STATUS, Step } from "react-joyride";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../Store";
import {
  BeaconButton,
  get_page_joyride_status,
  Pages,
  set_page_joyride_status,
  State,
  toggle_page_joyride_status,
} from "../utils/joyride_encoding";
import { getData, saveState } from "../utils/firebase_api";

const Home = () => {
  const navigate = useNavigate();
  const completed = useStore((state) => state.completed);
  const setCompleted = useStore((state) => state.setCompleted);

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

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (options.includes(status)) {
      setState({ complete: true, run: false, steps: [] });
      const newCompleted = set_page_joyride_status(
        completed!,
        Pages.HOME_PAGE,
        true
      );
      setCompleted(newCompleted);
      saveState(newCompleted!);
      getData();
    }
  };

  const handleClickRestart = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const toggled = toggle_page_joyride_status(completed!, Pages.HOME_PAGE);
    setCompleted(toggled);
    // const { reset } = helpers.current!;
    setState({ complete: false, run: true, steps: step });
    // reset(true);
  };
  return (
    <div className="App">
      {!get_page_joyride_status(completed!, Pages.HOME_PAGE) && (
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
        <Text
          variant="link"
          component={NavLink}
          to="contactUs"
          onClick={() => {
            navigate("contactUs");
          }}
        >
          Contact Us
        </Text>
      </Header>
      <section className="box">
        <h1>demo box</h1>
        <div> box content </div>
        {get_page_joyride_status(completed!, Pages.HOME_PAGE) && (
          <button className="section-button" onClick={handleClickRestart}>
            Start
          </button>
        )}
      </section>
      <Footer style={{ color: "white" }} height={"100px"}>
        <h4>to start the demo trial please press START button</h4>
      </Footer>
    </div>
  );
};
export default Home;
