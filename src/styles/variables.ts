export type FontSize = "xxl" | "xl" | "l" | "m" | "s" | "xs";
export type Color =
  | "white"
  | "black"
  | "grey"
  | "lightBlue"
  | "lightGrey"
  | "darkGrey"
  | "green"
  | "red";

interface CssVariables {
  colors: {
    [key in Color]: string;
  };
  fontSize: {
    [key in FontSize]: string;
  };
}

export const variables: CssVariables = {
  colors: {
    white: "#FFFFFF",
    black: "#333333",
    grey: "#F4F4FB",
    lightGrey: "#CFCECE",
    darkGrey: "#606368",
    lightBlue: "#4C7DDE",
    green: "#45C89A",
    red: "#E74C3C",
  },
  fontSize: {
    xxl: "28px",
    xl: "20px",
    l: "18px",
    m: "16px",
    s: "14px",
    xs: "12px",
  },
};
