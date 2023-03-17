import { UserForm } from "@/components/forms/UserForm/UserForm";
import { useAppDispatch } from "@/store";
import { getUserById, getUserByIdSelector } from "@/store/users";
import { NextPageWithData, LayoutStyles } from "@/types/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Edit: NextPageWithData = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userId: userIdQuery } = router.query;
  const userId = userIdQuery ? +userIdQuery : 0;
  const user = useSelector(getUserByIdSelector(userId));

  useEffect(() => {
    if (!user || user.id !== userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);

  return <UserForm userData={user} />;
};

Edit.metadata = {
  layout: LayoutStyles.default,
  pageTitle: "Edit",
};

Edit.getInitialProps = async () => {
  return {};
};

export default Edit;
