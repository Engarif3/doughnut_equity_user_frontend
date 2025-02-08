import { USER_ROLE } from "@/constants/role";
import { SvgIconProps } from "@mui/material";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  //   icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  icon?: React.ComponentType<SvgIconProps>;
  child?: DrawerItem[];
}

export type ResponseSuccessType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
