import { Link } from 'expo-router';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function SL() {
    return (
        <ScrollView>
            <Header ativo="SL"></Header>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* CONTEÚDO */}

            {/* ITEM 5 */}
            <View style={styles.cardProduto}>
                <Text style={styles.titulo}>🥖 Salgados e Lanches</Text>
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Pão de Queijo Artesanal</Text>
                    <Image source={require('../../assets/images/pao_de_queijo_artesanal.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Delicioso pão de queijo artesanal, feito com leite e queijo fresco. O sabor autêntico que encanta todos os paladares.</Text>
                    <Text style={styles.precoProduto}>R$ 6,00</Text>
                </View>

                {/*------------------------------------------------------------------------------------------------------*/}

                {/* ITEM 6 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Sanduíche de Queijo Quente</Text>
                    <Image source={require('../../assets/images/sanduiche_de_queijo_quente.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Pão de forma tostado com queijo mussarela derretido. Simples e delicioso.</Text>
                    <Text style={styles.precoProduto}>R$ 8,00</Text>
                </View>

                {/*------------------------------------------------------------------------------------------------------*/}

                {/* ITEM 7 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Quiche Lorraine</Text>
                    <Image source={require('../../assets/images/quiche_lorraine.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Uma torta salgada clássica francesa, com recheio cremoso de bacon e queijo. Servida com uma pequena salada verde.</Text>
                    <Text style={styles.precoProduto}>R$ 5,00</Text>
                </View>

                {/*------------------------------------------------------------------------------------------------------*/}

                {/* ITEM 8 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Baguete Recheada</Text>
                    <Image source={require('../../assets/images/baguete_recheada.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Baguete crocante recheada com presunto, queijo e tomate fresco. Ideal para um lanche rápido e saboroso.</Text>
                    <Text style={styles.precoProduto}>R$ 9,00</Text>
                </View>

                <View style={styles.Voltar}>
                    <Link href="/cardapio">
                        <TouchableOpacity style={styles.btnVoltar}>
                            <Text style={styles.textoBtnVoltar}> Voltar ao Cardapio</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* RODAPE */}
            <View style={styles.rodape}>
                <Text style={styles.textoRodape}> © 2026 Café Central. Todos os direitos reservados.</Text>
                <Link href='/contato'>
                    <Text style={styles.linkRodape}>Entre em contato</Text>
                </Link>
            </View>
            <Footer></Footer>
        </ScrollView>
    );
}