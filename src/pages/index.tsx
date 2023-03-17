import { NextPageWithData, LayoutStyles } from "@/types/Layout";
import { Button, Card, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
const Home: NextPageWithData = (): JSX.Element => {
  const router = useRouter();

  const goToUsers = () => {
    router.push("/users");
  };

  const goToAddNewUser = () => {
    router.push("/add");
  };

  return (
    <Card elevation={2}>
      <Stack p={2} gap={2}>
        <Typography variant={"h4"}>
          Eugeniusz Kuryło Recruitment Task
        </Typography>
        <Divider />
        <Stack flexDirection="row" justifyContent="center" gap={3}>
          <Button variant="contained" onClick={goToUsers}>
            Go To Dashboard
          </Button>
          <Button variant="outlined" onClick={goToAddNewUser}>
            Add New User
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

Home.metadata = {
  layout: LayoutStyles.default,
  pageTitle: "Home",
};

Home.getInitialProps = async () => {
  return {};
};

export default Home;
