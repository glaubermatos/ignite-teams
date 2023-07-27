import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {Container, Content, IconGroup } from './styles'

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation()

  async function handleCreateGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome do grupo') 
      }

      await groupCreate(group)

      navigation.navigate('players', {group})
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message)
      }else{
        Alert.alert('Não foi possível criar o novo grupo')
        console.log(error)
      }

    }
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
