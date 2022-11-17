import { Grid, TextInput, Space, Group, Button } from "@mantine/core";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
interface CreateAssetProps {
  host: string;
  display_name: string;
  tags: string;
  type: string;
  decommission_date: Date;
}
interface CreateProps {
  setOpenCreate: (p: boolean) => void;
}
const CreateAsset = (props: CreateProps) => {
  const { setOpenCreate } = props;
  const form = useForm<CreateAssetProps>({
    initialValues: {
      host: "",
      display_name: "",
      type: "",
      tags: "",
      decommission_date: new Date(),
    },
  });
  return (
    <form
      onSubmit={() => {
        setOpenCreate(false);
      }}
    >
      <>
        <Grid>
          <Grid.Col>
            <TextInput
              data-autofocus
              placeholder="Enter Host Address"
              label="Host Address"
              description="Enter the new Host address"
              size="xs"
            />
          </Grid.Col>
          <Grid.Col>
            <TextInput
              placeholder="Enter Display Name"
              label="Display Name"
              description="Enter the new Display Name"
              size="xs"
            />
          </Grid.Col>
          <Grid.Col>
            <TextInput
              placeholder="Enter Type"
              label="Types"
              description="Enter the Types"
              size="xs"
            />
          </Grid.Col>
          <Grid.Col>
            <TextInput
              placeholder="Enter Tags"
              label="Tags"
              description="Enter the Tags separated by commas.Eg- abc,xyz,.."
              size="xs"
            />
          </Grid.Col>
          <Grid.Col>
            <DatePicker
              icon={<CalendarIcon />}
              placeholder="Enter End date"
              label="End Date"
              zIndex={1000}
              inputFormat="YYYY-MM-DD"
            />
          </Grid.Col>
        </Grid>
        <Space h="lg" />

        <Group position="right" sx={{ padding: "0.5rem" }}>
          <Button color="red" size="xs" onClick={form.reset}>
            Reset
          </Button>
          <Button color="green" size="xs" type="submit">
            Submit
          </Button>
        </Group>
      </>
    </form>
  );
};
export default CreateAsset;
