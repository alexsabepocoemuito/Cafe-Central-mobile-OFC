import { Link } from 'expo-router';
import { useState } from 'react';
import {FlatList,Image,ScrollView,Text,TextInput,TouchableOpacity,View,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import produtosJson from '../../assets/data/produtos.json';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const CHAVE_CARRINHO = '@carrinho';

export default function Cardapio() {
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

  const produtos = produtosJson.map((produto) => ({
    ...produto,
    imagem: imagensCardapio[produto.imagem],
  }));

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(null); // null = "todas"

  const categorias = [
    { chave: 'CE', label: 'Cafés Especiais' },
    { chave: 'DS', label: 'Doces e Sobremesas' },
    { chave: 'SL', label: 'Salgados e Lanches' },
  ];

  const produtosFiltrados = produtos.filter((produto) => {
    const bateBusca = produto.titulo.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria = !categoria || produto.categoria === categoria;
    return bateBusca && bateCategoria;
  });

  const adicionarAoCarrinho = async (produto) => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_CARRINHO);
      const itensAtuais = dados ? JSON.parse(dados) : [];

      // não guardamos "imagem" (require) no JSON do storage, só o nome do arquivo
      const itemExistente = itensAtuais.find((item) => item.id === produto.id);

      let novosItens;
      if (itemExistente) {
        novosItens = itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 }
            : item
        );
      } else {
        novosItens = [
          ...itensAtuais,
          {
            id: produto.id,
            titulo: produto.titulo,
            preco: produto.preco,
            imagemNome: produto.imagemNome, // nome do arquivo, ex: 'espresso.png'
            quantidade: 1,
          },
        ];
      }

      await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(novosItens));
      Alert.alert('Adicionado!', `${produto.titulo} foi adicionado ao carrinho.`);
    } catch (erro) {
      console.log('Erro ao adicionar ao carrinho:', erro);
      Alert.alert('Erro', 'Não foi possível adicionar o item ao carrinho.');
    }
  };

  return (
    <ScrollView>
      {/* HEADER */}
     <Header ativo="cardapio"></Header>

      {/* CATEGORIAS */}
      <View style={styles.categorias}>
        <Text style={styles.titulo}>Nosso Cardápio</Text>

        <TextInput
          placeholder="O que você deseja hoje?"
          value={busca}
          onChangeText={setBusca}
          style={styles.buscaProduto}
        />

        <View style={styles.teste}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.chave}
              style={[
                styles.btnCategoria,
                categoria === cat.chave && styles.btnCategoriaAtivo,
              ]}
              onPress={() =>
                setCategoria(categoria === cat.chave ? null : cat.chave)
              }
            >
              <Text style={styles.textoBtnCategoria}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => String(item.id)}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.cardProduto}>
            <View style={styles.cardsDetalhes}>
              <Text style={styles.nomeProduto}>
                {item.titulo}
              </Text>

              <Image
                style={styles.imagemProduto}
                source={item.imagem}
              />

              <Text style={styles.descricaoProduto}>
                {item.descricao}
              </Text>

              <Text style={styles.precoProduto}>
                {item.preco}
              </Text>

              <View style={styles.acoesProduto}>
                <Link
                  href={{
                    pathname: '/detalhes',
                    params: {
                      titulo: item.titulo,
                      descricao: item.descricao,
                      preco: item.preco
                    }
                  }}
                  asChild
                >
                  <TouchableOpacity style={styles.btnDetalhes}>
                    <Text style={styles.textoBtnDetalhes}>
                      Ver detalhes
                    </Text>
                  </TouchableOpacity>
                </Link>

                <TouchableOpacity
                  style={styles.btnAdicionar}
                  onPress={() => adicionarAoCarrinho(item)}
                >
                  <Text style={styles.textoBtnAdicionar}>
                    Adicionar ao Carrinho
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* RODAPÉ */}
      <Footer></Footer>
    </ScrollView>
  );
}