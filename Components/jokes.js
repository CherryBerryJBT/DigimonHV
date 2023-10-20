import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';

const BASE_URL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";

export const useJokes = () => {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(BASE_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.type === "single") {
                    setJoke(data.joke);
                } else {
                    setJoke(`${data.setup} ${data.delivery}`);
                }
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { joke, loading, error };
};


export function JokeComponent() {
    const { joke, loading, error } = useJokes();

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;
    if (!joke) return <Text>No joke available</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>MMD</Text>
            <Text>{joke}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#663399', 
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    
});
