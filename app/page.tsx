import { LogoutButton } from "@/components/logout-btn";
import { Users } from "./(pages)/dashboard/users";

export default function HOME() {
  return (
    <div>
      <Users />
      <LogoutButton/>
    </div>
  );
}
