import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Detalhes() {

  const {
    titulo,
    imagem,
    descricao,
    preco
  } = useLocalSearchParams();

  return (

    <ScrollView>
      <Header ativo="detalhes"></Header>


      {/* CONTEÚDO */}
      { /*=========== CONTEÚDO DA PÁGINA =============*/}
      <View style={styles.cardProduto}>
        <Text style={styles.etiqueta}>Detalhes do Produto</Text>
        <View style={styles.cardsDetalhes}>
          {/* Aqui irão os dados do curso */}
          <Text style={styles.nomeProduto}>{titulo}</Text>

          <Text style={styles.descricaoProduto}>{descricao}</Text>

          <Text style={styles.precoProduto}>{preco}</Text>
        </View>

        <View style={styles.Voltar}>
          <Link href="/cardapio">
            <TouchableOpacity style={styles.btnVoltar}>
              <Text style={styles.textoBtnVoltar}> Voltar ao Cardapio</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <Footer></Footer>
    </ScrollView>

  );
}