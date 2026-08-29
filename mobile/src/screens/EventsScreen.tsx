import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface Event {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  cover_url?: string;
  type: string;
  is_online: boolean;
  attendees_count: number;
  created_at: string;
  is_attending?: boolean;
}

interface EventsScreenProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onCreateEvent: () => void;
}

const EVENT_TYPES: Record<string, string> = {
  cult: 'Culto',
  reunion: 'Reunião',
  convention: 'Convenção',
  baptism: 'Batismo',
  communion: 'Santa Ceia',
  workshop: 'Workshop',
  social: 'Social',
};

const EventsScreen = ({ events, onSelectEvent, onCreateEvent }: EventsScreenProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onSelectEvent(item)}
    >
      <View style={styles.eventHeader}>
        <View style={styles.eventType}>
          <Text style={styles.eventTypeText}>{EVENT_TYPES[item.type] || item.type}</Text>
        </View>
        {item.is_online && (
          <View style={styles.onlineBadge}>
            <Text style={styles.onlineText}>Online</Text>
          </View>
        )}
      </View>

      <Text style={styles.eventTitle}>{item.title}</Text>
      {item.description && (
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.eventInfo}>
        <Text style={styles.eventDate}>{formatDate(item.start_date)}</Text>
        <Text style={styles.eventTime}>{formatTime(item.start_date)}</Text>
      </View>

      {item.location && (
        <Text style={styles.eventLocation} numberOfLines={1}>
          📍 {item.location}
        </Text>
      )}

      <View style={styles.eventFooter}>
        <Text style={styles.attendees}>
          👥 {item.attendees_count} {item.attendees_count === 1 ? 'participante' : 'participantes'}
        </Text>
        {item.is_attending && (
          <View style={styles.attendingBadge}>
            <Text style={styles.attendingText}>Participando</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Eventos</Text>
        <TouchableOpacity onPress={onCreateEvent}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
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
  list: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventType: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  eventTypeText: {
    color: '#033D60',
    fontSize: 12,
    fontWeight: '600',
  },
  onlineBadge: {
    backgroundColor: '#Dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  onlineText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#201E1E',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  eventInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#201E1E',
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 14,
    color: '#64748B',
  },
  eventLocation: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#CDD4DC',
  },
  attendees: {
    fontSize: 14,
    color: '#64748B',
  },
  attendingBadge: {
    backgroundColor: '#033D60',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  attendingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default EventsScreen;
