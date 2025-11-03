import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Space } from "antd";
import React from "react";
import { Text } from "../text";
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "../graphql/queries";
import dayjs from "dayjs";
import CustomAvatar from "../custom-avatar";

const LatestActivities = () => {
  // audits query
  const {
    query: auditQuery,
  } = useList({
    resource: "audits",
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const { data: auditData, isLoading: isLoadingAudit, isError: isErrorAudit } =
    auditQuery;

  const dealIds = auditData?.data?.map((a) => a?.targetId) ?? [];

  // deals query
  const {
    query: dealsQuery,
  } = useList({
    resource: "deals",
    queryOptions: { enabled: !!dealIds.length },
    pagination: { mode: "off" },
    filters: [{ field: "id", operator: "in", value: dealIds }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });

  const { data: dealsData, isLoading: isLoadingDeals, isError: isErrorDeals } =
    dealsQuery;

  const isLoading = isLoadingAudit || isLoadingDeals;
  const isError = isErrorAudit || isErrorDeals;

  return (
    <Card
      headStyle={{ padding: "16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i }))}
          renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
        />
      ) : isError ? (
        <p>Error loading activities</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={auditData?.data || []}
          renderItem={(item) => {
            const deal = dealsData?.data.find(
              (deal) => deal.id === String(item.targetId)
            );

            return (
              <List.Item>
                <List.Item.Meta
                  title={
                    deal?.createdAt
                      ? dayjs(deal.createdAt).format("MM DD YYYY - HH:mm")
                      : "No Date"
                  }
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company?.avatarUrl}
                      name={deal?.company?.name || "Unknown"}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name || "Unknown User"}</Text>
                      <Text>{item.action === "CREATE" ? "created" : "moved"}</Text>
                      <Text>deal</Text>
                      <Text>{item.action === "CREATE" ? "in" : "to"}</Text>
                      <Text strong>{deal?.stage?.title || "Unknown Stage"}</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default LatestActivities;
