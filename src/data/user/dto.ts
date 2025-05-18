import { User } from "@supabase/supabase-js";
import { UserDTO, UserProfile } from "~/types/UserProfile";

export function getUserDTO(user: User, profile: UserProfile): UserDTO {
  const { id, email } = user;

  return {
    id,
    email,
    profile: profile,
  };
}
