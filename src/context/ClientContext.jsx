import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const [client, setClient] = useState([{}]);

  useEffect(() => {
    if(localStorage.getItem("token")){
    loadData();
    }
  }, []);

  const loadData = async () => {
    var clients;
    
    try {
      const response = await axios.get(
        "http://crm-lb-353213555.us-east-1.elb.amazonaws.com:8083/union/v1/clients/mygroups",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      clients = response;
    } catch (error) {
      console.error(error.response);
    }
    setClient(
      clients.data.list.map((item) => ({
        id: item.client_id,
        status: item.status_description,
        email: item.client_email,
        client: item.client_name,
        role_id: item.role_id,
        textRole: item.role_name,
        customer_id: item.customer_id,
        textCustomer: item.customer_name,
        business_id: item.business_id,
        textBusiness: item.business_name,
        release_id: item.release.release_id,
        textRelease: item.release.release_name,
        user_id: item.user_id,
        user_name: item.user_name,
        tags: item.tags
          ? item.tags.map((tag) => ({ value: tag.tag_id, label: tag.tag_name }))
          : [],
      }))

      
    );
   /* console.log(clients.data.list)*/
    
  };
  return (
    <ClientContext.Provider value={{ client, setClient, loadData }}>
      {children}
    </ClientContext.Provider>
  );
};

/*
const subjectsList = [
  {
    id: 1,
    status: "Active",
    email: "igorsena@tcs.com",
    client: "Igor Sena Soares Silva",
    textRole: "Analyst DevOps",
    textCustomer: "Itaú",
    textBusiness: "Infraestrutura e Operações TI",
    textRelease: "Experiência Digital",
    tags: [
      { value: 6, label: "Azure", color: "#3ddc97" },
      { value: 12, label: "Demand Drafts", color: "#6CB4EE" },
      { value: 1, label: "Online Banking", color: "#FFB2D1" },
    ],
  },
*/
