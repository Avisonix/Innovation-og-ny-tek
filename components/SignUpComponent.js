import {
    Button,
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const auth = getAuth();

    const handleSubmit = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Handle user signup
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    };

    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" color="#FF6F00" />;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Sign up</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.inputField}
                placeholderTextColor="#666"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.inputField}
                placeholderTextColor="#666"
            />
            {errorMessage && (
                <Text style={styles.errorText}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 16,
        paddingTop: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6F00',
        marginBottom: 20,
    },
    inputField: {
        width: '90%',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default SignUpForm;