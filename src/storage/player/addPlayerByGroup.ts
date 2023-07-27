import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroup } from './playersGetByGroup';
import { AppError } from '@utils/AppError';

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await playersGetByGroup(group)

        const playerAllreadyExists = storedPlayers.filter(player => player.nome === newPlayer.nome)

        if (playerAllreadyExists.length > 0) {
            throw new AppError('Essa pessoa já esta adicionada em um time')
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
    } catch (error) {
        throw error;
    }
}