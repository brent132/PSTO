import { Users } from "./(dashboard)/users";
import SignUp from "./signup";

export default function HOME() {
  return (
    <div>
      <Users />
      <SignUp />
    </div>
  );
}
