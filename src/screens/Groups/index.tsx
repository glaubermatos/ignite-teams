import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import {Container } from './styles'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  useFocusEffect(useCallback(() => {
      fetchGroups()
  }, []))

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const storagedGroups = await groupsGetAll()

      setGroups(storagedGroups)
      
    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', "Não foi possível carregar as turmas")
    } finally {
      setIsLoading(false)
    }
  }

  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', {group})
  }

  return (
    <Container>
      <Header />

      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />

      {
        isLoading ? <Loading /> : 
        <FlatList
          data={groups}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
          ListEmptyComponent={() => (
            <ListEmpty
              message="Que tal cadastrar a primeira turma?"
            />
          )}
        /> 
      }

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
      
    </Container>
  );
}
