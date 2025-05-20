import { User } from "@supabase/supabase-js";
import { Database } from "./supabase";

export interface UserDTO extends Pick<User, "id" | "email"> {
  profile?: UserProfile;
}

export type UserProfile = Database["public"]["Tables"]["UsersProfile"]["Row"];
