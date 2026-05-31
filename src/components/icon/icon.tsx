import type { CSSProperties } from "react";

import addNotes from "@/assets/icons/add_notes.svg";
import arrowDown from "@/assets/icons/arrow_down.svg";
import arrowUp from "@/assets/icons/arrow_up.svg";
import assignment from "@/assets/icons/assignment.svg";
import calendar from "@/assets/icons/calendar.svg";
import chevronBackward from "@/assets/icons/chevron_backward.svg";
import chevronForward from "@/assets/icons/chevron_forward.svg";
import close from "@/assets/icons/close.svg";
import contractEdit from "@/assets/icons/contract_edit.svg";
import copy from "@/assets/icons/copy.svg";
import dashboard from "@/assets/icons/dashboard.svg";
import doubleLeft from "@/assets/icons/double_left.svg";
import doubleRight from "@/assets/icons/double_right.svg";
import docs from "@/assets/icons/docs.svg";
import error from "@/assets/icons/error.svg";
import feedback from "@/assets/icons/feedback.svg";
import groups from "@/assets/icons/groups.svg";
import lock from "@/assets/icons/lock.svg";
import manageAccount from "@/assets/icons/manage_account.svg";
import manageCertificate from "@/assets/icons/manage_certificate.svg";
import manageMenu from "@/assets/icons/manage_menu.svg";
import manageVersion from "@/assets/icons/manage_version.svg";
import mobileLoupe from "@/assets/icons/mobile_loupe.svg";
import mobileSetting from "@/assets/icons/mobile_setting.svg";
import profile from "@/assets/icons/profile.svg";
import refresh from "@/assets/icons/refresh.svg";
import search from "@/assets/icons/search.svg";
import settings from "@/assets/icons/settings.svg";
import starFill from "@/assets/icons/star_fill.svg";
import symbolAndroid from "@/assets/icons/symbol_android.svg";
import symbolIOS from "@/assets/icons/symbol_iOS.svg";
import visibility from "@/assets/icons/visibility.svg";
import visibilityOff from "@/assets/icons/visibility_off.svg";
import clock from "@/assets/icons/clock.svg";

const iconSources = {
  addNotes,
  arrowDown,
  arrowUp,
  assignment,
  calendar,
  chevronBackward,
  chevronForward,
  clock,
  close,
  contractEdit,
  copy,
  dashboard,
  doubleLeft,
  doubleRight,
  docs,
  error,
  feedback,
  groups,
  lock,
  manageAccount,
  manageCertificate,
  manageMenu,
  manageVersion,
  mobileLoupe,
  mobileSetting,
  profile,
  refresh,
  search,
  settings,
  starFill,
  symbolAndroid,
  symbolIOS,
  visibility,
  visibilityOff,
} as const;

export type IconName = keyof typeof iconSources;

type IconProps = {
  className?: string;
  name: IconName;
  size?: number | string;
  title?: string;
};

type IconStyle = CSSProperties & {
  "--bb-icon-url": string;
};

export function Icon({ className, name, size = 16, title }: IconProps) {
  const resolvedSize = typeof size === "number" ? `${size}px` : size;
  const style: IconStyle = {
    "--bb-icon-url": `url("${resolveIconUrl(iconSources[name])}")`,
    height: resolvedSize,
    width: resolvedSize,
  };

  return (
    <span
      aria-hidden={title ? undefined : true}
      className={["bb-icon", className].filter(Boolean).join(" ")}
      role={title ? "img" : undefined}
      style={style}
      title={title}
    />
  );
}

function resolveIconUrl(source: string | { src?: string }) {
  return typeof source === "string" ? source : source.src ?? "";
}
