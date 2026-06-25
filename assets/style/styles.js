import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    // =======================================================================================================
    /* ================= HEADER ================= */
    header: {
        backgroundColor: '#e6e2e2',
    },

    headerLogo: {
        flex: 'flex-grow',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#e6e2e2',
        width: '100%',
        height: 140,
        resizeMode: "contain",
    },

    iconeLogin: {
        alignSelf: 'flex-end',
        width: '20%',
        height: 50,
        resizeMode: "contain",
        marginBottom: 10
    },

    menuItem: {
        color: '#000000',
        backgroundColor: '#fff',
        padding: 15,
        fontSize: 15,
        alignItems: 'center',
        borderRadius: 8,
        margin: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },

    // =======================================================================================================
    /* ================= INDEX   ================= */
    hero: {
        backgroundColor: '#745739',
    },

    heroIndex: {
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
        elevation: 5,
    },

    imagemContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },

    imagemCafe: {
        width: 850,
        height: 550,
        borderRadius: 20,
        width: '90%',
        height: 250,
        alignItems: 'center',
        marginTop: 20,
    },
    //ou
    /* imagemCafe: {
        width: '90%',
        height: 250,
        borderRadius: 20,
        alignSelf: 'center',
    }, */

    heroConteudo: {
        padding: 20,
        backgroundColor: '#745739',
    },

    heroTexto1: {
        color: '#e4ad76',
        fontSize: 20,
        fontWeight: 'medium',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 30
    },

    heroTexto2: {
        backgroundColor: '#745739',
        color: '#e4ad76',
        fontSize: 35,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 70,
        textAlign: 'center',
    },

    heroSecundario: {
        width: '10',
        height: '100',
        backgroundColor: '#202427',
        padding: 40,
        alignItems: 'center',
        justifyContent: 'space-betwee',
    },

    textoLogin: {
        color: '#e4ad76',
        fontSize: 15,
        padding: 20,
        textAlign: "center"
    },

    // =======================================================================================================
    /* ================= SOBRE ================= */
    heroConteudo: {
        backgroundColor: '#745739'
    },

    heroSobre: {
        backgroundColor: '#ab886d',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        margin: 30,
    },

    h1: {
        alignItems: 'center',
        color: '#e4ad76',
        fontSize: 35,
        fontWeight: 'bold',
    },

    textoSobre1: {
        color: '#ffffff',
        marginTop: 15,
        textAlign: 'center',
        fontSize: 15,
    },

    textoSobre2: {
        color: '#ffffff',
        marginTop: 15,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 15,
    },

    // =======================================================================================================
    /* ================= CONTATO | LOGIN | CADASTRO ================= */
    container: {
        backgroundColor: '#745739',
        padding: 20,
    },

    pagina: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        // Shadow para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    titulo: {
        color: '#e4ad76',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
        color: '#333',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        borderColor: '#8f8b8b',
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },

    btnSubmit: {
        backgroundColor: '#e4ad76',
        padding: 15,
        borderRadius: 8,
        marginTop: 15,
        alignSelf: 'center',
        width: 150,
        borderRadius: 5,
        marginTop: 5
    },

    textoSubmit: {
        fontSize: 16,
        textAlign: 'center'
    },

    linkAuth: {
        textAlign: 'center',
        marginTop: 12,
        color: '#222',
        fontWeight: 'bold',
    },

    linkAuthDestaque: {
        color: '#1a4db3',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },

    btnAuth: {
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4ad76',
        width: 150,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#e4ad76',
        borderRadius: 5,
        marginTop: 5
    },

    textoBtnAuth: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'center',
        padding: 10,
        color: '#222'
    },

    textoAuth: {
        color: '#745739',
        fontSize: 15,
        textAlign: 'center',
    },

    mensagemSucesso: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 20
    },

    mensagemErro: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    },

    // =======================================================================================================
    /* ====================== CARDÁPIO | DETALHES ====================== */
    /* ===================  CE | DS | SL =================== */
    categorias: {
        justifyContent: 'center',
        padding: 20,
        elevation: 5,
    },

    cardProduto: {
        padding: 20,
        backgroundColor: '#745739',
    },

    cardsDetalhes: {
        backgroundColor: '#e4ad76',
        borderColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        margin: 10
    },

    buscaProduto: {
        flexDirection: 'column',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#dbd5d5',
        borderRadius: 10,
        padding: 10
    },

    etiqueta: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },

    /*teste: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
        elevation: 5,
    },
    */
    btnCategoria: {
        color: '#000000',
        backgroundColor: '#745739',
        padding: 6,
        borderColor: '#ea9f51',
        borderWidth: 2,
        borderRadius: 8,
        margin: 10,
        textDecorationLine: 'none',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },

    btnDetalhes: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },

    textoBtnCategoria: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ea9f51'
    },

    nomeProduto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
    },

    descricaoProduto: {
        color: '#ffffff',
        padding: 15,
        textAlign: 'center',
    },

    imagemProduto: {
        width: 200,
        height: 200,
        borderRadius: 15,
    },

    precoProduto: {
        color: '#ffffff',
        fontsize: 10,
        marginBottom: 15,
    },

    Voltar: {
        alignItems: 'center',
    },

    btnVoltar: {
        backgroundColor: '#ffffff',
        borderColor: '#ea9f51',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },

    textoBtnVoltar: {
        color: '#ea9f51',
    },

    //*================================================================================================================================ */
    //================= RODAPÉ ================= 
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

}
);