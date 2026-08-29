import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

interface CreateEventScreenProps {
  onCreateEvent: (data: any) => Promise<void>;
  onCancel: () => void;
}

const EVENT_TYPES = [
  { value: 'cult', label: 'Culto' },
  { value: 'reunion', label: 'Reunião' },
  { value: 'convention', label: 'Convenção' },
  { value: 'baptism', label: 'Batismo' },
  { value: 'communion', label: 'Santa Ceia' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'social', label: 'Social' },
];

const CreateEventScreen = ({ onCreateEvent, onCancel }: CreateEventScreenProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('cult');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !startDate.trim()) {
      Alert.alert('Erro', 'Título e data são obrigatórios');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateEvent({
        title,
        description,
        type,
        location,
        start_date: startDate,
        end_date: endDate,
        is_online: isOnline,
        stream_url: streamUrl,
      });
      onCancel();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar evento');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Evento</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
          <Text style={[styles.saveButton, isSubmitting && styles.buttonDisabled]}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do evento"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do evento"
            placeholderTextColor="#94A3B8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Tipo</Text>
          <View style={styles.typeContainer}>
            {EVENT_TYPES.map((eventType) => (
              <TouchableOpacity
                key={eventType.value}
                style={[
                  styles.typeButton,
                  type === eventType.value && styles.typeButtonSelected,
                ]}
                onPress={() => setType(eventType.value)}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === eventType.value && styles.typeTextSelected,
                  ]}
                >
                  {eventType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Local</Text>
          <TextInput
            style={styles.input}
            placeholder="Local do evento"
            placeholderTextColor="#94A3B8"
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>Data de Início *</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA HH:MM"
            placeholderTextColor="#94A3B8"
            value={startDate}
            onChangeText={setStartDate}
          />

          <Text style={styles.label}>Data de Término</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA HH:MM"
            placeholderTextColor="#94A3B8"
            value={endDate}
            onChangeText={setEndDate}
          />

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsOnline(!isOnline)}
          >
            <View style={[styles.checkboxBox, isOnline && styles.checkboxChecked]}>
              {isOnline && <Text style={styles.checkboxText}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Evento Online</Text>
          </TouchableOpacity>

          {isOnline && (
            <>
              <Text style={styles.label}>Link da Transmissão</Text>
              <TextInput
                style={styles.input}
                placeholder="URL da transmissão"
                placeholderTextColor="#94A3B8"
                value={streamUrl}
                onChangeText={setStreamUrl}
              />
            </>
          )}
        </View>
      </ScrollView>
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
  cancelButton: {
    color: '#64748B',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#201E1E',
  },
  saveButton: {
    color: '#033D60',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#201E1E',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#201E1E',
    borderWidth: 1,
    borderColor: '#CDD4DC',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CDD4DC',
  },
  typeButtonSelected: {
    backgroundColor: '#033D60',
    borderColor: '#033D60',
  },
  typeText: {
    fontSize: 14,
    color: '#64748B',
  },
  typeTextSelected: {
    color: '#FFFFFF',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CDD4DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#033D60',
    borderColor: '#033D60',
  },
  checkboxText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#201E1E',
  },
});

export default CreateEventScreen;
