import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Index() {
  return (
      <ScrollView>
        {/* TOPO - HEADER*/}
        <Header ativo="inicio"></Header>
          {/* ============================================================================================================ */}
          {/* Desenvolver Aqui */}
          <View style={styles.heroConteudo}>
            <View style={styles.imagemContainer}>
              <Image
                source={require('../../assets/images/cafe_central_interior.jpg')}
                style={styles.imagemCafe}
              />
            </View>
            <Text style={styles.heroTexto1}>Bem vindo ao</Text>
            <Text style={styles.heroTexto2}>Café Central Mobile!</Text>
          </View>

          <View style={styles.heroSecundario}>
            <Text style={styles.textoLogin}> Faça login para ter acesso total aos nossos recursos!</Text>
            <Link href='/login' asChild>
              <TouchableOpacity style={styles.btnAuth}>
                <Text style={styles.textoBtnAuth}>Fazer Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        {/* ============================================================================================================ */}

        <Footer></Footer>
      </ScrollView>
  );
}
/*----------------------------------------------------------------------------------------------------------------------*/