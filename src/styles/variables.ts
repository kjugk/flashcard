export type FontSize = "xxl" | "xl" | "l" | "m" | "s" | "xs";

interface CssVariables {
  colors: {
    white: string;
    grey: string;
    lightBlue: string;
    lightGrey: string;
    darkGrey: string;
  };
  fontSize: {
    [key in FontSize]: string;
  };
}

export const variables: CssVariables = {
  colors: {
    white: "#FFFFFF",
    grey: "#F4F4FB",
    lightBlue: "#509FF8",
    lightGrey: "#CFCECE",
    darkGrey: "#666666",
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
