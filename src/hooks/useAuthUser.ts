import useSWR from "swr";
import { User } from "@supabase/supabase-js";

const useAuthUser = () => {
  const { data, ...rest } = useSWR<User>("/api/user");

  return {
    user: data,
    ...rest,
  };
};

export default useAuthUser;
