import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// INDICA PARA QUAL BACKEND A API VAI ENVIAR OS DADOS
const API_URL = 'https://cafe-central-ofc.onrender.com'

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [mensagemSistema, setMensagemSistema] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  async function validarLogin() {
    if (email == '') {
      setMensagemSistema('Digite seu e-mail!');
      setTipoMensagem('erro!');
      return;
    };
    if (!email.includes('@') || !email.includes('.com')) {
      setMensagemSistema('Digite um e-mail válido!')
      setTipoMensagem('erro!')
      return
    };
    if (senha == '') {
      setMensagemSistema('Digite sua senha!');
      setTipoMensagem('erro!');
      return;
    };
    if (senha.length < 8) {
      setMensagemSistema('A senha deve conter no mínimo 8 caracteres!');
      setTipoMensagem('erro!');
      return;
    }
    /*---------------------------------------------------------------------------------------------------------*/
    // TENTA EXECUTAR O BLOCO, SE DER ERRO, CAI NO CATCH
    try {
      // FAZ UMA REQUISIÇÃO HTTP PARA A ROTA DA API USANDO O MÉTODO POST
      const resposta = await fetch(`${API_URL}/login`, {
        method: 'POST', // A REQUISIÇÃO ENVIA DADOS
        headers: { 'Content-Type': 'application/json' }, // INFOMA QUE O CORPO DA REQUISIÇÃO ESTÁ EM JSON
        credentials: 'include', // INCLUI COOKIES E SESSÃO NA REQUISIÇÃO, ÚTIL PARA AUTENTIFICAÇÃO
        body: JSON.stringify({ // CONVERTE OS OBJETOS EM JSON
          email: email,
          senha: senha
        })
      });
      /*---------------------------------------------------------------------------------------------------------*/
      // CONVERTE A RESPOSTA RECEBIDA DA API DE JSON PARA OBJETO JAVASCRIPT
      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagemSistema(dados.mensagem || 'Login realizado com sucesso!')
        setTipoMensagem('sucesso!')
        setEmail('');
        setSenha('');
        router.push('/cardapio')
      }

    } catch (erro) {
      setMensagemSistema("Erro ao conectar com o servidor")
      // Define o "estilo" da mensagem como erro
      setTipoMensagem("erro!")
    };

    setMensagemSistema('Login efetuado com sucesso!');
    setTipoMensagem('sucesso!');

    setEmail('');
    setSenha('');
  }
  /*---------------------------------------------------------------------------------------------------------*/
  return (
    <ScrollView>
      {/* HEADER */}
      <Header ativo="login"></Header>
      {/* CONTEÚDO */}
      <View style={styles.container}>
        <View style={styles.pagina}>
          <Text style={styles.titulo}>Login</Text>

          <Text style={styles.textoAuth}>
            Faça login para obter acesso aos nossos recursos
          </Text>

          <View style={styles.blocoAuth}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              placeholder="Digite seu email"
              keyboardType="email-address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              placeholder="Digite sua senha"
              secureTextEntry
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />

            <Text style={tipoMensagem == 'erro!' ? styles.mensagemErro : styles.mensagemSucesso}>
              {mensagemSistema}
            </Text>

            <TouchableOpacity style={styles.btnAuth} onPress={validarLogin}>
              <Text style={styles.textoBtnAuth}>
                Login
              </Text>
            </TouchableOpacity>

            <Text style={styles.linkAuth}>
              Não possui cadastro?
            </Text>

            <Link href="/cadastro" asChild>
              <Text style={styles.linkAuthDestaque}>
                Cadastre-se aqui
              </Text>
            </Link>

          </View>
        </View>
      </View>

      <Footer></Footer>
    </ScrollView>
  );
}