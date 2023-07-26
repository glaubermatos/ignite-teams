import { FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { Header } from '@components/Header';

import {Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/FIlter';
import { useState } from 'react';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';

type RouteParams = {
  group: string,
}

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState(['Glauber', 'Diego', 'Ana', 'Flávio', 'André', 'Guilherme', 'Luiz Afonso', 'Andrei'])

  const route = useRoute()
  const { group } = route.params as RouteParams;

  return (
    <Container>
        <Header showBackButton />

          <Highlight
            title={group}
            subtitle="adicione a galera e separe os times"
          />

          <Form>
            <Input
              placeholder="Nome da participante"
              autoCorrect={false}
            />

            <ButtonIcon
              icon="add"
            />
          </Form>

          <HeaderList>
            <FlatList 
              data={["Time A", "Time B", "Time C"]}
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

          <FlatList 
            data={players}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <PlayerCard 
                name={item}
                onRemove={() => {}}
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

          <Button
            title="Remover turma"
            type="SECONDARY"
          />
    </Container>
  );
}
