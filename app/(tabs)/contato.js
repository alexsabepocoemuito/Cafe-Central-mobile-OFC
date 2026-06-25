import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const API_URL = "https://cafe-central-ofc.onrender.com"

export default function Contato() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');

    const [mensagemSistema, setMensagemSistema] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    async function validarFormulario() {
        if (nome === '') {
            setMensagemSistema('Digite seu nome!');
            setTipoMensagem('erro!');
            return;
        };
        if (/\d/.test(nome)) {
            setMensagemSistema('O nome não pode conter números!');
            setTipoMensagem('erro!');
            return;
        };
        if (email == '') {
            setMensagemSistema('Digite seu e-mail!');
            setTipoMensagem('erro!');
            return;
        };
        if (!email.includes('@') || !email.includes('.com')) {
            setMensagemSistema('Digite um e-mail válido!');
            setTipoMensagem('erro!');
            return;
        };
        if (mensagem.length < 10) {
            setMensagemSistema('Sua mensagem deve conter mais de 10 caracteres!');
            setTipoMensagem('erro!');
            return;
        };
        if (mensagem == '') {
            setMensagemSistema('Digite sua mensagem!');
            setTipoMensagem('erro!');
            return;
        };

        setMensagemSistema('Mensagem enviada com sucesso!');
        setTipoMensagem('sucesso!');

        setNome('');
        setEmail('');
        setMensagem('');
        //Tenta executar o bloco, se houver erro de rede, o código vai para o cath
        try {
            // Faz uma requisição HTTP para a rota da API usando o método POST
            const resposta = await fetch(`${API_URL}/contato`, {
                method: 'POST', // Define que a requisição vai ENVIAR DADOS
                headers: { 'Content-Type': 'application/json' }, // Informa que o corpo da requisição está JSON
                credentials: 'include', // Inclui cookies e sessão na requisição, útil para autenticação
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    mensagem: mensagem
                }) // Converte os dados de JavaScript para texto JSON antes de enviar
            });

            // Converte a resposta recebida da API de JSON para objeto JavaScript
            const dados = await resposta.json()

            // Verifica se a resposta HTTP foi de sucesso
            if (resposta.ok) {
                // Mostra a mensagem de sucesso vinda da API, 
                //ou um texto padrão se ela não enviar nada
                setMensagemSistema(dados.mensagem || "Mensagem enviada")
                // Define o "estilo" da mensagem como sucesso
                setTipoMensagem("sucesso")
                // Limpa os campos do formulário
                setNome('');
                setEmail('');
                setMensagem('');
            } else {
                // Mostra a mensagem de erro vinda da API,
                // ou um texto padrão se ela não enviar nada
                setMensagemSistema(dados.erro || "Erro ao ao enviar mensagem")
                // Define o "estilo" da mensagem como erro
                setTipoMensagem("erro")
            }
        } catch (erro) {
            //  Executado quando acontece falha na conexão,
            // como internet fora do ar ou servidor indisponivel
            setMensagemSistema("Erro ao conectar com o servidor")
            // Define o "estilo" da mensagem como erro
            setTipoMensagem("erro")
        }
    }

    return (
        <ScrollView>
            <Header ativo="contato"></Header>
            {/* TOPO - HEADER*/}


            {/* ============================================================================================================ */}
            {/* BASE - BODY */}
            <View style={styles.container}>
                <View style={styles.pagina}>
                    <Text style={styles.titulo}>
                        Fale Conosco
                    </Text>
                    <View style={styles.blocoAuth}>
                        <Text style={styles.label}>Nome: </Text>
                        <TextInput placeholder='Digite seu nome'
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}>
                        </TextInput>

                        <Text style={styles.label}>E-mail: </Text>
                        <TextInput placeholder='Digite seu e-mail'
                            keyboardType='email-address'
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}>
                        </TextInput>

                        <Text style={styles.label}>Mensagem: </Text>
                        <TextInput placeholder='Digite sua Mensagem'
                            style={styles.input}
                            multiline={true}
                            numberOfLines={7}
                            value={mensagem}
                            onChangeText={setMensagem}>
                            {/* multiline para adicionar mais linhas ao input
                                junto com o numberoflines para adicionar o numero de linhas que quer a mais */}
                        </TextInput>

                        <Text style={tipoMensagem == 'erro!' ? styles.mensagemErro : styles.mensagemSucesso}>
                            {mensagemSistema}
                        </Text>

                        <TouchableOpacity style={styles.btnSubmit} onPress={validarFormulario}>
                            <Text style={styles.textoSubmit}>Enviar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <Footer></Footer>
        </ScrollView>
    );
}