import { ShopifySession } from "../models/model.js"

export const getUserDetails = async ({ customerId, shop }) => {
  const getSession = await ShopifySession.findOne({ shop });
  try {
    const mutation = `#graphql
        query {
          customer(id: "${customerId}") {
            id
            firstName
            lastName
            email
            phone
            numberOfOrders
            amountSpent {
              amount
              currencyCode
            }
            createdAt
            updatedAt
            note
            verifiedEmail
            validEmailAddress
            tags
            lifetimeDuration
            defaultAddress {
              formattedArea
              address1
            }
            addresses {
              address1
            }
            image {
              src
            }
            canDelete
          }
        }`;
    // const variables = {
    //     "id": `gid://shopify/Order/${orderId}`
    // }

    // const data = await shopifyGraphQLRequest(mutation, variables, getSession);
    const data = await shopifyGraphQLRequest({ mutation, getSession });
    return data
  } catch (error) {
    console.log("User Graph Fetch Error: ", error);
    throw new Error(error);
  }
}

const shopifyGraphQLRequest = async ({ mutation, variables = {}, getSession }) => {
  try {
    const query = mutation;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Shopify-Access-Token", getSession.accessToken);

    const body = JSON.stringify({
      query,
      variables,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow",
    };

    const response = await fetch(
      `https://${getSession.shop}/admin/api/2025-04/graphql.json`,
      requestOptions
    );

    const responseData = await response.json();

    if (responseData.errors) {
      console.error("Shopify GraphQL Errors:", responseData.errors);
      throw new Error("Shopify GraphQL request failed");
    }

    return responseData.data;
  } catch (error) {
    console.error("Catch error in shopifyGraphQLRequest:", error);
    throw new Error(error.message || "Unknown error");
  }
};
