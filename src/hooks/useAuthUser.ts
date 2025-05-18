import useSWR from "swr";
import { UserDTO } from "~/types/UserProfile";

const useAuthUser = () => {
  const { data, ...rest } = useSWR<UserDTO>("/api/user");

  return {
    user: !!data ? data : null,
    ...rest,
  };
};

export default useAuthUser;
