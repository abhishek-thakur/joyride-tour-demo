import {
  Button,
  Container,
  Group,
  keyframes,
  MediaQuery,
  Modal,
  Text,
} from "@mantine/core";
import {
  Share2Icon,
  PlusIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { forwardRef, useRef, useState } from "react";
import {
  BeaconRenderProps,
  CallBackProps,
  STATUS,
  Step,
  StoreHelpers,
} from "react-joyride";
import Joyride from "react-joyride";
import { useNavigate } from "react-router-dom";
import asset from "../Response/assets.json";
import AssetCard, { Asset } from "./assetCard";
import CreateAsset from "./CreateAsset";
import styled from "@emotion/styled";
interface State {
  complete: boolean;
  run: boolean;
  // modalOpen: boolean;
  // stepIndex: number;
  steps: Step[];
}
interface StateChange {
  isOpen: boolean;
}
interface CheckedAssetsProps {
  unique_id: string;
  host: string;
}
const ListAssets = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // let [stepIndex, setStepIdx] = useState(0);
  const [checked, setChecked] = useState<CheckedAssetsProps[]>([]);
  const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  55% {
    background-color: rgba(48, 48, 232, 0.9);
    transform: scale(1.6);
  }
`;
  // const [{ run, steps, stepIndex }, setState] = useState<State>({
  //   run: true,
  //   steps: [
  //     {
  //       content: (
  //         <div>
  //           You can interact with your own components through the spotlight.
  //           <br />
  //           Click the bulk Upload above!
  //         </div>
  //       ),
  //       disableBeacon: true,
  //       disableOverlayClose: true,
  //       hideCloseButton: true,
  //       hideFooter: true,
  //       placement: "bottom",
  //       spotlightClicks: true,
  //       styles: {
  //         options: {
  //           zIndex: 10000,
  //         },
  //       },
  //       target: "#bulk_upload",
  //       title: "Upload",
  //     },
  //   ],
  //   stepIndex: 0,
  // });
  // const handleJoyrideCallback = (data: CallBackProps) => {
  //   setState({
  //     run: true,
  //     steps: [],
  //     stepIndex: 1,
  //   });
  //   const { action, index, status, type } = data;

  //   if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
  //     // Need to set our running state to false, so we can restart if we click start again.
  //     setState({ run: false, steps: [], stepIndex: 0 });
  //     // setStepIdx(0);
  //   } else if (
  //     ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)
  //   ) {
  //     const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

  //     if (modalOpen && index === 0) {
  //       setTimeout(() => {
  //         setState({
  //           run: true,
  //           steps: [
  //             {
  //               content:
  //                 "This is our sidebar, you can find everything you need here",
  //               placement: "right",
  //               spotlightPadding: 0,
  //               styles: {
  //                 options: {
  //                   zIndex: 10000,
  //                 },
  //               },
  //               target: "#create_asset",
  //               title: "Create Asset",
  //             },
  //           ],
  //           stepIndex: 1,
  //         });
  //       }, 400);
  //     } else if (modalOpen && index === 1) {
  //       setState({
  //         run: false,
  //         steps: [
  //           {
  //             content:
  //               "This is our sidebar, you can find everything you need here",
  //             placement: "right",
  //             spotlightPadding: 0,
  //             styles: {
  //               options: {
  //                 zIndex: 10000,
  //               },
  //             },
  //             target: "#createAsset",
  //             title: "Create Asset",
  //           },
  //         ],
  //         stepIndex: nextStepIndex,
  //       });
  //       setModalOpen(false);
  //       // setStepIdx(nextStepIndex),
  //       setTimeout(() => {
  //         setState({ run: true, steps: [], stepIndex: nextStepIndex });
  //       }, 400);
  //     } else if (index === 2 && action === ACTIONS.PREV) {
  //       setState({
  //         run: false,
  //         steps: [],
  //         stepIndex: nextStepIndex,
  //       });
  //       setModalOpen(true);
  //       // setStepIdx(nextStepIndex);

  //       setTimeout(() => {
  //         setState({ run: true, steps: [], stepIndex: nextStepIndex });
  //       }, 400);
  //     } else {
  //       // Update state to advance the tour
  //       setModalOpen(false);
  //       // setStepIdx(nextStepIndex);
  //     }
  //   }
  // };
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
  const [{ complete, run, steps }, setState] = useState<State>({
    complete: false,
    run: true,
    steps: [
      {
        content: (
          <>
            <h5 style={{ marginTop: 0 }}>Bulk Upload Assets</h5>
            <p>
              Here we can upload a .csv file to create assets on large scale.
            </p>
            <Text weight="bolder">Click to open Upload Option</Text>
          </>
        ),
        placementBeacon: "top" as const,
        target: "#bulk_upload",
        title: "Our awesome projects",
      },
      {
        content: "To create the Assets please click this button.",
        disableCloseOnEsc: true,
        disableOverlay: true,
        target: "#create_asset",
        title: "Create Asset",
      },
      {
        content: "To go one step back",
        placement: "top" as const,
        target: "#back_button",
        title: "Back one Step",
      },
    ],
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
    }
  };

  // const handleClickOpen = () => {
  //   setState({
  //     run: stepIndex === 0 ? false : run,
  //     steps: [],
  //     stepIndex: stepIndex === 0 ? 1 : stepIndex,
  //   });
  //   setModalOpen(!modalOpen);
  //   // stepIndex =
  // };

  const handleStateChange = ({ isOpen }: StateChange) => {
    setModalOpen(isOpen);
  };

  const navigate = useNavigate();
  const icon_margin_right = { marginRight: "6px" };
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <Container size="xl" style={{ marginLeft: "50px" }}>
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
      <Group
        position="right"
        style={{ marginTop: "10px", marginBottom: "5px" }}
      >
        <Button
          id="bulk_upload"
          data-testid="bulk_button"
          size="xs"
          onClick={() => setOpenCreate(true)}
        >
          <Share2Icon style={icon_margin_right} />
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Text size="xs">Bulk Upload</Text>
          </MediaQuery>
        </Button>
        <Button id="create_asset" size="xs" onClick={() => setOpenCreate(true)}>
          <PlusIcon style={icon_margin_right} />
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Text size="xs"> Create Asset </Text>
          </MediaQuery>
        </Button>
        <Button id="back_button" size="xs" onClick={() => navigate(-1)}>
          <DoubleArrowLeftIcon
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
          />
          Back
        </Button>
      </Group>
      {asset.results?.map((e: Asset) => {
        return (
          <AssetCard
            key={e.unique_id}
            handleCheck={() => {}}
            asset={e}
            checked={!!checked.find((value) => value.unique_id == e.unique_id)}
          />
        );
      })}
      <Modal
        onChange={() => handleStateChange}
        opened={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <CreateAsset setOpenCreate={setOpenCreate} />
      </Modal>
    </Container>
  );
};
export default ListAssets;
