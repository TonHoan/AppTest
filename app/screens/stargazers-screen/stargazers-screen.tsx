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

export const StargazersScreen = observer(function StargazersScreen({ route, navigation }) {
  const { userStore } = useStores()
  const { stargazers } = route.params

  const [loading, setLoading] = React.useState<boolean>(true)

  const [stargazersResult, setStargazersResult] = React.useState<any>([])
  const [page, setPage] = React.useState<number>(0)
  const [loadMoreVisible, setLoadMoreVisible] = React.useState<boolean>(true)
  const getUserStargazers = async () => {
    setLoading(true)
    const result: any = await userStore.getStargazers(stargazers.owner.login, stargazers.name, page)
    setLoading(false)
    console.log(result)
    if (result?.length) {
      if (page === 0) {
        setStargazersResult(result)
      } else {
        setStargazersResult(stargazersResult.concat(result))
      }

      setLoadMoreVisible(result.length === 30)
      setPage(page + 1)
    } else {
      setStargazersResult([])
    }
  }

  React.useEffect(() => {
    getUserStargazers()
  }, [])
  const loadMore = () => {
    getUserStargazers()
  }

  const listFooterComponent = () => {
    if (!stargazersResult.length && loading) {
      return <ActivityIndicator animating={true} style={{ margin: 12 }} />
    }

    if (loadMoreVisible && stargazersResult.length) {
      return loading ? (
        <ActivityIndicator animating={true} style={{ margin: 12 }} />
      ) : (
        <Button onPress={loadMore}>LoadMore stargazers</Button>
      )
    }
    return null
  }

  return (
    <View style={style.container}>
      <Appbar.Header>
        <Appbar.BackAction color={color.palette.white} onPress={navigation.goBack} />
        <Appbar.Content title={stargazers.name} style={{ marginLeft: 50 }} />
      </Appbar.Header>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={stargazersResult}
        renderItem={({ item }) => (
          <Card>
            <List.Item title={item.url} />
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
