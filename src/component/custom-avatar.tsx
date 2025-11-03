import { getNameInitials } from "@/utilities";
import { Avatar as AntdAvatar } from "antd";
import type { AvatarProps } from "antd";

type Props = AvatarProps & {
  name: string;
};

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style, // allow external styles
      }}
      {...rest}
    >
      {getNameInitials(name || '')}
    </AntdAvatar>
  );
};

export default CustomAvatar;
