import { Link } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/style/styles.js';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Compras() {
    return (
        <ScrollView>
            <Header ativo="compras"></Header>
        </ScrollView>
    )
}