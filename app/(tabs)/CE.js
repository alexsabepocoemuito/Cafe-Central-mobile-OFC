import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CE() {
    return (
        <ScrollView>
            <Header ativo="CE"></Header>

            {/*------------------------------------------------------------------------------------------------------*/}
            {/* CONTEÚDO */}

            {/* ITEM 1 */}
            <View style={styles.cardProduto}>
                <Text style={styles.titulo}>☕ Cafés Especiais</Text>
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Espresso</Text>
                    <Image source={require('../../assets/images/espresso.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Um shot concentrado e aromático do nosso blend especial, com crema perfeita. Ideal para os amantes do café puro.</Text>
                    <Text style={styles.precoProduto}>R$ 3,00</Text>
                </View>
                {/*------------------------------------------------------------------------------------------------------*/}
                {/* ITEM 2 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Cappuccino Clássico</Text>
                    <Image source={require('../../assets/images/cappuccino_classico.png')} style={styles.imagemProduto} />
                    <Text style={styles.descricaoProduto}>Uma bebida encorpada, com sabor equilibrado, sem chocolate e servida com um toque de canela por cima, oferecendo textura aveludada e aroma intenso.</Text>
                    <Text style={styles.precoProduto}>R$ 8,00</Text>
                </View>
                {/*------------------------------------------------------------------------------------------------------*/}
                {/* ITEM 3 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Latte Macchiato</Text>
                    <Image style={styles.imagemProduto} source={require('../../assets/images/latte_macchiato.png')} />
                    <Text style={styles.descricaoProduto}>
                        Leite vaporizado delicadamente manchado com um shot de espresso,
                        criando camadas visíveis e um sabor suave e cremoso.
                    </Text>
                    <Text style={styles.precoProduto}>R$ 8,00</Text>
                </View>
                {/*------------------------------------------------------------------------------------------------------*/}
                {/* ITEM 4 */}
                <View style={styles.cardsDetalhes}>
                    <Text style={styles.nomeProduto}>Mocha</Text>
                    <Image style={styles.imagemProduto} source={require('../../assets/images/mocha.png')} />
                    <Text style={styles.descricaoProduto}>
                        Uma deliciosa combinação de espresso, chocolate premium, leite vaporizado e chantilly, para um toque de indulgência.
                    </Text>
                    <Text style={styles.precoProduto}>R$ 7,00</Text>
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