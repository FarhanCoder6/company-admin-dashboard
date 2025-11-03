import React from "react";
import { CompanyList } from "./list";
import { Form, Input, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/component/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/component/graphql/queries";
import SelectOptionWithAvatar from "@/component/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";
import { data } from "react-router";

const Create = () => {
    const go = useGo();

    const goToListPage = () => {
        go({
            to: { resource: "companies", action: "list" },
            options: { keepQuery: true },
            type: "replace",
        });
    };

    const { formProps, modalProps } = useModalForm({
        action: "create",
        defaultVisible: true,
        resource: "companies",
        redirect: false,
        mutationMode: "pessimistic",
        onMutationSuccess: goToListPage,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION,
        },
    });

    const { selectProps,queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: "users",
        optionLabel: "name",
        meta: {
            gqlQuery: USERS_SELECT_QUERY,
        },
    });

    return (
        <CompanyList>
            <Modal
                {...modalProps}
                mask={true}
                onCancel={goToListPage}
                title="Create Company"
                width={512}
            >
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Company Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Please enter the company name" />
                    </Form.Item>

                    <Form.Item
                        label="Sales Owner"
                        name="salesOwnerId"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Please select the Sales Owner"
                            {...selectProps}
                            options={selectProps?.options?.map((option) => ({
                                value: option.value,
                                label: (
                                    <SelectOptionWithAvatar
                                        name={String(option.label)}
                                        avatarUrl={option.avatarUrl ?? undefined}
                                    />
                                ),
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </CompanyList>
    );
};

export default Create;
