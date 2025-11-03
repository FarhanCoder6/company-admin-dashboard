import { DashboardTotalCountCard, DealChart, LatestActivities, UpcomingEvents } from "@/component";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/component/graphql/queries";
import { DashboardTotalCountsQuery } from "@/graphql/types";
import { useCustom } from "@refinedev/core";
import { Col, Row } from "antd";

export const Home = () => {
  const { query } = useCustom<DashboardTotalCountsQuery>({
    url: "", // GraphQL endpoint
    method: "post",
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });

  // Now get values from query
  const { data, isLoading, isError } = query;

  // Extract data from GraphQL response
  const companiesTotal = data?.data?.companies?.totalCount;
  const contactsTotal = data?.data?.contacts?.totalCount;
  const dealsTotal = data?.data?.deals?.totalCount;

  console.log("GraphQL Response:", data);

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="companies"
            isLoading={isLoading}
            totalCount={companiesTotal || 0}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="contacts"
            isLoading={isLoading}
            totalCount={contactsTotal || 0}
          />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="deals"
            isLoading={isLoading}
            totalCount={dealsTotal || 0}
          />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={8} style={{ height: "460px" }}>
          <UpcomingEvents />
        </Col>

        <Col xs={24} sm={24} xl={16} style={{ height: "460px" }}>
          <DealChart />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24}>
          <LatestActivities />
        </Col>
      </Row>
    </div>
  );
};
