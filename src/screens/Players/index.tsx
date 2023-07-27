import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';

import {Container, Form, HeaderList, NumberOfPlayers } from './styles'

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Filter } from '@components/FIlter';
import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';

import { AppError } from '@utils/AppError';

import { deleteGroup } from '@storage/group/deleteGroup';
import { addPlayerByGroup } from '@storage/player/addPlayerByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerDeleteByGroup } from '@storage/player/playerDeleteByGroup';
import { playersByGroupAndTeam } from '@storage/player/playersByGroupAndTeam';

type RouteParams = {
  group: string,
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const [newPlayerName, setNewPlayerName] = useState('')

  const route = useRoute()
  const { group } = route.params as RouteParams;

  const navigation = useNavigation()

  const newPlayerNameRef = useRef<TextInput>(null)

  useEffect(() => {
    fetchPlayersByTeam()
  }, [players])

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
      
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddPlayerByGroup() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
    }

    const playerData: PlayerStorageDTO = {
      nome: newPlayerName,
      team,
    }

    try {
      await addPlayerByGroup(playerData, group)

      newPlayerNameRef.current?.blur();

      setNewPlayerName('')
      fetchPlayersByTeam()

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar a pessoa');
      }
    }
  }

  async function handleDeletePlayer(playerName: string) {
    try {
      await playerDeleteByGroup(playerName, group);

      fetchPlayersByTeam()
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover a pessoa');
    }
  }

  async function removeGroup() {
    try {
      await deleteGroup(group);

      navigation.navigate('groups')
    } catch (error) {
      console.log(error);
      Alert.alert('Remover grupo', 'Não foi possível remover o grupo');
    }
  }

  function handleRemoveGroup() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        {text: "Não", style: "cancel"},
        {text: "Sim", onPress: () => removeGroup()}
      ]
    )
  }

  return (
    <Container>
        <Header showBackButton />

          <Highlight
            title={group}
            subtitle="adicione a galera e separe os times"
          />

          <Form>
            <Input
              inputRef={newPlayerNameRef}
              placeholder="Nome da participante"
              autoCorrect={false}
              value={newPlayerName}
              onChangeText={setNewPlayerName}
              onSubmitEditing={handleAddPlayerByGroup}
              returnKeyType="done"
            />

            <ButtonIcon
              icon="add"
              onPress={handleAddPlayerByGroup}
            />
          </Form>

          <HeaderList>
            <FlatList 
              data={['Time A', 'Time B']}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <Filter
                  title={item}
                  isActive={item === team}
                  onPress={() => setTeam(item)}
                />
              )}
              horizontal
            />

            <NumberOfPlayers>
              {players.length}
            </NumberOfPlayers>
          </HeaderList>

          {isLoading ? <Loading /> :
            <FlatList 
              data={players}
              keyExtractor={(item) => item.nome}
              renderItem={({item}) => (
                <PlayerCard 
                  name={item.nome}
                  onRemove={() => handleDeletePlayer(item.nome)}
                />
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <ListEmpty
                  message="Não há pessoas nesse time"
                />
              )}
              contentContainerStyle={[
                { paddingBottom: 100 },
                players.length === 0 && { flex: 1 }
              ]}
            />  
          }

          <Button
            title="Remover turma"
            type="SECONDARY"
            onPress={handleRemoveGroup}
          />
    </Container>
  );
}
