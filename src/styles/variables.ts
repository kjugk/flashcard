export type FontSize = "xxl" | "xl" | "l" | "m" | "s" | "xs";
export type Color =
  | "white"
  | "black"
  | "grey"
  | "lightBlue"
  | "lightGrey"
  | "darkGrey";

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
    darkGrey: "#666666",
    lightBlue: "#509FF8",
  },
  fontSize: {
    xxl: "20px",
    xl: "18px",
    l: "16px",
    m: "14px",
    s: "12px",
    xs: "10px",
  },
};
