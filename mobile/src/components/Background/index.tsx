import { ImageBackground } from 'react-native';
import { styles } from './styles';

interface Props {
  children: React.ReactNode;
}

import backgroundImg from '../../assets/background-galaxy.png';

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.container}
      // O defaultSource memoriza a imagem da aplicação para que ela seja carregada mais rápido
      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  )
}
