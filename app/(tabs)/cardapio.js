import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import produtosJson from '../../assets/data/produtos.json';
import { styles } from '../../assets/style/styles.js';
import { TextInput } from 'react-native-web';

export default function Cardapio() {
  // Cria um objeto JS como se fosse um dicionário para armazenar as imagens
  const imagensCardapio = {
    'espresso.png': require('../../assets/images/espresso.png'),
    'cappuccino_classico.png': require('../../assets/images/cappuccino_classico.png'),
    'latte_macchiato.png': require('../../assets/images/latte_macchiato.png'),
    'mocha.png': require('../../assets/images/mocha.png'),
    'pao_de_queijo_artesanal.png': require('../../assets/images/pao_de_queijo_artesanal.png'),
    'sanduiche_de_queijo_quente.png': require('../../assets/images/sanduiche_de_queijo_quente.png'),
    'quiche_lorraine.png': require('../../assets/images/quiche_lorraine.png'),
    'baguete_recheada.png': require('../../assets/images/baguete_recheada.png'),
    'croissant_amanteigado.png': require('../../assets/images/croissant_amanteigado.png'),
    'torta_de_maca_com_sorvete.png': require('../../assets/images/torta_de_maca_com_sorvete.png'),
    'brownie_de_chocolate_com_nozes.png': require('../../assets/images/brownie_de_chocolate_com_nozes.png'),
    'bolo_red_velvet.png': require('../../assets/images/bolo_red_velvet.png')
  };

  // Para cada curso em cursosJson:
  //  Junta tudo de cursos.json + caminho de cada imagem em imagensCursos
  const produtos = produtosJson.map((produto) =>
  (
    {
      ...produto,
      imagem: imagensCardapio[produto.imagem],
    }
  )
  );

  const [busca, setBusca] = useState('');

  const produtosFiltrados = produtos.filter(
    (produto) => {
      return produto.titulo.toLowerCase().includes(busca.toLocaleLowerCase())
    })

  return (
    <ScrollView>
      <Header></Header>

      <View>
        {/* CATEGORIAS */}
        <View style={styles.categorias}>
          <Text style={styles.titulo}>Nosso Cardápio</Text>
          <TextInput placeholder='O que você deseja hoje?' value={busca} onChangeText={setBusca} style={styles.buscaProduto}></TextInput>
          <View style={styles.teste}>
            <Link href='/CE' asChild><TouchableOpacity style={styles.btnCategoria}><Text style={styles.textoBtnCategoria}> ☕ Cafés Especiais</Text></TouchableOpacity></Link>
            <Link href='/DS' asChild><TouchableOpacity style={styles.btnCategoria}><Text style={styles.textoBtnCategoria}> 🍰 Doces e Sobremesas</Text></TouchableOpacity></Link>
            <Link href='/SL' asChild><TouchableOpacity style={styles.btnCategoria}><Text style={styles.textoBtnCategoria}> 🥖 Salgados e Lanches</Text></TouchableOpacity></Link>
          </View>
        </View>
      </View>


      {/* ============================================================================================================ */}
      {/* LISTA */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.cardProduto}>
            <View style={styles.cardsDetalhes}>

              <Text style={styles.nomeProduto}>
                {item.titulo}
              </Text>

              <Image style={styles.imagemProduto} source={item.imagem}></Image>

              <Text style={styles.descricaoProduto}>
                {item.descricao}
              </Text>

              <Text style={styles.precoProduto}>
                {(item.preco)}
              </Text>

              <Link href={{
                pathname: '/detalhes', params: {
                  titulo: item.titulo,
                  descricao: item.descricao,
                  preco: item.preco
                }
              }} asChild>
                <TouchableOpacity style={styles.btnDetalhes}>
                  <Text style={styles.textoBtnDetalhes}>
                    Ver detalhes
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )} />

      <Footer></Footer>
    </ScrollView>

  )
}
