import React, { ReactNode } from "react";
import { useScreenType } from "../shared-hooks/useScreenType";
import { useIsElectronMobile } from "../global-stores/useElectronMobileStore";

export interface ProfileHeaderWrapperProps {
  children: ReactNode;
  coverUrl: string;
}

export const ProfileHeaderWrapper: React.FC<ProfileHeaderWrapperProps> = ({
  children,
  coverUrl,
  ...props
}) => {
  return (
    <div
      className="bg-primary-800 rounded-8 relative"
      {...props}
      style={useIsElectronMobile() ? { marginTop: "30px" } : {}}
    >
      <img
        alt="cover"
        src={coverUrl}
        className="rounded-t-8 w-full object-cover"
        style={{ height: "155px" }}
      />
      <div className="container mx-auto flex p-4 relative">{children}</div>
    </div>
  );
};
