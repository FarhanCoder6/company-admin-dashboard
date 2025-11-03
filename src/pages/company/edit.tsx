import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/component/graphql/mutations";
import CustomAvatar from "@/component/custom-avatar";
import { getNameInitials } from "@/utilities";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";
import { USERS_SELECT_QUERY } from "@/component/graphql/queries";
import SelectOptionWithAvatar from "@/component/select-option-with-avatar";
import { businessTypeOptions, companySizeOptions, industryOptions } from "@/constants";
import { CompanyContactsTable } from "./contacts-table";
import { User } from "@/graphql/schema.types";

const Editpage = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps, queryResult: queryResultUsers } =
    useSelect<GetFieldsFromList<UsersSelectQuery>>({
      resource: "users",
      optionLabel: "name",
      pagination: {
        mode: "off",
      },
      meta: {
        gqlQuery: USERS_SELECT_QUERY,
      },
    });

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} xl={12}>
        <Edit
          isLoading={formLoading}
          saveButtonProps={saveButtonProps}
          breadcrumb={false}
        >
          <Form {...formProps} layout="vertical">
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{ width: 96, height: 96, marginBottom: "24px" }}
            />

            <Form.Item
              label="Sales Owner"
              name="salesOwnerId"
              initialValue={formProps?.initialValues?.salesOwner?.id}
            >
              <Select
                placeholder="Please select the Sales Owner"
                {...selectProps}
                options={queryResultUsers?.data?.data?.map((user:User) => ({
                  value: user.id,
                  label: (
                    <SelectOptionWithAvatar
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  ),
                }))}
              />
            </Form.Item>

            <Form.Item name="companySize" label="Company Size">
              <Select options={companySizeOptions} />
            </Form.Item>

            {/* ✅ Fixed field */}
            <Form.Item name="annualRevenue" label="Annual Revenue">
              <InputNumber
                autoFocus
                addonBefore="$"
                min={0}
                placeholder="0,00"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item name="industry" label="Industry">
              <Select options={industryOptions} />
            </Form.Item>

            <Form.Item name="businessType" label="Business Type">
              <Select options={businessTypeOptions} />
            </Form.Item>

            <Form.Item name="country" label="Country">
              <Input placeholder="Country" />
            </Form.Item>

            <Form.Item name="website" label="Website">
              <Input placeholder="Website" />
            </Form.Item>
          </Form>
        </Edit>
      </Col>
      <Col xs={24} xl={12}>
      <CompanyContactsTable/>
      </Col>
    </Row>
  );
};

export default Editpage;
