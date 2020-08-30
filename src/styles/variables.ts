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
    m: "16px",
    s: "14px",
    xs: "12px",
  },
};
