import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {Container, Content, IconGroup } from './styles'

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  function handleCreateGroup() {
    navigation.navigate('players', {group})
  }

  return (
    <Container>
        <Header showBackButton />

        <Content>
          <IconGroup />

          <Highlight
            title="Nova turma"
            subtitle="crie a turma para adicionar as pessoas"
          />

          <Input
            placeholder="Nome da turma"
            value={group}
            onChangeText={setGroup}
          />

          <Button 
            title="Criar"
            onPress={handleCreateGroup}
          />
        </Content>
    </Container>
  );
}
