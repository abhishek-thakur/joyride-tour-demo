import { Header, Text } from "@mantine/core";
import { useState } from "react";
import Joyride from "react-joyride";
import { CallBackProps, STATUS, Step } from "react-joyride";
import { NavLink, useNavigate } from "react-router-dom";
export interface State {
  run: boolean;
  steps: Step[];
}
const Home = () => {
  const navigate = useNavigate();
  const [{ run, steps }, setState] = useState<State>({
    run: false,
    steps: [],
  });
  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setState({
      run: true,
      steps: [
        {
          content: <h2>Let's begin our journey!</h2>,
          locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
          placement: "center",
          target: "body",
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
      ],
    });
  };
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false, steps: [] });
    }
  };
  return (
    <div className="App">
      <Joyride
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
      />
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
        <button className="section-button" onClick={handleClickStart}>
          Start
        </button>
      </section>
    </div>
  );
};
export default Home;
