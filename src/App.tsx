import { CallBackProps } from "react-joyride";
import "./App.css";
import { Footer, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import ListAssets from "./Components/ListAssets";
import Home from "./Components/Home";

function App() {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ colorScheme: "dark" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<ListAssets />} />
      </Routes>
      <Footer style={{ color: "white" }} height={"100px"}>
        <h4>to start the demo trial please press START button</h4>
      </Footer>
    </MantineProvider>
  );
}
export default App;
function logGroup(type: string, data: CallBackProps) {
  throw new Error("Function not implemented.");
}
