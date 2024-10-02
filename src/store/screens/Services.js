import { Image, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const Services = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../image/logo.jpeg")}
        style={{ alignSelf: "center", marginVertical: 50 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 49, fontWeight: "bold" }}>
          Danh sách dịch vụ
        </Text>
        <IconButton
          icon={"plus-circle"}
          iconColor="red"
          size={40}
          onPress={() => navigation.navigate("AddNewService")}
        />
      </View>
    </View>
  );
};

export default Services;
