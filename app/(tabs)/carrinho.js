import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Link } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CHAVE_CARRINHO = '@carrinho';

// Converte "R$ 8,00" -> 8.00
function parsePreco(preco) {
  return Number(String(preco).replace('R$', '').replace(',', '.').trim()) || 0;
}

function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export default function Carrinho() {
  const [itens, setItens] = useState([]);

  const carregarCarrinho = useCallback(async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_CARRINHO);
      setItens(dados ? JSON.parse(dados) : []);
    } catch (erro) {
      console.log('Erro ao carregar carrinho:', erro);
    }
  }, []);

  // Recarrega sempre que a tela ganha foco (ex: voltando de "detalhes")
  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [carregarCarrinho])
  );

  const salvarCarrinho = async (novosItens) => {
    setItens(novosItens);
    await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(novosItens));
  };

  const removerItem = (id) => {
    const novosItens = itens.filter((item) => item.id !== id);
    salvarCarrinho(novosItens);
  };

  const alterarQuantidade = (id, delta) => {
    const novosItens = itens
      .map((item) =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, (item.quantidade || 1) + delta) }
          : item
      );
    salvarCarrinho(novosItens);
  };

  const limparCarrinho = () => {
    Alert.alert(
      'Limpar carrinho',
      'Tem certeza que deseja remover todos os itens?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: () => salvarCarrinho([]) },
      ]
    );
  };

  const finalizarPedido = () => {
    if (itens.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens antes de finalizar o pedido.');
      return;
    }
    // TODO: integrar com fluxo real de checkout
    Alert.alert('Pedido finalizado', 'Seu pedido foi enviado com sucesso!');
    salvarCarrinho([]);
  };

  const valorTotal = itens.reduce(
    (soma, item) => soma + parsePreco(item.preco) * (item.quantidade || 1),
    0
  );

  return (
    <ScrollView>
      {/* HEADER */}
      <Header ativo="carrinho"></Header>

      <View style={styles.categoriasBackGround}>
        <View style={styles.categorias}>
          <Text style={styles.titulo}>Seu Carrinho</Text>
        </View>

        {/* LISTA DE ITENS */}
        <View style={styles.carrinhoLista}>
          {itens.length === 0 ? (
            <Text style={styles.carrinhoVazio}>Seu carrinho está vazio.</Text>
          ) : (
            itens.map((item) => (
              <View key={item.id} style={styles.carrinhoItem}>
                {item.imagem && (
                  <Image style={styles.carrinhoItemImagem} source={item.imagem} />
                )}

                <View style={styles.carrinhoItemInfo}>
                  <Text style={styles.carrinhoItemTitulo}>{item.titulo}</Text>
                  <Text style={styles.carrinhoItemPreco}>{item.preco}</Text>

                  <View style={styles.carrinhoQuantidade}>
                    <TouchableOpacity onPress={() => alterarQuantidade(item.id, -1)}>
                      <Text style={styles.carrinhoQuantidadeBtn}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.carrinhoQuantidadeValor}>
                      {item.quantidade || 1}
                    </Text>

                    <TouchableOpacity onPress={() => alterarQuantidade(item.id, 1)}>
                      <Text style={styles.carrinhoQuantidadeBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removerItem(item.id)}>
                  <Text style={styles.carrinhoRemover}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* RESUMO */}
        <View style={styles.carrinhoResumo}>
          <Text style={styles.carrinhoResumoTitulo}>Resumo</Text>

          <View style={styles.resumoItem}>
            <Text>Subtotal:</Text>
            <Text>{formatarPreco(valorTotal)}</Text>
          </View>

          <View style={styles.resumoItem}>
            <Text>Entrega:</Text>
            <Text>Grátis</Text>
          </View>

          <View style={styles.resumoTotal}>
            <Text>Total:</Text>
            <Text>{formatarPreco(valorTotal)}</Text>
          </View>

          <TouchableOpacity style={styles.btnFinalizar} onPress={finalizarPedido}>
            <Text style={styles.textoBtnFinalizar}>Finalizar Pedido</Text>
          </TouchableOpacity>

          <Link href="/cardapio" asChild>
            <TouchableOpacity style={styles.btnContinuar}>
              <Text style={styles.textoBtnContinuar}>Continuar Comprando</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            style={[styles.btnContinuar, styles.btnLimpar]}
            onPress={limparCarrinho}
          >
            <Text style={styles.textoBtnContinuar}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* RODAPÉ */}
      <Footer></Footer>
    </ScrollView>
  );
}