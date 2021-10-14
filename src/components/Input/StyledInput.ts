import Colors from "../../utils/colors";

export const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    width: 400,
    borderBottom: "1px dotted pink",
    color: Colors.weakWhite,
    backgroundColor: Colors.darkBlue,
    justifyContent: "center",
    marginTop: -5,
  }),
  option: (styles: any, { isFocused }: any) => {
    return {
      ...styles,
      cursor: "pointer",
      borderStyle: isFocused ? "solid" : null,
      borderWidth: isFocused ? 1 : null,
      marginTop: 5,
      backgroundColor: isFocused ? "transparent" : null,
    };
  },
  placeholder: (styles: any) => ({
    ...styles,
    color: Colors.weakWhite,
  }),

  input: (styles: any) => ({
    ...styles,
    color: Colors.weakWhite,
  }),

  control: () => ({
    width: 400,
    display: "flex",
    color: Colors.weakWhite,
    fontFamily: "arial",
    marginTop: 50,
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = Colors.weakWhite;

    return { ...provided, opacity, transition, color };
  },
};
