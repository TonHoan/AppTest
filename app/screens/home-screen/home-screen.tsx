import React from "react"
import { TextStyle, View, ViewStyle, ActivityIndicator, FlatList } from "react-native"
import { Text, Button, TextInput, Appbar, Searchbar, List, Avatar } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { useStores } from "../../models"
import { SearchUserResult, User } from "../../services/api"
import { async, result } from "validate.js"
import { values } from "ramda"
import ListItem from "react-native-paper/lib/typescript/components/List/ListItem"
import api from "@storybook/addon-storyshots"
import { TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { Item } from "react-native-paper/lib/typescript/components/List/List"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  flex: 1,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const InputStyle: ViewStyle = {
  backgroundColor: "#FFFF",
  width: 322,
}
const styles = StyleSheet.create({
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#CC0",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

export const HomeScreen = observer(function HomeScreen() {
  const { userStore } = useStores()
  const navigation = useNavigation()
  const [username, setUsername] = React.useState<string>("")
  const [loading, setLoading] = React.useState<boolean>(false)
  const [users, setUsers] = React.useState<any>([])

  const onSearch = async (value) => {
    setUsername(value)
    if (value && value.length > 1) {
      setLoading(true)
      const result: SearchUserResult = await userStore.searchUsers(value)
      setLoading(false)
      if (result?.items?.length) {
        setUsers(result.items)
      } else {
        setUsers([])
      }
    }
  }
  const openUser = (user) => () => {
    navigation.navigate("user", { user })
  }
  return (
    <View style={FULL}>
      <Appbar.Header>
        <Searchbar placeholder="Username" onChangeText={onSearch} value={username} />
      </Appbar.Header>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={users}
        renderItem={({ item }) => (
          <List.Item
            onPress={openUser(item)}
            title={item.login}
            description={item.id}
            left={(props) => <Avatar.Image size={50} source={{ uri: item.avatar_url }} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
      />
    </View>
  )
})
