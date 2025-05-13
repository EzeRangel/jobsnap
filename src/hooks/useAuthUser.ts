import useSWR from "swr";
import { User } from "@supabase/supabase-js";

const useAuthUser = () => {
  const { data, ...rest } = useSWR<User>("/api/user");

  return {
    user: !!data ? data : null,
    ...rest,
  };
};

export default useAuthUser;
