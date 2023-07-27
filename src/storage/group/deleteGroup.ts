import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupsGetAll';

export async function deleteGroup(groupName: string) {
    try {
        const storedGroups = await groupsGetAll();
        const filteredGroup = storedGroups.filter(group => group !== groupName)

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filteredGroup))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

      } catch (error) {
        throw error
      }
}