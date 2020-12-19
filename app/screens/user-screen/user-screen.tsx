import React from "react"
import { TextStyle, View, ViewStyle, FlatList, StyleSheet } from "react-native"
import {
  Text,
  Appbar,
  List,
  Avatar,
  Card,
  ActivityIndicator,
  Title,
  Button,
} from "react-native-paper"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { useStores } from "../../models"
import { TouchableOpacity } from "react-native-gesture-handler"

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    marginLeft: 250,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#CC0",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

export const UserScreen = observer(function UserScreen({ route, navigation }) {
  const { userStore } = useStores()
  const { user } = route.params

  const [loading, setLoading] = React.useState<boolean>(true)
  const [repos, setRepos] = React.useState<any>([])
  const [page, setPage] = React.useState<number>(0)
  const [loadMoreVisible, setLoadMoreVisible] = React.useState<boolean>(true)
  const getRepos = async () => {
    setLoading(true)
    const result: any = await userStore.getUserRepos(user.login, page)
    setLoading(false)
    console.log(result)
    if (result?.length) {
      if (page === 0) {
        setRepos(result)
      } else {
        setRepos(repos.concat(result))
      }

      setLoadMoreVisible(result.length === 30)
      setPage(page + 1)
    } else {
      setRepos([])
    }
  }

  React.useEffect(() => {
    getRepos()
  }, [])
  const loadMore = () => {
    getRepos()
  }

  const listFooterComponent = () => {
    if (!repos.length && loading) {
      return <ActivityIndicator animating={true} style={{ margin: 12 }} />
    }

    if (loadMoreVisible && repos.length) {
      return loading ? (
        <ActivityIndicator animating={true} style={{ margin: 12 }} />
      ) : (
        <Button onPress={loadMore}>LoadMore</Button>
      )
    }
    return null
  }
  const openStargazers = (stargazers) => () => {
    navigation.navigate("stargazers", { stargazers })
  }

  return (
    <View style={style.container}>
      <Appbar.Header>
        <Appbar.BackAction color={color.palette.white} onPress={navigation.goBack} />
        <Appbar.Content title={user.login} subtitle={user.id} />
        <Avatar.Image size={40} source={{ uri: user.avatar_url }} />
      </Appbar.Header>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={repos}
        renderItem={({ item }) => (
          <Card>
            <List.Item
              onPress={openStargazers(item)}
              title={item.name}
              description={item.stargazers_count || "0"}
              left={(props) => <Avatar.Icon size={40} {...props} icon="folder" />}
              right={(props) => <Button>Load stargazers</Button>}
            />
          </Card>
        )}
        ListFooterComponent={listFooterComponent}
        ListEmptyComponent={
          !loading && <Title style={{ marginTop: 22, textAlign: "center" }}>Don't have data</Title>
        }
      />
    </View>
  )
})
