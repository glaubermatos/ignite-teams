import { Header } from '@components/Header'
import {Container } from './styles'
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from 'react-native';
import { Button } from '@components/Button';
import { useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';

export function Group() {
  const [groups, setGroups] = useState<string[]>([])

  return (
    <Container>
      <Header />

      <Highlight
        title="Turmas"
        subtitle="jogue com a sua turma"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <GroupCard
            title={item}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => (
          <ListEmpty
            message="Que tal cadastrar a primeira turma?"
          />
        )}
      />

      <Button
        title='Criar nova turma'
      />
      
    </Container>
  );
}
