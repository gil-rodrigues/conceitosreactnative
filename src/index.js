import React, { useState, useEffect } from 'react';
import api from './services/api';
import { View, Text, StyleSheet, ScrollView, StatusBar, FlatList, SafeAreaView, Touchable, TouchableOpacity } from 'react-native';

export default function App()
{
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then((response) => {
            setProjects(response.data);
            console.log(response.data);
        })
    }, [])

    
    async function doAddProject(){
        const res = await api.post('projects',{
            title: `${Date.now()}`,
            owner: "mimi"
        })

        const newProject = res.data;

        setProjects([... projects, newProject])
    }

    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({item: project}) => (
                        <Text>{project.title}</Text>
                    )}/>
                <TouchableOpacity onPress={doAddProject}>
                    <Text>
                        Clica aqui
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    feio:{
        flex: 1,
        height:100,
        textAlignVertical: 'center',
        fontSize: 20,
        paddingBottom: 2,
        color: 'white',
        backgroundColor: 'green',
        fontWeight: 'bold'
    },
    michelle:{
        color: 'red',
        fontSize: 50
    }
});