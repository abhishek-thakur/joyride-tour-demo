import { CallBackProps } from "react-joyride";
import "./App.css";
import { Footer, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import ListAssets from "./Components/ListAssets";
import Home from "./Components/Home";
import ContactUs from "./Components/ContactUs";

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
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
    </MantineProvider>
  );
}
export default App;
