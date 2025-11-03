import { Popover, Button, Typography } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import CustomAvator from "../custom-avatar";
import { useGetIdentity } from "@refinedev/core";
import type { User } from "../../graphql/schema.types";
import { useState } from "react";
import { AccountSettings } from "./account-settings";

const { Text } = Typography;

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>

      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Button
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
    <Popover
      placement="bottomRight"
      trigger="click"
      overlayInnerStyle={{ padding: 0 }}
      overlayStyle={{ zIndex: 999 }}
      content={content} // ✅ Popover content
    >
      <CustomAvator
        name={user?.name || "Guest"}
        src={user?.avatarUrl}
        size="default"
        style={{ cursor: "pointer" }}
      />
    </Popover>
    {user && (
        <AccountSettings
        opened={isOpen}
        setOpened={setIsOpen}
        userId={user.id}
        />
      )}
    </>
  );
};

export default CurrentUser;
