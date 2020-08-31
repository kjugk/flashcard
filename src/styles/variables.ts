export type FontSize = "xxl" | "xl" | "l" | "m" | "s" | "xs";

interface CssVariables {
  colors: {
    white: string;
    grey: string;
    lightGrey: string;
  };
  fontSize: {
    [key in FontSize]: string;
  };
}

export const variables: CssVariables = {
  colors: {
    white: "#FFFFFF",
    grey: "#F4F4FB",
    lightGrey: "#CFCECE",
  },
  fontSize: {
    xxl: "24px",
    xl: "20px",
    l: "18px",
    m: "14px",
    s: "12px",
    xs: "10px",
  },
};
