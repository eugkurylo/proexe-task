import { UserForm } from "@/components/forms/UserForm/UserForm";
import { NextPageWithData, LayoutStyles } from "@/types/Layout";

const Add: NextPageWithData = (): JSX.Element => {
  return <UserForm />;
};

Add.metadata = {
  layout: LayoutStyles.default,
  pageTitle: "Add",
};

Add.getInitialProps = async () => {
  return {};
};

export default Add;
