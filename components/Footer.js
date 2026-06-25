import {View, Text, StyleSheet} from 'react-native'
import { Link } from 'expo-router'


export default function Footer(){
    return(
      <View style={styles.rodape}>

        <Text style={styles.textoRodape}> © 2026 Café Central. Todos os direitos reservados.</Text>

        <Link href='/contato' asChild>
          <Text style={styles.linkRodape}>Entre em contato</Text>
        </Link>
      </View>
    )
}

const styles = StyleSheet.create({
    rodape: {
        backgroundColor: '#3b2a1a',
        paddingVertical: 25,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },

    textoRodape: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },

    linkRodape: {
        color: '#e4ad76',
        fontWeight: 'bold',
        fontSize: 15,
    },

})