import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const API_URL = "https://cafecentral-mobile.onrender.com" //-------

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [mensagemSistema, setMensagemSistema] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  async function validarCadastro() {
    if (nome === '') {
      setMensagemSistema('Digite seu nome!');
      setTipoMensagem('erro!');
      return;
    }

    if (/\d/.test(nome)) {
      setMensagemSistema('O nome não pode conter número!');
      setTipoMensagem('erro!');
      return;
    }

    if (email === '') {
      setMensagemSistema('Digite seu e-mail!');
      setTipoMensagem('erro!');
      return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setMensagemSistema('Digite um e-mail válido!');
      setTipoMensagem('erro!');
      return;
    }

    if (senha === '') {
      setMensagemSistema('Digite sua senha!');
      setTipoMensagem('erro!');
      return;
    }

    if (senha.length < 8) {
      setMensagemSistema('A senha deve conter no mínimo 8 caracteres!');
      setTipoMensagem('erro!');
      return;
    }

    if (confirmarSenha === '') {
      setMensagemSistema('Confirme sua senha!');
      setTipoMensagem('erro!');
      return;
    }

    if (confirmarSenha.length < 8) {
      setMensagemSistema('A confirmação da senha deve conter no mínimo 8 caracteres!');
      setTipoMensagem('erro!');
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagemSistema('As senhas não coincidem!');
      setTipoMensagem('erro!');
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          nome_usuario: nome,
          email_usuario: email,
          senha_usuario: senha
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagemSistema(dados.mensagem || 'Cadastro realizado com sucesso!');
        setTipoMensagem('sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      } else {
        setMensagemSistema(dados.erro || 'Erro ao cadastrar');
        setTipoMensagem('erro!');
      }

    } catch (erro) {
      console.log(erro);
      setMensagemSistema('Erro ao conectar com o servidor');
      setTipoMensagem('erro!');
    }
  }

  return (
    <ScrollView>
      <Header ativo="cadastro"></Header>

      {/* CONTEÚDO */}
      <View style={styles.container}>
        <View style={styles.pagina}>
          <Text style={styles.titulo}>Cadastro</Text>

          <Text style={styles.textoAuth}>
            Crie sua conta para acessar todos os recursos
          </Text>

          <View style={styles.blocoAuth}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome} />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            <Text style={styles.label}>Confirmar senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <Text style={tipoMensagem == 'erro!' ? styles.mensagemErro : styles.mensagemSucesso}>
              {mensagemSistema}
            </Text>

            <TouchableOpacity style={styles.btnAuth} onPress={validarCadastro}>
              <Text style={styles.textoBtnAuth}>
                Cadastrar-se
              </Text>
            </TouchableOpacity>

            <Text style={styles.linkAuth}>Já possui uma conta?</Text>

            <Link href='/login' asChild>
              <Text style={styles.linkAuthDestaque}> Faça login</Text>
            </Link>
          </View>
        </View>
      </View>

      {/* RODAPÉ */}
      <Footer></Footer>

    </ScrollView>

  );
}