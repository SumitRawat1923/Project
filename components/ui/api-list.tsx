"use client";
import React from "react";
import ApiAlert from "./api-alert";
import useOrigin from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

function ApiList({ entityIdName, entityName }: ApiListProps) {
  const origin = useOrigin();
  const baseUrl = `${origin}/api`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="Delete"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
}

export default ApiList;
