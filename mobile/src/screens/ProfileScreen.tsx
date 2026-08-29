import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface UserProfile {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatar_url: string;
  congregation: string;
  role: string;
  baptism_date: string;
  city: string;
  state: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // TODO: Carregar perfil da API
    setUser({
      id: 1,
      name: 'João Silva',
      username: 'joao.silva',
      bio: 'Servo de Deus, membro da CCB',
      avatar_url: '',
      congregation: 'Congregação Central',
      role: 'member',
      baptism_date: '2020-01-15',
      city: 'São Paulo',
      state: 'SP',
      followers_count: 150,
      following_count: 120,
      posts_count: 45,
    });
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.posts_count}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.followers_count}</Text>
          <Text style={styles.statLabel}>Seguidores</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.following_count}</Text>
          <Text style={styles.statLabel}>Seguindo</Text>
        </View>
      </View>

      <View style={styles.info}>
        {user.congregation && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Congregação:</Text>
            <Text style={styles.infoValue}>{user.congregation}</Text>
          </View>
        )}
        {user.role && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cargo:</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>
        )}
        {user.baptism_date && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Batismo:</Text>
            <Text style={styles.infoValue}>{user.baptism_date}</Text>
          </View>
        )}
        {user.city && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Cidade:</Text>
            <Text style={styles.infoValue}>{user.city}, {user.state}</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
          <Text style={[styles.buttonText, styles.buttonTextOutline]}>
            Compartilhar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#033D60',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#201E1E',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#201E1E',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#201E1E',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  info: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    color: '#201E1E',
    fontWeight: '500',
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  button: {
    height: 48,
    backgroundColor: '#033D60',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#033D60',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: '#033D60',
  },
});

export default ProfileScreen;
