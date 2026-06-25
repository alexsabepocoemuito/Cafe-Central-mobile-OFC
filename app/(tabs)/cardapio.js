import { Link } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import produtosJson from '../../assets/data/produtos.json';
import { styles } from '../../assets/style/styles.js';

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

  const produtosFiltrados = produtos.filter((produto) => {
    return produto.titulo.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <ScrollView>
      {/* HEADER */}
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/cafecentral.jpg')}
              style={styles.headerLogo}
            />
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/icone_perfil.png')}
              style={styles.iconeLogin}
            />
          </TouchableOpacity>
        </Link>
      </View>

      {/* MENU */}
      <View style={styles.hero}>
        <View style={styles.heroIndex}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Início</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/sobre" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Sobre</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/contato" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text>Contato</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

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
          <Link href="/CE" asChild>
            <TouchableOpacity style={styles.btnCategoria}>
              <Text style={styles.textoBtnCategoria}>
                Cafés Especiais
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/DS" asChild>
            <TouchableOpacity style={styles.btnCategoria}>
              <Text style={styles.textoBtnCategoria}>
                Doces e Sobremesas
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/SL" asChild>
            <TouchableOpacity style={styles.btnCategoria}>
              <Text style={styles.textoBtnCategoria}>
                Salgados e Lanches
              </Text>
            </TouchableOpacity>
          </Link>
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
            </View>
          </View>
        )}
      />

      {/* RODAPÉ */}
      <View style={styles.rodape}>
        <Text style={styles.textoRodape}>
          © 2026 Café Central. Todos os direitos reservados.
        </Text>

        <Link href="/contato" asChild>
          <Text style={styles.linkRodape}>
            Entre em contato
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}