import { Button, Container, Group, Header, Text } from "@mantine/core";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BeaconButton,
  get_page_joyride_status,
  Pages,
  set_page_joyride_status,
  toggle_page_joyride_status,
} from "../utils/joyride_encoding";
import Joyride, {
  BeaconRenderProps,
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers,
} from "react-joyride";
import { forwardRef, useState, useRef } from "react";
import useStore from "../Store";
import { State } from "../utils/joyride_encoding";
import { getData, saveState } from "../utils/firebase_api";

const ContactUs = () => {
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
      placementBeacon: "bottom" as const,
      target: "#contact",
    },
    {
      content: "Link for HOME Component!",
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: "#home",
      title: "HOME Element",
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
      content: (
        <div>
          <h2>Contact Us element</h2>
          <p>this is the heading for Contact us page for the org user</p>
        </div>
      ),
      floaterProps: {
        disableAnimation: true,
      },
      spotlightPadding: 20,
      target: "#contact",
    },
    {
      content: "Here is the contact details to contact us !",
      placement: "right",
      styles: {
        options: {
          width: 300,
        },
      },
      target: "#mail_id",
      title: "Contact Details",
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
        Pages.CONTACT_US_PAGE,
        true
      );
      setCompleted(newCompleted);
      saveState(newCompleted);
      getData();
    }
  };

  const handleClickRestart = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const toggled = toggle_page_joyride_status(
      completed!,
      Pages.CONTACT_US_PAGE
    );
    setCompleted(toggled);
    // const { reset } = helpers.current!;
    setState({ complete: false, run: true, steps: step });
    // reset(true);
  };
  return (
    <Container size="xl" m={"md"} className="App">
      {!get_page_joyride_status(completed!, Pages.CONTACT_US_PAGE) && (
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
      <Header height="50px" styles={{ margin: "10px" }} className="App-header">
        <Text
          m={"lg"}
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
        <Text
          id="Assets"
          variant="link"
          component={NavLink}
          to="/assets"
          onClick={() => {
            navigate("/assets");
          }}
        >
          Assets
        </Text>
      </Header>
      <Group
        position="right"
        style={{ marginTop: "10px", marginBottom: "5px" }}
      >
        {get_page_joyride_status(completed!, Pages.CONTACT_US_PAGE) && (
          <Button size="xs" color="red" onClick={handleClickRestart}>
            Restart tour
          </Button>
        )}
        <Button id="back_button" size="xs" onClick={() => navigate(-1)}>
          <DoubleArrowLeftIcon
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
          />
          Back
        </Button>
      </Group>
      <h1 id="contact">Contact Us</h1>
      <div>
        <h2>We are here to help you</h2>
        <div>
          Please let use know your queries at{" "}
          <Text id="mail_id" component="span" weight={"bolder"}>
            support@egt.com
          </Text>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
