import React, { createContext, useContext, useState } from "react";

interface INewUser {
  uid: string;
  avatarURL: string;
}

interface IUserContext {
  newUser: INewUser;
  setNewUser: React.Dispatch<React.SetStateAction<INewUser>>;
}

export const UserContext = createContext<IUserContext>({
  newUser: {
    uid: "",
    avatarURL: "",
  },
  setNewUser: () => {},
});

export default function UserProvider({ children }: any) {
  const [newUser, setNewUser] = useState<INewUser>({
    uid: "",
    avatarURL: "",
  });

  return (
    <UserContext.Provider value={{ newUser, setNewUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useNewUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseWeather must be used within a WeatherProvider!");
  }
  const { newUser, setNewUser } = context;
  return { newUser, setNewUser };
}
