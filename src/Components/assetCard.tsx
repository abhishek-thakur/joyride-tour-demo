import {
  useMantineTheme,
  Text,
  Card,
  Group,
  Checkbox,
  Anchor,
  ActionIcon,
  Stack,
  Tooltip,
  Badge,
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link2Icon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import moment from "moment";
import { memo } from "react";
import { Link } from "react-router-dom";

export interface Asset {
  host: string;
  display_name: string;
  unique_id: string;
  tags: string[];
  type: string;
  org_id: number;
  scan_cycle_count: number;
  vuln_count: number;
  last_scan: object;
  cve_status_distribution: object;
  time_to_decommission: string;
  decommission_date: string;
}
const AssetCard = ({
  asset,
  handleCheck,
  checked,
}: {
  asset: Asset;
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) => {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery("(max-width: 840px)");
  return (
    <Card
      shadow="lg"
      p="lg"
      sx={(theme) => ({
        marginBottom: "5px",
        borderTopWidth: "3px",
        borderTopStyle: "solid",
      })}
    >
      <Group spacing="xs">
        <Checkbox
          color={theme.colorScheme == "dark" ? "white[3]" : "gray"}
          checked={checked}
          value={JSON.stringify({
            host: asset.host,
            unique_id: asset.unique_id,
          })}
          onChange={(event) => handleCheck(event)}
        />
        <Anchor
          component={Link}
          color="indigo"
          to={`/orgs/${asset.org_id}/asset/${asset.unique_id}`}
        >
          <ActionIcon>
            <Link2Icon />
          </ActionIcon>
        </Anchor>

        <Stack>
          <Text size="xl" weight={700}>
            {asset.host}

            {moment(asset.decommission_date) < moment() ? (
              <Tooltip
                ml={1}
                color="red"
                withArrow
                transition="fade"
                transitionDuration={200}
                label="Asset has Decommissioned"
              >
                <ExclamationTriangleIcon color="red" />
              </Tooltip>
            ) : null}
          </Text>
          {/* <Text color={theme.colorScheme == "dark" ? "gray[3]" : "gray"}>
            </Text> */}
          {moment(asset.decommission_date) < moment() ? (
            <Badge radius={0} color="red">
              {asset.display_name}
            </Badge>
          ) : (
            <Badge radius={0} color="gray">
              {asset.display_name}
            </Badge>
          )}
        </Stack>
        <Divider orientation="vertical" mx="xs" size="xs" />
        <Stack mr="5px">
          <Text size="xs" style={{ fontFamily: "monospace" }}>
            Time to Decommission
          </Text>
          <Text weight={600}>{asset?.time_to_decommission}</Text>
        </Stack>
        <Divider orientation="vertical" mx="xs" size="xs" />
        <Stack mr="5px">
          <Text size="xs" style={{ fontFamily: "monospace" }}>
            Type
          </Text>
          <Text weight={600}>{asset.type}</Text>
        </Stack>
        <Divider
          sx={{
            height: "auto !important",
            display: smallScreen ? "none" : "flex",
          }}
          variant="solid"
          orientation="vertical"
        />
        <Stack>
          <Text size="xs">Tags:</Text>
          <Group>
            {asset.tags.map((tag, index) => (
              <Badge radius="xs" key={index}>
                {tag}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Group>

      <Divider my="sm" size="xs" />
      <Group>
        <Stack mr="5px">
          <Text size="xs" style={{ fontFamily: "monospace" }}>
            <>
              <Group spacing={0}>
                Last Scan Date{" "}
                <Anchor
                  component={Link}
                  color="indigo"
                  to={`/orgs/${asset.org_id}/scancycles/`}
                >
                  <ActionIcon>
                    <Link2Icon />
                  </ActionIcon>
                </Anchor>
              </Group>
            </>
          </Text>
          <Text weight={600}>14/11/2022</Text>
        </Stack>
        <Divider orientation="vertical" mx="xs" size="xs" />
        <Stack mr="5px">
          <Text size="xs" style={{ fontFamily: "monospace" }}>
            Scan Cycle
          </Text>
          <Text weight={600}>{asset.scan_cycle_count}</Text>
        </Stack>
        <Divider orientation="vertical" mx="xs" size="xs" />
        {/* <VulnBreakup item={asset.vuln_breakup} short={false} /> */}

        <Divider
          sx={{
            height: "auto !important",
            display: smallScreen ? "none" : "flex",
          }}
          variant="solid"
          orientation="vertical"
        />
        {/* <StatusBreakup
            item={asset.cve_status_distribution}
            short={false}
            heading={false}
          /> */}
      </Group>
    </Card>
  );
};

export default memo(AssetCard);
