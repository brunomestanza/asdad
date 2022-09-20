import { useState, useEffect } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

interface RouteParams {
  id: string;
  title: string;
  bannerUrl: string;
}

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const navigate = useNavigation();
  const route = useRoute();
  const game = route.params as RouteParams;

  useEffect(() => {
    fetch(`http://192.168.1.102:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data));
  }, []);

  function handleGoBack() {
    navigate.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}/>
        </View>
        <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode='cover' />
        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />
        <FlatList
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios disponíveis</Text>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={duos.length === 0 ? styles.emptyListContent : styles.contentList}
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => {}} data={item} />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}