import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const navigation = useNavigation();

    const route = useRoute();
    const incident = route.params.incident; 

    const valueFormatted = Intl
        .NumberFormat(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
        ).format(incident.value);

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${valueFormatted}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
            
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image source={logo} />

                    <TouchableOpacity onPress={navigateBack}>
                        <Feather name="arrow-left" size={18} color="#E82041"></Feather>
                    </TouchableOpacity>
                </View>

                <View style={styles.incident}>
                    
                    <Text style={styles.incidentProperty}>ONG: </Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat(
                            'pt-BR',
                            { style: 'currency', currency: 'BRL' }
                        ).format(incident.value)}
                    </Text>

                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                            <Text style={styles.actionText}>Whatsapp</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.space} />
                        
                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
            
    );
}