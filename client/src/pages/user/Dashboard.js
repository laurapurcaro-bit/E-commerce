import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";

export default function Dashboard() {
  // context
  const [auth] = useAuth();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.firstName}`}
        subTitle="User Dashboard"
      />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  );
}
