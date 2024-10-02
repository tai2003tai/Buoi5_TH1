import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RouterService from "../routers/RouterService";
import Transaction from "./Transaction";
import Customers from "./Customer";
import Setting from "./Setting";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator
      initialRouteName="RouterService"
      shifting={true} // Optional: for shifting animation
      labeled={false} // Optional: to hide labels
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "RouterService") {
            iconName = "home";
          } else if (route.name === "Transaction") {
            iconName = "cash";
          } else if (route.name === "Customers") {
            iconName = "account";
          } else if (route.name === "Setting") {
            iconName = "cog";
          }

          return <Icon name={iconName} color={color} size={24} />;
        },
      })}
    >
      <Tab.Screen
        name="RouterService"
        component={RouterService}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{ tabBarLabel: "Transaction" }}
      />
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{ tabBarLabel: "Customers" }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{ tabBarLabel: "Setting" }}
      />
    </Tab.Navigator>
  );
};

export default Admin;
