import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';

interface Post {
  id: number;
  content: string;
  type: string;
  media_urls: string[];
  likes_count: number;
  prayers_count: number;
  comments_count: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    username: string;
    avatar_url?: string;
    role?: string;
  };
  is_liked?: boolean;
  is_prayed?: boolean;
}

interface FeedScreenProps {
  posts: Post[];
  onLike: (postId: number, type: 'like' | 'prayer') => Promise<void>;
  onCreatePost: (data: { content: string }) => Promise<void>;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

const FeedScreen = ({ posts, onLike, onCreatePost, onRefresh, isLoading }: FeedScreenProps) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      Alert.alert('Erro', 'Digite algo para publicar');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreatePost({ content: newPostContent });
      setNewPostContent('');
      setShowCreateModal(false);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.user.name.charAt(0)}</Text>
        </View>
        <View style={styles.postInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.userUsername}>@{post.user.username}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <Text style={styles.postDate}>{formatDate(post.created_at)}</Text>

      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(post.id, 'like')}
        >
          <Text style={[styles.actionText, post.is_liked && styles.actionActive]}>
            ❤️ {post.likes_count}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(post.id, 'prayer')}
        >
          <Text style={[styles.actionText, post.is_prayed && styles.actionActive]}>
            🙏 {post.prayers_count}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {post.comments_count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Irmandade</Text>
        <TouchableOpacity onPress={() => setShowCreateModal(true)}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshing={isLoading}
        onRefresh={onRefresh}
      >
        {posts.map(renderPost)}
      </ScrollView>

      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Criar Post</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.textArea}
              placeholder="No que você está pensando?"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={6}
              value={newPostContent}
              onChangeText={setNewPostContent}
              maxLength={5000}
            />

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.buttonDisabled]}
              onPress={handleCreatePost}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#201E1E',
  },
  headerButton: {
    fontSize: 24,
    color: '#033D60',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#033D60',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#201E1E',
  },
  userUsername: {
    fontSize: 14,
    color: '#64748B',
  },
  postContent: {
    fontSize: 16,
    color: '#201E1E',
    lineHeight: 24,
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#CDD4DC',
  },
  actionButton: {
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#64748B',
  },
  actionActive: {
    color: '#033D60',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#201E1E',
  },
  modalClose: {
    fontSize: 20,
    color: '#64748B',
  },
  textArea: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#201E1E',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    height: 48,
    backgroundColor: '#033D60',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeedScreen;
