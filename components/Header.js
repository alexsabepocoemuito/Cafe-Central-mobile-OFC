import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

export default function Header({ ativo }) {
  return (
    <>
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/cafecentral.jpg")}
              style={styles.headerLogo}
            />
          </TouchableOpacity>
        </Link>
        <View style={styles.icones}>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.botaoLogin}>
              <Image
                source={require("../assets/images/icone_perfil.png")}
                style={styles.iconeLogin}
              />
            </TouchableOpacity>
          </Link>
          <Link href="/carrinho" asChild>
            <TouchableOpacity style={styles.botaoCarrinho}>
              <Image
                source={require("../assets/images/icone_carrinho.png")}
                style={styles.iconeCarrinho}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroIndex}>
          <Link href="/" asChild>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.menuItem,
                ativo === "inicio" ? styles.ativo : null
              ])}
            >
              <Text style={styles.textoMenu}>Início</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/sobre" asChild>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.menuItem,
                ativo === "sobre" ? styles.ativo : null
              ])}
            >
              <Text style={styles.textoMenu}>Sobre</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/contato" asChild>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.menuItem,
                ativo === "contato" ? styles.ativo : null
              ])}
            >
              <Text style={styles.textoMenu}>Contato</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#e6e2e2",
    alignItems: "center",
    paddingTop: 10,
    position: "relative", // 👈 necessário para o absolute funcionar em relação ao header
  },

  headerLogo: {
    width: 200,
    height: 120,
    resizeMode: "contain",
  },

  icones: {
    position: "absolute",  // 👈 tira do fluxo normal
    top: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,               // espaçamento entre login e carrinho
  },

  iconeLogin: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  iconeCarrinho: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  // pode remover botaoLogin e botaoCarrinho, não são mais necessários

  hero: {
    backgroundColor: "#745739",
    paddingVertical: 10,
  },

  heroIndex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  menuItem: {
    backgroundColor: "#dbd5d5",
    padding: 15,
    borderRadius: 8,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },

  ativo: {
    backgroundColor: "#e4ad76",
  },

  textoMenu: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
  },
});