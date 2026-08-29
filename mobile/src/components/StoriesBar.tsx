import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

interface User {
  id: number;
  name: string;
  username: string;
  avatar_url?: string;
}

interface Story {
  id: number;
  user_id: number;
  media_url: string;
  type: 'image' | 'video' | 'text';
  content?: string;
  views_count: number;
  expires_at: string;
  created_at: string;
  is_viewed?: boolean;
}

interface StoryGroup {
  user: User;
  stories: Story[];
  has_unviewed: boolean;
}

interface StoriesBarProps {
  storyGroups: StoryGroup[];
  onViewStories: (groupIndex: number) => void;
  onCreateStory: () => void;
}

const { width } = Dimensions.get('window');
const STORY_SIZE = 70;

const StoriesBar = ({ storyGroups, onViewStories, onCreateStory }: StoriesBarProps) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Botão Criar Story */}
        <TouchableOpacity style={styles.storyItem} onPress={onCreateStory}>
          <View style={styles.createButton}>
            <Text style={styles.createText}>+</Text>
          </View>
          <Text style={styles.storyName} numberOfLines={1}>
            Criar
          </Text>
        </TouchableOpacity>

        {/* Stories dos usuários */}
        {storyGroups.map((group, index) => (
          <TouchableOpacity
            key={group.user.id}
            style={styles.storyItem}
            onPress={() => onViewStories(index)}
          >
            <View
              style={[
                styles.avatarContainer,
                group.has_unviewed && styles.avatarUnviewed,
              ]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {group.user.name.charAt(0)}
                </Text>
              </View>
            </View>
            <Text style={styles.storyName} numberOfLines={1}>
              {group.user.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  storyItem: {
    alignItems: 'center',
    marginLeft: 12,
    width: STORY_SIZE,
  },
  createButton: {
    width: STORY_SIZE,
    height: STORY_SIZE,
    borderRadius: STORY_SIZE / 2,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CDD4DC',
    borderStyle: 'dashed',
  },
  createText: {
    fontSize: 24,
    color: '#64748B',
  },
  avatarContainer: {
    padding: 2,
    borderRadius: STORY_SIZE / 2,
    borderWidth: 2,
    borderColor: '#CDD4DC',
  },
  avatarUnviewed: {
    borderColor: '#033D60',
  },
  avatar: {
    width: STORY_SIZE - 8,
    height: STORY_SIZE - 8,
    borderRadius: (STORY_SIZE - 8) / 2,
    backgroundColor: '#033D60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  storyName: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default StoriesBar;
