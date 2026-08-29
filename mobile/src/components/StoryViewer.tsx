import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
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
}

interface StoryGroup {
  user: User;
  stories: Story[];
}

interface StoryViewerProps {
  visible: boolean;
  storyGroups: StoryGroup[];
  initialGroupIndex: number;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const StoryViewer = ({ visible, storyGroups, initialGroupIndex, onClose }: StoryViewerProps) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialGroupIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentGroup = storyGroups[currentGroupIndex];
  const currentStory = currentGroup?.stories[currentStoryIndex];

  useEffect(() => {
    if (visible) {
      setCurrentGroupIndex(initialGroupIndex);
      setCurrentStoryIndex(0);
    }
  }, [visible, initialGroupIndex]);

  useEffect(() => {
    if (visible && currentStory) {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          goToNextStory();
        }
      });
    }
  }, [visible, currentGroupIndex, currentStoryIndex]);

  const goToNextStory = () => {
    if (!currentGroup) return;

    if (currentStoryIndex < currentGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentGroupIndex < storyGroups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
  };

  const goToPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
      const prevGroup = storyGroups[currentGroupIndex - 1];
      setCurrentStoryIndex(prevGroup.stories.length - 1);
    }
  };

  if (!visible || !currentGroup || !currentStory) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {currentGroup.stories.map((_, index) => (
            <View key={index} style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width:
                      index < currentStoryIndex
                        ? '100%'
                        : index === currentStoryIndex
                        ? progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          })
                        : '0%',
                  },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {currentGroup.user.name.charAt(0)}
              </Text>
            </View>
            <View>
              <Text style={styles.userName}>{currentGroup.user.name}</Text>
              <Text style={styles.userUsername}>@{currentGroup.user.username}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Story Content */}
        <View style={styles.content}>
          {currentStory.type === 'image' && (
            <Image source={{ uri: currentStory.media_url }} style={styles.media} />
          )}
          {currentStory.type === 'text' && (
            <View style={styles.textStory}>
              <Text style={styles.textStoryContent}>{currentStory.content}</Text>
            </View>
          )}
          {currentStory.content && currentStory.type !== 'text' && (
            <View style={styles.caption}>
              <Text style={styles.captionText}>{currentStory.content}</Text>
            </View>
          )}
        </View>

        {/* Navigation */}
        <TouchableOpacity
          style={styles.navLeft}
          onPress={goToPreviousStory}
        />
        <TouchableOpacity
          style={styles.navRight}
          onPress={goToNextStory}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  progressContainer: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 16,
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#033D60',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  userUsername: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: width,
    height: height * 0.7,
    resizeMode: 'cover',
  },
  textStory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  textStoryContent: {
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 36,
  },
  caption: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  captionText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  navLeft: {
    position: 'absolute',
    left: 0,
    top: '30%',
    bottom: '30%',
    width: '30%',
  },
  navRight: {
    position: 'absolute',
    right: 0,
    top: '30%',
    bottom: '30%',
    width: '30%',
  },
});

export default StoryViewer;
