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

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.botaoLogin}>
            <Image
              source={require("../assets/images/icone_perfil.png")}
              style={styles.iconeLogin}
            />
          </TouchableOpacity>
        </Link>
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
  },

  headerLogo: {
    width: 200,
    height: 120,
    resizeMode: "contain",
  },

  botaoLogin: {
    position: "absolute",
    right: 15,
    top: 20,
  },

  iconeLogin: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },

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