import React from "react";
import { AuthContext } from "./context.tsx";

export const useAuth = () => React.useContext(AuthContext);
