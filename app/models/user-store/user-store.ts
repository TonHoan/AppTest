import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Alert } from "react-native"
import { SearchUserResult, LoadRepos, getStargazers } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .extend(withEnvironment)
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    searchUsers: flow(function* (username) {
      const result: SearchUserResult = yield self.environment.api.searchUser(username)
      if (result.kind === "ok") {
        return result.data
      } else {
        Alert.alert("Khong tim thay user")
        return undefined
      }
    }),
    getUserRepos: flow(function* (username, page = 0, perPage = 30) {
      const result: any = yield self.environment.api.getUserRepos(username, page, perPage)

      if (result.kind === "ok") {
        return result.data
      } else {
        return undefined
      }
    }),
    getStargazers: flow(function* (username, name, page = 0, perPage = 30) {
      const result: any = yield self.environment.api.getStargazers(username, name, page, perPage)

      if (result.kind === "ok") {
        return result.data
      } else {
        return undefined
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
