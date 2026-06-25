import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function DS() {
    return (

        <ScrollView>
            <Header ativo="DS"></Header>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* CONTEÚDO */}

            {/* ITEM 9 */}
            <View style={styles.cardProduto}>
                <Text style={styles.titulo}>🍰 Doces e Sobremesas</Text>
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Croissant Amanteigado </Text>
                    <Image source={require('../../assets/images/croissant_amanteigado.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Crocante por fora, macio por dentro, com o sabor inconfundível da manteiga. Perfeito para acompanhar seu café.</Text>
                    <Text style={styles.precoProduto}> R$ 7,00 </Text>
                </View>
                {/*------------------------------------------------------------------------------------------------------*/}
                {/* ITEM 10 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Torta de Maçã com Sorvete </Text>
                    <Image source={require('../../assets/images/torta_de_maca_com_sorvete.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Fatias de maçã caramelizada em uma massa crocante, servida quente com uma bola de sorvete de creme.</Text>
                    <Text style={styles.precoProduto}> R$ 8,00 </Text>
                </View>
                {/*------------------------------------------------------------------------------------------------------*/}
                {/* ITEM 11 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Brownie de Chocolate com Nozes </Text>
                    <Image source={require('../../assets/images/brownie_de_chocolate_com_nozes.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Intenso e úmido, com pedaços crocantes de nozes. Uma explosão de sabor a cada mordida.</Text>
                    <Text style={styles.precoProduto}> R$ 7,00 </Text>
                </View>
                {/*------------------------------------------------------------------------------------------------------*/}
                {/* ITEM 12 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Bolo Red Velvet </Text>
                    <Image source={require('../../assets/images/bolo_red_velvet.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Um clássico americano, com camadas de bolo aveludado de chocolate e um cremoso recheio de cream cheese.</Text>
                    <Text style={styles.precoProduto}> R$ 9,00 </Text>
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
