import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchRole = (role) => {
  const [roleList, setRoleList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDate() {
      var roles;
      try {
        const response = await axios.get(
          "http://crm-lb-353213555.us-east-1.elb.amazonaws.com:8083/union/v1/clients/roles",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        roles = response;
      } catch (error) {
        console.error(error);
      }
      setRoleList(
        roles.data.role_list.map((item) => ({
          id: item.role_id,
          value: item.role_id,
          label: item.role_name,
        }))
      );
    }
    loadDate();
  }, []);

  return {
    roleList,
    loading,
  };
};
